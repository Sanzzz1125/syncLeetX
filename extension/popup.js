// ─── Platform Switch ─────────────────────────────────────────────────────────

function switchPlatform(platform) {
    const lcView = document.getElementById("lcView");
    const gfgView = document.getElementById("gfgView");
    const lcBtn = document.getElementById("lcBtn");
    const gfgBtn = document.getElementById("gfgBtn");

    if (platform === "lc") {
        lcView.classList.remove("hidden");
        gfgView.classList.add("hidden");
        lcBtn.classList.add("active");
        gfgBtn.classList.remove("active");
    } else {
        gfgView.classList.remove("hidden");
        lcView.classList.add("hidden");
        gfgBtn.classList.add("active");
        lcBtn.classList.remove("active");
    }
}

// ─── Load Stats from Storage ─────────────────────────────────────────────────

async function loadStats() {
    try {
        const result = await chrome.storage.local.get([
            "leetcodeStats",
            "latestProblem",
            "leetcodeUsername",
            "gfgStats",
            "latestGFGProblem",
        ]);

        // --- LeetCode ---
        const lcStats = result.leetcodeStats || {
            easy: 0,
            medium: 0,
            hard: 0,
            totalSolved: 0,
        };

        document.getElementById("lcTotal").innerText = lcStats.total;
        document.getElementById("lcEasy").innerText = lcStats.easy;
        document.getElementById("lcMedium").innerText = lcStats.medium;
        document.getElementById("lcHard").innerText = lcStats.hard;
        document.getElementById("lcUsername").innerText =
            result.leetcodeUsername || "Not logged in";
        document.getElementById("lcLatest").innerText =
            result.latestProblem || "No submissions yet";

        // --- GeeksForGeeks ---
        const gfgStats = result.gfgStats || {
            school: 0,
            basic: 0,
            easy: 0,
            medium: 0,
            hard: 0,
            total: 0,
        };

        const gfgTotal =
            (gfgStats.school || 0) +
            (gfgStats.basic || 0) +
            (gfgStats.easy || 0) +
            (gfgStats.medium || 0) +
            (gfgStats.hard || 0);

        document.getElementById("gfgTotal").innerText = gfgTotal;
        document.getElementById("gfgSchool").innerText = gfgStats.school || 0;
        document.getElementById("gfgBasic").innerText = gfgStats.basic || 0;
        document.getElementById("gfgEasy").innerText = gfgStats.easy || 0;
        document.getElementById("gfgMedium").innerText = gfgStats.medium || 0;
        document.getElementById("gfgHard").innerText = gfgStats.hard || 0;
        document.getElementById("gfgLatest").innerText =
            result.latestGFGProblem || "No submissions yet";
    } catch (error) {
        console.log("Popup load failed:", error);
    }
}

loadStats();

// ─── Settings ────────────────────────────────────────────────────────────────

document.getElementById("saveBtn").addEventListener("click", async () => {
    const githubUsername = document.getElementById("githubUsername").value;
    const repoName = document.getElementById("repoName").value;
    const githubToken = document.getElementById("githubToken").value;

    await chrome.storage.local.set({ githubUsername, repoName, githubToken });
    alert("Settings Saved 🚀");
});

const settingsToggle = document.getElementById("settingsToggle");
const settingsModal = document.getElementById("settingsModal");

settingsToggle.addEventListener("click", () => {
    settingsModal.classList.toggle("hidden");
});

settingsModal.addEventListener("click", (e) => {
    if (e.target === settingsModal) {
        settingsModal.classList.add("hidden");
    }
});

document.getElementById("lcBtn").addEventListener("click", () => {
    switchPlatform("lc");
});

document.getElementById("gfgBtn").addEventListener("click", () => {
    switchPlatform("gfg");
});
