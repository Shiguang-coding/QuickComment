/**
 * 评论快填 - 弹出窗口逻辑
 * 
 * @author 時光
 * @github https://github.com/shiguang-coding
 * @blog https://blog.shiguangdev.cn
 */

document.addEventListener('DOMContentLoaded', function() {
  const DEFAULT_VALUES = {
    nickname: '時光',
    email: 'an_shiguang@163.com',
    website: ''
  };

  // 邮箱格式验证
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // 加载保存的设置
  chrome.storage.sync.get(['nickname', 'email', 'website'], function(data) {
    document.getElementById('nickname').value = data.nickname || '';
    document.getElementById('email').value = data.email || '';
    document.getElementById('website').value = data.website || '';
  });

  // 保存设置
  document.getElementById('save').addEventListener('click', function() {
    let settings = {
      nickname: document.getElementById('nickname').value.trim(),
      email: document.getElementById('email').value.trim(),
      website: document.getElementById('website').value.trim()
    };
    
    // 邮箱格式验证
    if (settings.email && !isValidEmail(settings.email)) {
      alert('请输入有效的邮箱地址');
      return;
    }

    // 检查并设置默认值
    if (!settings.nickname) {
      alert(`昵称未填写，将使用默认昵称：${DEFAULT_VALUES.nickname}`);
      settings.nickname = DEFAULT_VALUES.nickname;
      document.getElementById('nickname').value = settings.nickname;
    }
    
    if (!settings.email) {
      alert(`邮箱未填写，将使用默认邮箱：${DEFAULT_VALUES.email}`);
      settings.email = DEFAULT_VALUES.email;
      document.getElementById('email').value = settings.email;
    }
    
    chrome.storage.sync.set(settings, function() {
      const saveBtn = document.getElementById('save');
      saveBtn.textContent = '已保存！';
      saveBtn.style.background = '#45a049';
      setTimeout(() => {
        saveBtn.textContent = '保存设置';
        saveBtn.style.background = '#4CAF50';
      }, 2000);
    });
  });

  // 立即填充
  document.getElementById('fill').addEventListener('click', async function() {
    const fillBtn = document.getElementById('fill');
    fillBtn.textContent = '填充中...';
    fillBtn.disabled = true;

    try {
      const tabs = await chrome.tabs.query({active: true, currentWindow: true});
      const tab = tabs[0];
      
      if (!tab?.id || !tab.url?.startsWith('http')) {
        throw new Error('无效的标签页或URL');
      }

      // 获取存储的值，如果昵称或邮箱为空则使用��认值
      const data = await new Promise(resolve => {
        chrome.storage.sync.get(['nickname', 'email', 'website'], resolve);
      });

      const fillData = {
        nickname: data.nickname || DEFAULT_VALUES.nickname,
        email: data.email || DEFAULT_VALUES.email,
        website: data.website || DEFAULT_VALUES.website
      };

      await new Promise(resolve => {
        chrome.storage.sync.set(fillData, resolve);
      });

      // 检查脚本是否已注入
      try {
        const [{ result }] = await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => window.__COMMENT_AUTOFILL_INJECTED__
        });

        if (!result) {
          await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
              window.__COMMENT_AUTOFILL_INJECTED__ = true;
            }
          });

          await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['content.js']
          });
        }
      } catch (error) {
        // 如果检查失败，尝试注入脚本
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => {
            window.__COMMENT_AUTOFILL_INJECTED__ = true;
          }
        });

        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['content.js']
        });
      }

      // 等待一下确保脚本加载
      await new Promise(resolve => setTimeout(resolve, 100));

      // 发送填充消息
      const response = await new Promise((resolve, reject) => {
        chrome.tabs.sendMessage(tab.id, {action: 'fill'}, response => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          } else {
            resolve(response);
          }
        });
      });

      fillBtn.textContent = response?.status === 'success' ? '填充完成' : '立即填充';
      setTimeout(() => {
        fillBtn.textContent = '立即填充';
      }, 1000);

    } catch (error) {
      console.error('填充失败:', error);
      alert('填充失败，请刷新页面后重试');
      fillBtn.textContent = '立即填充';
    } finally {
      fillBtn.disabled = false;
    }
  });
}); 