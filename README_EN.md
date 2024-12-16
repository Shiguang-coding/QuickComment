# QuickComment

[中文](README.md) | English

### Introduction
QuickComment is a smart browser extension designed specifically for blog commenters. It enables one-click auto-filling of your personal information (nickname, email, website) and supports multiple mainstream comment systems like Valine, Waline, and Twikoo. This extension makes your blog interaction experience more seamless and natural. No more repetitive typing - just one click to fill in your information, letting you focus on the content of your comments.


### Features
- Support for multiple comment systems (Valine, Waline, Twikoo, Artalk, etc.)
- Customizable nickname, email, and website
- Default value settings
- One-click auto-fill
- Smart field detection
- Secure data storage

### Supported Comment Systems
- Valine
- Waline
- Twikoo
- Artalk
- Generic comment systems

### Installation
1. Download the source code or extension files from releases
2. Open Chrome browser and navigate to the extensions page (chrome://extensions/)
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked"
5. Select the extension directory to complete installation

### How to Use
1. After installing the extension, click the extension icon in the toolbar
2. Set your personal information:
   - Nickname (optional, default: 時光)
   - Email (optional, default: an_shiguang@163.com)
   - Website (optional)
3. Click "Save Settings" to save your information
4. Click "Fill Now" in the comment section to auto-fill information

### Privacy Notice
- All data is stored locally in your browser
- No personal information is collected or uploaded
- Source code is fully open for inspection

### Development
- Built with Chrome Extension Manifest V3
- Pure JavaScript implementation, no external dependencies
- Supports automatic script injection and event handling

### Directory Structure
```
├── manifest.json    // Extension configuration file
├── popup.html      // Popup window interface
├── popup.js        // Popup window logic
├── content.js      // Content script
├── background.js   // Background script
└── README.md       // Documentation
```

### Feedback
If you encounter any issues or have suggestions, feel free to provide feedback through:
1. Submitting issues on GitHub
2. Sending email to an_shiguang@163.com

### License
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