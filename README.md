# SyncLeetX 🚀
 
Automatically sync your accepted LeetCode and GeeksForGeeks solutions to GitHub with beautiful README generation, difficulty-based folders, and live profile statistics — all from a Chrome extension with zero backend.
 
---
 
# ✨ Features
 
* 🔥 Auto-sync accepted LeetCode **and GeeksForGeeks** submissions to GitHub
* 📂 Organizes problems by difficulty (School / Basic / Easy / Medium / Hard)
* 📝 Generates a README for every problem automatically
* 📊 Live LeetCode **and GFG** statistics in root README
* 🎨 Difficulty badges using shields.io
* ⚡ Works instantly after Accepted submissions
* 🧠 Extracts code directly from Monaco (LeetCode) and Ace (GFG) editors
* 🔐 Uses Fine-Grained GitHub Personal Access Tokens
* 🌐 No backend required — everything runs inside the extension
* 🧩 Chrome Extension (Manifest V3)
---
 
# 📸 Demo
 
## Root README Example
 
```md
# CodeSyncHub 🚀
 
## 🟢 LeetCode Stats
 
![Total Solved](https://img.shields.io/badge/Total_Solved-358-blue)
![Easy](https://img.shields.io/badge/Easy-227-brightgreen)
![Medium](https://img.shields.io/badge/Medium-121-yellow)
![Hard](https://img.shields.io/badge/Hard-10-red)
 
## 👤 LeetCode User
Sanketh1125
 
## 🔥 Latest Solved Problem
Roman to Integer
 
## 🟢 GeeksForGeeks Stats
 
![Total Solved](https://img.shields.io/badge/Total_Solved-44-blue)
![Basic](https://img.shields.io/badge/Basic-11-lightgrey)
![Easy](https://img.shields.io/badge/Easy-23-brightgreen)
![Medium](https://img.shields.io/badge/Medium-10-yellow)
![Hard](https://img.shields.io/badge/Hard-0-red)
 
## 🔥 Latest GFG Problem
ZigZag Tree Traversal
```
 
---
 
# 📂 Generated Repository Structure
 
```text
LeetCode-practice
│
├── README.md                        ← Auto-updated root stats
│
├── LeetCode
│   ├── Easy
│   │   └── Two Sum
│   │       ├── solution.java
│   │       └── README.md
│   ├── Medium
│   │   └── Pow(x, n)
│   │       ├── solution.java
│   │       └── README.md
│   └── Hard
│       └── Median of Two Sorted Arrays
│           ├── solution.java
│           └── README.md
│
└── GeeksForGeeks
    ├── School
    │   └── Print Hello World
    │       ├── solution.java
    │       └── README.md
    ├── Basic
    │   └── Sum of Array Elements
    │       ├── solution.java
    │       └── README.md
    ├── Easy
    │   └── Reverse a String
    │       ├── solution.java
    │       └── README.md
    ├── Medium
    │   └── ZigZag Tree Traversal
    │       ├── solution.java
    │       └── README.md
    └── Hard
        └── Maximum Sum Rectangle
            ├── solution.java
            └── README.md
```
 
---
 
# 🛠️ Tech Stack
 
* JavaScript (Chrome Extension APIs)
* GitHub REST API
* LeetCode GraphQL API
* GFG Submissions API
* Manifest V3
---
 
# ⚙️ Installation Guide
 
## 📥 1. Download the Project
 
Clone the repository:
 
```bash
git clone https://github.com/Sanzzz1125/SyncLeetX.git
```
 
OR download the ZIP directly from GitHub.
 
---
 
## 📂 2. Project Structure
 
```text
SyncLeetX
│
└── extension
    ├── background.js
    ├── constants.js
    ├── content.js
    ├── extractor.js
    ├── inject.js
    ├── manifest.json
    ├── popup.css
    ├── popup.html
    ├── popup.js
    ├── storage.js
    └── sync.js
```
 
---
 
## 🌐 3. Open Chrome Extensions
 
```text
chrome://extensions
```
 
Enable **Developer Mode** (top right toggle).
 
---
 
## 🧩 4. Load the Extension
 
Click **Load unpacked** → select the `SyncLeetX/extension` folder.
 
The extension icon will appear in Chrome's toolbar.
 
---
 
# 🔑 GitHub Token Setup
 
## 1. Open GitHub Fine-Grained Tokens
 
[https://github.com/settings/personal-access-tokens/new](https://github.com/settings/personal-access-tokens/new)
 
---
 
## 2. Configure Token
 
**Token Name**
```text
SyncLeetX
```
 
**Repository Access**
```text
Only select repositories → select your practice repository
```
 
**Repository Permissions**
 
| Permission | Access         |
| ---------- | -------------- |
| Contents   | Read and Write |
| Metadata   | Read-only      |
 
---
 
## 3. Generate and Copy Token
 
⚠️ Copy it immediately — GitHub shows it only once. Never share it publicly.
 
---
 
# 🔧 Extension Configuration
 
After loading the extension:
 
1. Click the SyncLeetX icon in Chrome
2. Click the settings icon
3. Fill in:
| Field           | Example           |
| --------------- | ----------------- |
| GitHub Username | Sanzzz1125        |
| Repository Name | LeetCode-practice |
| GitHub Token    | github\_pat\_xxxxx |
 
4. Click **Save**
Values are stored locally using `chrome.storage.local` — never sent anywhere.
 
---
 
# 🚀 Usage
 
## LeetCode
 
1. Open any problem on [https://leetcode.com](https://leetcode.com)
2. Write your solution
3. Click **Submit**
4. Wait for **Accepted**
5. SyncLeetX automatically pushes your solution to GitHub
## GeeksForGeeks
 
1. Open any problem on [https://www.geeksforgeeks.org](https://www.geeksforgeeks.org)
2. Make sure you are **logged in**
3. Write your solution
4. Click **Submit**
5. Wait for **Problem Solved Successfully** or **Correct Answer**
6. SyncLeetX automatically pushes your solution to GitHub
---
 
# 📄 Example Problem README
 
```md
# ZigZag Tree Traversal
 
![Difficulty](https://img.shields.io/badge/Difficulty-Medium-yellow)
 
---
 
## Topics
 
- Tree
- Breadth First Search
- Stack
 
---
 
## Problem Link
 
https://www.geeksforgeeks.org/problems/zigzag-tree-traversal/
 
---
 
## Problem Statement
 
Given a Binary Tree, find the zigzag level order traversal...
 
---
 
## Language
 
java
 
---
 
Powered by SyncLeetX ⚡
```
 
---
 
# 🧠 How It Works
 
```text
User clicks Submit
        ↓
content.js detects button click
        ↓
MutationObserver waits for Accepted result
        ↓
inject.js extracts code from Monaco / Ace editor
        ↓
extractor.js collects title, difficulty, language, topics, stats
        ↓
sync.js fetches LeetCode GraphQL API / GFG Submissions API
        ↓
GitHub REST API uploads solution + problem README
        ↓
Root README updated with latest stats
```
 
---
 
# 🔒 Security
 
* GitHub token stored locally via `chrome.storage.local`
* No external backend server
* No third-party database
* No user tracking
* GFG stats fetched using your own browser session — no credentials leave your machine
---
 
# 📌 Supported Languages
 
| Language   | Extension |
| ---------- | --------- |
| Java       | .java     |
| C++        | .cpp      |
| Python     | .py       |
| JavaScript | .js       |
| C          | .c        |
 
---
 
# 📊 Supported Platforms
 
| Platform      | Difficulties Supported                    |
| ------------- | ----------------------------------------- |
| LeetCode      | Easy, Medium, Hard                        |
| GeeksForGeeks | School, Basic, Easy, Medium, Hard         |
 
---
 
# 🐛 Troubleshooting
 
## Extension loads but nothing syncs
 
Go to `chrome://extensions` → reload SyncLeetX → refresh the LeetCode/GFG tab.
 
---
 
## GitHub 401 Error
 
Token is invalid or expired. Generate a new Fine-Grained token at `github.com/settings/tokens`.
 
---
 
## Already Synced message
 
Open the extension service worker console (`chrome://extensions` → Service Worker) and run:
 
```javascript
chrome.storage.local.remove("lastSynced");
```
 
---
 
## GFG stats show 0
 
Make sure you are logged into GFG in the same browser. The extension reads your session to fetch stats.
 
---
 
## No code extracted
 
Refresh the problem page and submit again. On GFG, make sure the Ace editor has fully loaded before submitting.
 
---
 
# 🧩 File Responsibilities
 
| File            | What it does                                              |
| --------------- | --------------------------------------------------------- |
| `manifest.json` | Tells Chrome which sites to run on and which files to load |
| `content.js`    | Watches for Submit click and Accepted result              |
| `inject.js`     | Reads code from Monaco/Ace editor inside the page         |
| `extractor.js`  | Extracts title, difficulty, language, username, GFG stats |
| `sync.js`       | Calls APIs, builds READMEs, uploads to GitHub             |
| `storage.js`    | Saves and loads last synced problem key                   |
| `background.js` | Handles LeetCode session cookie access                    |
| `popup.html`    | The UI when you click the extension icon                  |
| `popup.js`      | Reads storage and displays stats in the popup             |
| `constants.js`  | Shared constants like supported languages                 |
 
---
 
# 📈 Future Improvements
 
* 🌙 Dark themed popup UI
* 📊 Contest statistics support
* 🧠 AI-generated problem explanations
* 📱 Firefox extension support
* ☁️ Cloud backup option
* 🏆 Daily streak tracking
* 📉 Submission analytics dashboard
* 🔔 Sync notifications
---
 
# 👨‍💻 Author
 
## Thatikonda Sanketh
 
* B.Tech CSE Student
* Passionate about development, automation, and problem solving
GitHub: [https://github.com/Sanzzz1125](https://github.com/Sanzzz1125)
 
---
 
# ⭐ Contributing
 
Contributions are welcome.
 
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request
---
 
# 📜 License
 
MIT License
 
---
 
# 🌟 Support
 
If this project helps you:
 
⭐ Star the repository
🍴 Fork the project
📢 Share with friends
 
---
 
# 📚 Reference Repository
 
See a real working repository generated by SyncLeetX:
 
[https://github.com/Sanzzz1125/CodeSync](https://github.com/Sanzzz1125/CodeSync)
 
Explore auto-generated READMEs, difficulty-based folders for both LeetCode and GFG, and live synced statistics.
 
---
 
> SyncLeetX — Auto-sync your coding journey to GitHub like a pro. 🚀
