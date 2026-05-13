async function loadStats() {
    try {
        const result = await chrome.storage.local.get([
            "leetcodeStats",
            "latestProblem",
            "leetcodeUsername",
        ]);

        const stats = result.leetcodeStats || {
            easy: 0,
            medium: 0,
            hard: 0,
            total: 0,
        };

        document.getElementById("easySolved").innerText = stats.easy;

        document.getElementById("mediumSolved").innerText = stats.medium;

        document.getElementById("hardSolved").innerText = stats.hard;

        document.getElementById("totalSolved").innerText = stats.total;

        document.getElementById("username").innerText =
            result.leetcodeUsername || "Sanketh1125";

        document.getElementById("latestProblem").innerText =
            result.latestProblem || "No submissions yet";
    } catch (error) {
        console.log("Popup load failed:", error);
    }
}

loadStats();

document.getElementById("saveBtn").addEventListener("click", async () => {
    const githubUsername = document.getElementById("githubUsername").value;

    const repoName = document.getElementById("repoName").value;

    const githubToken = document.getElementById("githubToken").value;

    await chrome.storage.local.set({
        githubUsername,
        repoName,
        githubToken,
    });

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
