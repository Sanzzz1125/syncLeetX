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

async function loadStats() {
    try {
        const result = await chrome.storage.local.get([
            "leetcodeStats",
            "latestProblem",
            "leetcodeUsername",
            "gfgStats",
            "latestGFGProblem",
            "gfgUsername",
            "recentProblems",
        ]);

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
        const lcPercent = Math.min(
            Math.round((lcStats.total / 4000) * 100),
            100,
        );

        document.getElementById("lcSolvedPercent").innerText = `${lcPercent}%`;
        document.getElementById("lcUsername").innerText =
            result.leetcodeUsername || "Not logged in";
        document.getElementById("lcLatest").innerText =
            result.latestProblem || "No submissions yet";

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
        const gfgPercent = Math.min(
            Math.round((gfgStats.total / 1000) * 100),
            100,
        );

        document.getElementById("gfgSolvedPercent").innerText =
            `${gfgPercent}%`;
        document.getElementById("gfgUsername").innerText =
            result.gfgUsername || "GFG User";
        document.getElementById("gfgLatest").innerText =
            result.latestGFGProblem || "No submissions yet";

        const recent = result.recentProblems || [];

        const lcRecentList = document.getElementById("lcRecentList");

        const gfgRecentList = document.getElementById("gfgRecentList");

        lcRecentList.innerHTML = "";
        gfgRecentList.innerHTML = "";

        recent.forEach((problem) => {
            const badgeClass =
                problem.difficulty === "Easy"
                    ? "diff-easy"
                    : problem.difficulty === "Medium"
                      ? "diff-medium"
                      : "diff-hard";

            const icon = problem.platform === "LeetCode" ? "🟡" : "🟢";

            const item = `
    <a
        class="recent-item clickable-item"
        href="${problem.url || "#"}"
        target="_blank"
    >
        <div class="recent-left">
            <div class="recent-icon">
                ${icon}
            </div>

            <div class="recent-info">
                <h4>
                    ${problem.title}
                </h4>

                <p>
                    ${problem.platform}
                </p>
            </div>
        </div>

        <div class="diff-badge ${badgeClass}">
            ${problem.difficulty}
        </div>
    </a>
`;

            if (problem.platform === "LeetCode") {
                lcRecentList.innerHTML += item;
            } else {
                gfgRecentList.innerHTML += item;
            }
        });
    } catch (error) {
        console.log("Popup load failed:", error);
    }
}

loadStats();

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
