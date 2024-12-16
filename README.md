# 评论快填 (QuickComment)

[English](README_EN.md) | 中文

### 简介
评论快填是一款智能的浏览器扩展，专为博客评论者设计。它能够一键快速填充您的个人信息（昵称、邮箱、网址），支持 Valine、Waline、Twikoo 等多个主流评论系统，让您在浏览博客时的互动体验更加流畅自然。无需重复输入，一键即可完成填充，让评论更专注于内容本身。


### 功能特点
- 支持多种评论系统（Valine、Waline、Twikoo、Artalk等）
- 可自定义昵称、邮箱和网址
- 提供默认值设置
- 一键快速填充
- 智能字段识别
- 安全的数据存储

### 支持的评论系统
- Valine
- Waline
- Twikoo
- Artalk
- 通用评论系统

### 安装方法
1. 下载源码或 release 中的扩展文件
2. 打开 Chrome 浏览器，进入扩展管理页面（chrome://extensions/）
3. 开启右上角的"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择扩展程序所在目录即可完成安装

### 使用方法
1. 在浏览器中安装扩展后，点击工具栏中的扩展图标
2. 设置您的个人信息：
   - 昵称（选填，默认：時光）
   - 邮箱（选填，默认：an_shiguang@163.com）
   - 网址（选填）
3. 点击"保存设置"保存您的信息
4. 在评论区点击"立即填充"即可自动填充信息

### 隐私说明
- 所有数据仅存储在本地浏览器中
- 不会收集或上传任何个人信息
- 源代码完全开放，可供审查

### 开发相关
- 使用 Chrome Extension Manifest V3
- 纯原生 JavaScript 实现，无外部依赖
- 支持自动脚本注入和事件处理

### 目录结构
```
├── manifest.json    // 扩展配置文件
├── popup.html      // 弹出窗口界面
├── popup.js        // 弹出窗口逻辑
├── content.js      // 内容脚本
├── background.js   // 后台脚本
└── README.md       // 说明文档
```

### 问题反馈
如果您在使用过程中遇到任何问题，或有任何建议，欢迎通过以下方式反馈：
1. 在 GitHub Issues 中提交问题
2. 发送邮件至 an_shiguang@163.com

### 开源协议
MIT License

Copyright (c) 2024

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. 