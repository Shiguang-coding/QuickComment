/**
 * 评论快填 - 内容脚本
 * 
 * @author 時光
 * @github https://github.com/shiguang-coding
 * @blog https://blog.shiguangdev.cn
 */

// 通知后台脚本已加载
try {
  chrome.runtime.sendMessage({ type: 'contentScriptLoaded' });
} catch (error) {
  console.error('发送加载消息失败:', error);
}

// console.log('评论区自动填充插件已加载');

// 评论系统的选择器映射
const COMMENT_SYSTEMS = {
  Valine: {
    nickname: ['input[name="nick"]', '#veditor-nick', '.vnick', '#nick'],
    email: ['input[name="mail"]', '#veditor-mail', '.vmail', '#mail'],
    website: ['input[name="url"]', '#veditor-link', '.vlink', '#link', 'input[name="website"]', 'input[name="homepage"]']
  },
  Waline: {
    nickname: ['.v[data-class="v"] .vnick', 'input[name="nick"]', '.wl-nick', '#wl-nick'],
    email: ['.v[data-class="v"] .vmail', 'input[name="mail"]', '.wl-mail', '#wl-mail'],
    website: ['.v[data-class="v"] .vlink', 'input[name="link"]', '.wl-link', '#wl-link', 'input[name="website"]', '.wl-website']
  },
  Twikoo: {
    nickname: ['#tk-nick', '.tk-nick', 'input[name="nick"]'],
    email: ['#tk-mail', '.tk-mail', 'input[name="mail"]'],
    website: ['#tk-link', '.tk-link', 'input[name="link"]']
  },
  Artalk: {
    nickname: ['.artalk-nick-input', '#artalk-nick', 'input[name="nick"]'],
    email: ['.artalk-email-input', '#artalk-email', 'input[name="mail"]'],
    website: ['.artalk-link-input', '#artalk-link', 'input[name="link"]']
  },
  General: {
    nickname: [
      '#author', 'input[name="author"]', 'input[name="nickname"]', '#nickname',
      'input[name="comname"]', '#inpName', '#ds-dialog-name'
    ],
    email: [
      '#email', 'input[name="email"]', '#mail', 'input[name="commail"]',
      '#inpEmail', '#ds-dialog-email'
    ],
    website: [
      '#url', 'input[name="url"]', '#website', '#link', 'input[name="link"]',
      '#inpHomePage', '#ds-dialog-url', 'input[name="website"]', 
      'input[name="homepage"]', '.website-input', '#website-input',
      'input[type="url"]'
    ]
  }
};

// 测试存储功能
chrome.storage.sync.get(['nickname', 'email', 'website'], function(data) {
  // console.log('当前存储的数据:', data);
});

// 查找输入框
function findInput(selectors) {
  for (let selector of selectors) {
    try {
      const elements = document.querySelectorAll(selector);
      for (let element of elements) {
        if (element && (
          element.offsetParent !== null || 
          element.type === 'url' || 
          element.type === 'text' ||
          element.tagName.toLowerCase() === 'input'
        )) {
          return element;
        }
      }
    } catch (error) {
      console.error('查找输入框失败:', error);
    }
  }
  return null;
}

// 设置输入框的值并触发事件
function setInputValue(input, value) {
  if (!input || !value) {
    return;
  }
  
  try {
    // 特殊处理网址输入框
    if (input.type === 'url' || 
        input.name?.includes('url') || 
        input.name?.includes('website') || 
        input.name?.includes('link') || 
        input.id?.includes('url') || 
        input.id?.includes('website') || 
        input.id?.includes('link')) {
      // 确保网址格式正确
      if (value && !value.startsWith('http')) {
        value = `https://${value}`;
      }
    }

    // 设置值
    input.value = value;
    input.setAttribute('value', value);

    // 触发事件
    const events = ['input', 'change', 'blur'];
    events.forEach(eventType => {
      try {
        const event = new Event(eventType, { bubbles: true });
        input.dispatchEvent(event);
      } catch (e) {
        console.error(`触发${eventType}事件失败:`, e);
      }
    });

    // 处理隐藏元素
    if (input.offsetParent === null) {
      const visibleElement = input.parentElement?.querySelector('.display-name, .nickname-display, .website-display');
      if (visibleElement) {
        visibleElement.textContent = value;
      }
    }
  } catch (error) {
    console.error('设置输入框值失败:', error);
  }
}

// 填充表单
function fillForm() {
  try {
    chrome.storage.sync.get(['nickname', 'email', 'website'], function(data) {
      if (!data.nickname && !data.email && !data.website) return;
      
      // 遍历所有评论系统的选择器
      for (let system in COMMENT_SYSTEMS) {
        const selectors = COMMENT_SYSTEMS[system];
        
        const nicknameInput = findInput(selectors.nickname);
        const emailInput = findInput(selectors.email);
        const websiteInput = findInput(selectors.website);
        
        // 先设置昵称和邮箱
        setInputValue(nicknameInput, data.nickname);
        setInputValue(emailInput, data.email);
        
        // 延迟设置网址
        if (data.website && websiteInput) {
          setTimeout(() => {
            setInputValue(websiteInput, data.website);
          }, 100);
        }
      }
    });
  } catch (error) {
    console.error('填充表单失败:', error);
  }
}

// 监听来自popup的消息
try {
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'fill') {
      fillForm();
      sendResponse({status: 'success'});
    }
    return true;
  });
} catch (error) {
  console.error('注册消息监听器失败:', error);
} 