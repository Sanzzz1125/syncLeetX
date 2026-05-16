# SyncLeetX 🚀

Auto-sync your accepted **LeetCode** and **GeeksForGeeks** solutions to GitHub with a modern analytics dashboard, live stats, recent solved tracking, auto-generated READMEs, and difficulty-based organization — all from a Chrome extension with zero backend.

---

# ✨ Features

- 🔥 Auto-sync accepted LeetCode + GeeksForGeeks submissions to GitHub
- 📂 Organizes problems by difficulty automatically
- 📝 Generates beautiful README files for every problem
- 📊 Live LeetCode and GFG analytics inside popup dashboard
- 📈 Interactive progress analytics charts
- 🕒 Recent solved problems tracker (latest 10)
- 🔗 Clickable recent problems that reopen the original question
- ⚡ Instant syncing after Accepted submissions
- 🧠 Extracts code directly from Monaco (LeetCode) and Ace (GFG) editors
- 🎨 Modern premium popup dashboard UI
- 🔐 Secure GitHub token-based uploads
- 🌐 Fully frontend — no backend required
- 🧩 Manifest V3 Chrome Extension

---

# 📸 Dashboard Preview

## 🖥️ Popup Analytics Dashboard

- Live platform switching
- LeetCode + GFG stats
- Progress analytics donut chart
- Recent solved problems
- Difficulty breakdown
- Live sync updates

---

# 📂 Generated Repository Structure

```text
CodeSync
│
├── README.md
│
├── LeetCode
│   ├── Easy
│   ├── Medium
│   └── Hard
│
└── GeeksForGeeks
    ├── School
    ├── Basic
    ├── Easy
    ├── Medium
    └── Hard
```

Each problem folder contains:

```text
Problem Name
├── solution.java
└── README.md
```

---

# 🛠️ Tech Stack

- JavaScript
- Chrome Extension APIs
- GitHub REST API
- LeetCode GraphQL API
- GeeksForGeeks Submission APIs
- Manifest V3
- Chrome Storage API

---

# ⚙️ Installation Guide

## 📥 1. Clone Repository

```bash
git clone https://github.com/Sanzzz1125/SyncLeetX.git
```

---

## 🌐 2. Open Chrome Extensions

```text
chrome://extensions
```

Enable:

```text
Developer Mode
```

---

## 🧩 3. Load Extension

Click:

```text
Load unpacked
```

Select:

```text
SyncLeetX/extension
```

---

# 🔑 GitHub Token Setup

## Open GitHub Tokens Page

https://github.com/settings/tokens

---

# Required Permissions

For Fine-Grained Token:

| Permission | Access |
|---|---|
| Contents | Read and Write |
| Metadata | Read Only |

Repository access:

```text
Only selected repositories
```

Select your coding repository.

---

# 🔧 Extension Configuration

Open popup → ⚙ Settings

Fill:

| Field | Example |
|---|---|
| GitHub Username | Sanzzz1125 |
| Repository Name | CodeSync |
| GitHub Token | github_pat_xxxxx |

Click:

```text
Save 🚀
```

---

# 🚀 Usage

# 🟡 LeetCode

1. Open any LeetCode problem
2. Write solution
3. Submit
4. Wait for Accepted
5. SyncLeetX automatically:
   - uploads solution
   - updates README
   - updates popup analytics
   - stores recent solved problem

---

# 🟢 GeeksForGeeks

1. Open any GFG problem
2. Make sure you're logged in
3. Submit solution
4. Wait for:

```text
Problem Solved Successfully
```

5. SyncLeetX automatically syncs everything

---

# 📊 Popup Dashboard Features

## ✅ Live Analytics

- Total solved
- Difficulty-wise distribution
- Donut analytics chart
- Live sync updates

---

## 🕒 Recent Solved Section

- Stores latest 10 solved problems
- Difficulty badges
- Platform badges
- Clickable direct problem links

---

# 📄 Auto-Generated Problem README

Example:

```md
# Two Sum

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-brightgreen)

---

## Topics

- Array
- HashMap

---

## Problem Link

https://leetcode.com/problems/two-sum/

---

## Language

java

---

Powered by SyncLeetX ⚡
```

---

# 🧠 How It Works

```text
Submit Problem
      ↓
content.js detects Accepted
      ↓
inject.js extracts editor code
      ↓
extractor.js collects metadata
      ↓
sync.js uploads files to GitHub
      ↓
popup.js updates dashboard analytics
      ↓
Recent solved problems update live
```

---

# 🔒 Security

- GitHub token stored locally via `chrome.storage.local`
- No backend server
- No third-party database
- No tracking
- No credential sharing
- GFG stats fetched using your own browser session

---

# 📌 Supported Languages

| Language | Extension |
|---|---|
| Java | .java |
| C++ | .cpp |
| Python | .py |
| JavaScript | .js |
| C | .c |

---

# 📊 Supported Platforms

| Platform | Supported Difficulties |
|---|---|
| LeetCode | Easy, Medium, Hard |
| GeeksForGeeks | School, Basic, Easy, Medium, Hard |

---

# 🐛 Troubleshooting

## ❌ GitHub 401 Bad Credentials

Generate a new token:

https://github.com/settings/tokens

Update it in extension settings.

---

## ❌ GFG Stats Show 0

Make sure:
- you are logged into GFG
- same browser session is active

---

## ❌ Extension Not Syncing

Reload extension:

```text
chrome://extensions
```

Then refresh coding tabs.

---

## ❌ Already Synced

Open extension console and run:

```js
chrome.storage.local.remove("lastSynced");
```

---

# 📁 File Responsibilities

| File | Purpose |
|---|---|
| manifest.json | Extension permissions/config |
| content.js | Detects submissions |
| inject.js | Extracts editor code |
| extractor.js | Extracts metadata/stats |
| sync.js | GitHub upload logic |
| popup.js | Popup dashboard logic |
| popup.css | Dashboard UI styling |
| storage.js | Local storage utilities |
| background.js | Session/cookie handling |

---

# 📈 Future Improvements

- 🏆 Daily streak tracking
- 📉 Submission heatmaps
- 📊 Contest analytics
- 🧠 AI-generated explanations
- 📱 Firefox support
- ☁️ Cloud sync
- 🔔 Desktop notifications
- 🌙 Advanced themes
- 📅 Submission calendar

---

# 👨‍💻 Author

## Thatikonda Sanketh

- B.Tech CSE Student
- Passionate about automation, extensions, and development

GitHub:
https://github.com/Sanzzz1125

---

# ⭐ Support

If you like the project:

- ⭐ Star the repository
- 🍴 Fork it
- 📢 Share it with friends

---

# 📚 Example Generated Repository

https://github.com/Sanzzz1125/CodeSync

Explore:
- auto-generated READMEs
- live synced stats
- difficulty-wise organization
- LeetCode + GFG integration

---

> SyncLeetX — Track • Sync • Dominate ⚡
