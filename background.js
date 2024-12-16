/**
 * 评论快填 - 后台脚本
 * 
 * @author 時光
 * @github https://github.com/shiguang-coding
 * @blog https://blog.shiguangdev.cn
 */

// 跟踪已注入脚本的标签页
const injectedTabs = new Set();

// 监听安装事件
chrome.runtime.onInstalled.addListener(function(details) {
  // 设置默认值
  chrome.storage.sync.get(['nickname', 'email', 'website'], function(data) {
    if (!data.nickname || !data.email) {
      chrome.storage.sync.set({
        nickname: data.nickname || '時光',
        email: data.email || 'an_shiguang@163.com',
        website: data.website || ''
      });
    }
  });
});

// 注入内容脚本
async function injectContentScript(tabId, url) {
  // 检查URL是否合法
  if (!url || !url.startsWith('http')) {
    return;
  }

  // 检查脚本是否已注入
  try {
    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: () => window.__COMMENT_AUTOFILL_INJECTED__
    });
    
    if (result === true) {
      return;
    }
  } catch (error) {
    // 忽略错误，继续注入
  }

  try {
    await chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: () => {
        window.__COMMENT_AUTOFILL_INJECTED__ = true;
      }
    });

    await chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['content.js']
    });
    
    injectedTabs.add(tabId);
  } catch (error) {
    console.error('注入脚本失败:', error);
  }
}

// 监听标签页更新
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.url) {
    injectContentScript(tabId, tab.url);
  }
});

// 监听标签页移除
chrome.tabs.onRemoved.addListener(function(tabId) {
  injectedTabs.delete(tabId);
});

// 监听消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === 'contentScriptLoaded') {
    sendResponse({ status: 'ok' });
  }
  return true;
}); 