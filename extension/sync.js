// -----------------------------------
// Fetch Real LeetCode Stats
// -----------------------------------

async function getLeetCodeStats(username, leetcodeSession) {
    const query = `
    query userProfileUserQuestionProgressV2($userSlug: String!) {
        userProfileUserQuestionProgressV2(userSlug: $userSlug) {
            numAcceptedQuestions {
                difficulty
                count
            }
        }
    }
    `;

    const response = await fetch(
        "https://leetcode.com/graphql",

        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            credentials: "include",

            body: JSON.stringify({
                query,

                variables: {
                    userSlug: username,
                },
            }),
        },
    );

    const result = await response.json();

    const stats =
        result?.data?.userProfileUserQuestionProgressV2?.numAcceptedQuestions ||
        [];

    let easy = 0;
    let medium = 0;
    let hard = 0;

    stats.forEach((item) => {
        if (item.difficulty === "EASY") {
            easy = item.count;
        }

        if (item.difficulty === "MEDIUM") {
            medium = item.count;
        }

        if (item.difficulty === "HARD") {
            hard = item.count;
        }
    });

    return {
        easy,
        medium,
        hard,
        total: easy + medium + hard,
    };
}
async function waitForUpdatedStats(username, oldTotal) {
    for (let i = 0; i < 15; i++) {
        const stats = await getLeetCodeStats(username);

        if (stats.total > oldTotal) {
            return stats;
        }

        console.log("Waiting for LeetCode stats update...");

        await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    // fallback

    return await getLeetCodeStats(username);
}
// -----------------------------------
// Upload File To GitHub
// -----------------------------------

async function uploadFile({
    githubToken,
    owner,
    repo,
    path,
    content,
    message,
}) {
    let sha;

    const existing = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,

        {
            headers: {
                Authorization: `Bearer ${githubToken}`,
            },
        },
    );

    if (existing.ok) {
        const json = await existing.json();

        sha = json.sha;
    }

    const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,

        {
            method: "PUT",

            headers: {
                Authorization: `Bearer ${githubToken}`,

                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                message,

                content: btoa(unescape(encodeURIComponent(content))),

                sha,
            }),
        },
    );

    const result = await response.json();

    if (!response.ok) {
        console.log(result);

        throw new Error(result.message);
    }
}

// -----------------------------------
// Main Sync Function
// -----------------------------------

async function syncToGitHub(data) {
    try {
        // -----------------------------------
        // Get Stored GitHub Data
        // -----------------------------------

        const { githubUsername, repoName, githubToken } =
            await chrome.storage.local.get([
                "githubUsername",
                "repoName",
                "githubToken",
            ]);

        const owner = githubUsername;
        const repo = repoName;

        let stats = {
            total: 0,
        };

        if (data.platform === "LeetCode") {
            stats = await waitForUpdatedStats(
                data.username,
                data.previousTotal || 0,
            );
        }

        await chrome.storage.local.set({
            leetcodeStats: {
                easy: stats.easy,
                medium: stats.medium,
                hard: stats.hard,
                total: stats.total,
            },

            latestProblem: data.title,

            leetcodeUsername: data.username,
        });

        // -----------------------------------
        // File Extension
        // -----------------------------------

        const extensions = {
            cpp: "cpp",
            java: "java",
            python: "py",
            javascript: "js",
            c: "c",
        };

        const extension = extensions[data.language] || "txt";

        // -----------------------------------
        // Folder Structure
        // -----------------------------------

        const folder = data.difficulty.replace(/\s+/g, "");

        const title = data.title
            .replace(/^\d+\.\s*/, "")
            .replace(/[\\/:*?"<>|]/g, "")
            .trim();

        const platform = data.platform || "LeetCode";

        const folderPath = `${platform}/${folder}/${title}`;

        // -----------------------------------
        // Upload Solution
        // -----------------------------------

        await uploadFile({
            githubToken,

            owner,

            repo,

            path: `${folderPath}/solution.${extension}`,

            content: data.code,

            message: `Solved ${data.title}`,
        });

        // -----------------------------------
        // Problem README
        // -----------------------------------

        const difficultyColors = {
            Easy: "brightgreen",
            Medium: "yellow",
            Hard: "red",
        };

        const problemReadme = `# ${data.title}

![Difficulty](https://img.shields.io/badge/Difficulty-${data.difficulty}-${difficultyColors[data.difficulty] || "blue"})

---

## Topics

${
    data.topics?.length
        ? data.topics.map((topic) => `- ${topic}`).join("\n")
        : "No topics found"
}

---

## Problem Link

${data.problemUrl}

---

## Problem Statement

${data.question || "Problem statement not available."}

---

## Language

${data.language}

---

Powered by SyncLeetX ⚡
`;

        await uploadFile({
            githubToken,

            owner,

            repo,

            path: `${folderPath}/README.md`,

            content: problemReadme,

            message: `Added README for ${data.title}`,
        });

        // -----------------------------------
        // Root README
        // -----------------------------------

        const rootReadme = `# LeetCode Practice 🚀

![Total Solved](https://img.shields.io/badge/Total_Solved-${stats.total}-blue)

![Easy](https://img.shields.io/badge/Easy-${stats.easy}-brightgreen)

![Medium](https://img.shields.io/badge/Medium-${stats.medium}-yellow)

![Hard](https://img.shields.io/badge/Hard-${stats.hard}-red)

---

## 👤 LeetCode User

${data.username}

---

## 🔥 Latest Solved Problem

${data.title}

---

## 📊 Statistics

| Difficulty | Solved |
|---|---|
| Easy | ${stats.easy} |
| Medium | ${stats.medium} |
| Hard | ${stats.hard} |
| Total | ${stats.total} |

---

Powered by SyncLeetX ⚡
`;

        await uploadFile({
            githubToken,

            owner,

            repo,

            path: `README.md`,

            content: rootReadme,

            message: `Updated root README`,
        });

        console.log("Sync Successful 🚀");
        return true;
    } catch (error) {
        console.log("Sync Failed:", error);
        return false;
    }
}
