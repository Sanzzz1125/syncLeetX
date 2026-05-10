# SyncLeetX 🚀

Automatically sync your accepted LeetCode solutions to GitHub with beautiful README generation, difficulty-based folders, and live profile statistics.

---

# ✨ Features

* 🔥 Auto-sync accepted LeetCode submissions to GitHub
* 📂 Organizes problems by difficulty (Easy / Medium / Hard)
* 📝 Generates README for every problem automatically
* 📊 Live LeetCode statistics in root README
* 🎨 Difficulty badges using shields.io
* ⚡ Works instantly after Accepted submissions
* 🧠 Extracts code directly from Monaco editor
* 🔐 Uses Fine-Grained GitHub Personal Access Tokens
* 🌐 No backend required
* 🧩 Chrome Extension (Manifest V3)

---

# 📸 Demo

## Root README Example

```md
# LeetCode Practice 🚀

![Total Solved](https://img.shields.io/badge/Total_Solved-350-blue)
![Easy](https://img.shields.io/badge/Easy-120-brightgreen)
![Medium](https://img.shields.io/badge/Medium-190-yellow)
![Hard](https://img.shields.io/badge/Hard-40-red)
```

---

# 📂 Generated Repository Structure

```text
LeetCode-practice
│
├── README.md
│
├── Easy
│   ├── Symmetric Tree
│   │   ├── solution.java
│   │   └── README.md
│   │
│   └── Two Sum
│       ├── solution.cpp
│       └── README.md
│
├── Medium
│   └── Pow(x, n)
│       ├── solution.java
│       └── README.md
│
└── Hard
```

---

# 🛠️ Tech Stack

* JavaScript
* Chrome Extension APIs
* GitHub REST API
* LeetCode GraphQL API
* Manifest V3

---

# ⚙️ Installation Guide

## 1. Clone Repository

```bash
git clone https://github.com/Sanzzz1125/SyncLeetX.git
```

---

## 2. Open Chrome Extensions

Go to:

```text
chrome://extensions
```

Enable:

```text
Developer Mode
```

---

## 3. Load Extension

Click:

```text
Load unpacked
```

Select the extension folder.

---

# 🔑 GitHub Token Setup

## 1. Open GitHub Fine-Grained Tokens

Go to:

[https://github.com/settings/personal-access-tokens/new](https://github.com/settings/personal-access-tokens/new)

---

## 2. Configure Token

### Token Name

```text
SyncLeetX
```

---

### Repository Access

Choose:

```text
Only select repositories
```

Select your LeetCode repository.

Example:

```text
LeetCode-practice
```

---

### Repository Permissions

| Permission | Access         |
| ---------- | -------------- |
| Contents   | Read and Write |
| Metadata   | Read-only      |

---

## 3. Generate Token

Copy the generated token.

⚠️ Important:
Never share your token publicly.

---

# 🔧 Extension Configuration

Open the extension popup and enter:

| Field           | Example           |
| --------------- | ----------------- |
| GitHub Username | Sanzzz1125        |
| Repository Name | LeetCode-practice |
| GitHub Token    | github_pat_xxxxx  |

Click:

```text
Save
```

---

# 🚀 Usage

1. Open any LeetCode problem
2. Write solution
3. Submit
4. Wait for Accepted
5. SyncLeetX automatically uploads:

* Solution code
* Problem README
* Root README statistics

---

# 📄 Example Problem README

```md
# Symmetric Tree

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-brightgreen)

---

## Topics

- Tree
- Depth First Search
- Breadth First Search
- Binary Tree

---

## Problem Link

https://leetcode.com/problems/symmetric-tree/

---

## Language

java
```

---

# 🧠 How It Works

```text
LeetCode Submission
        ↓
Content Script Detection
        ↓
Accepted Result Observer
        ↓
Code Extraction From Monaco Editor
        ↓
GitHub REST API Upload
        ↓
README Auto Generation
```

---

# 🔒 Security

* Tokens are stored locally using:

```text
chrome.storage.local
```

* No external backend server
* No third-party database
* No user tracking

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

# 🐛 Troubleshooting

## Extension loads but no sync

Reload extension:

```text
chrome://extensions
```

Then refresh LeetCode.

---

## GitHub 401 Error

Your token is invalid or expired.

Generate a new Fine-Grained GitHub token.

---

## Problem says Already Synced

Open extension service worker console and run:

```javascript
chrome.storage.local.remove("lastSyncedProblem");
```

---

## No code extracted

Refresh the LeetCode page and submit again.

---

# 🧩 Project Architecture

```text
SyncLeetX
│
├── manifest.json
├── background.js
├── content.js
├── sync.js
├── extractor.js
├── inject.js
├── storage.js
├── constants.js
└── popup.html
```

---

# 📈 Future Improvements

* 🌙 Dark themed popup UI
* 📊 Contest statistics support
* 🧠 AI-generated explanations
* 📱 Firefox extension support
* ☁️ Cloud backup
* 🏆 Daily streak tracking
* 📉 Submission analytics dashboard

---

# 👨‍💻 Author

## Thatikonda Sanketh

* B.Tech CSE Student
* Passionate about development, automation, and problem solving

GitHub:

[https://github.com/Sanzzz1125](https://github.com/Sanzzz1125)

---

# ⭐ Contributing

Contributions are welcome.

1. Fork repository
2. Create feature branch
3. Commit changes
4. Open Pull Request

---

# 📜 License

MIT License

---

# 🌟 Support

If you like this project:

⭐ Star the repository
🍴 Fork the project
📢 Share with friends

---

# 🚀 SyncLeetX

> Auto-sync your LeetCode journey to GitHub like a pro.
