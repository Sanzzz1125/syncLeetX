# SyncLeetX Setup Guide ⚙️

This guide explains how to install, configure, and use SyncLeetX.

---

# 📦 Installation

## 1. Clone Repository

```bash
git clone https://github.com/Sanzzz1125/SyncLeetX.git
```

---

## 2. Open Chrome Extensions

Open:

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

Select:

```text
SyncLeetX/extension
```

---

# 🔑 GitHub Token Setup

Open:

https://github.com/settings/tokens

Create a:

```text
Fine-grained Personal Access Token
```

---

# Required Permissions

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

# 🔧 Configure Extension

Open the extension popup.

Click:

```text
⚙ Settings
```

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
   - updates popup stats
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

# 📊 Popup Features

- Live analytics dashboard
- Difficulty breakdown
- Recent solved problems
- Clickable solved problems
- Progress charts
- Live sync updates

---

# 📄 Auto-Generated Problem README

Example:

```md
# Two Sum

![Difficulty](https://img.shields.io/badge/Difficulty-Easy-brightgreen)

## Topics

- Array
- HashMap

## Problem Link

https://leetcode.com/problems/two-sum/

Powered by SyncLeetX ⚡
```

---

# 🧠 Internal Workflow

```text
Submit Problem
      ↓
content.js detects Accepted
      ↓
inject.js extracts editor code
      ↓
extractor.js collects metadata
      ↓
sync.js uploads to GitHub
      ↓
popup.js updates analytics
```

---

# 🔒 Security

- GitHub token stored locally
- No backend server
- No tracking
- No external database
- GFG stats fetched using your own session

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

| Platform | Difficulties |
|---|---|
| LeetCode | Easy, Medium, Hard |
| GeeksForGeeks | School, Basic, Easy, Medium, Hard |

---

# 🐛 Troubleshooting

## GitHub 401 Bad Credentials

Generate a new token:

https://github.com/settings/tokens

Then update extension settings.

---

## GFG Stats Show 0

Make sure:
- you are logged into GFG
- same browser session is active

---

## Extension Not Syncing

Reload extension from:

```text
chrome://extensions
```

Then refresh coding tabs.

---

## Already Synced

Run:

```js
chrome.storage.local.remove("lastSynced");
```

inside extension console.

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
| storage.js | Local storage helpers |
| background.js | Session/cookie handling |

---

# 📈 Planned Features

- 🏆 Daily streak system
- 📉 Submission heatmaps
- 📊 Contest analytics
- ☁️ Cloud sync
- 📱 Firefox support
- 🔔 Notifications
- 🌙 Advanced themes

---

> SyncLeetX — Auto-sync your coding journey like a pro ⚡
