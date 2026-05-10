const saveBtn = document.getElementById("save");

const status = document.getElementById("status");

saveBtn.addEventListener(
    "click",

    async () => {
        const token = document.getElementById("token").value.trim();

        const username = document.getElementById("username").value.trim();

        const repo = document.getElementById("repo").value.trim();

        // -----------------------------------
        // Validation
        // -----------------------------------

        if (!token || !username || !repo) {
            status.innerText = "Please fill all fields.";

            return;
        }

        // -----------------------------------
        // Save Config
        // -----------------------------------

        await chrome.storage.local.set({
            githubToken: token,

            githubUsername: username,

            githubRepo: repo,
        });

        status.innerText = "SyncLeetX Ready 🚀";
    },
);

// -----------------------------------
// Auto Fill Existing Data
// -----------------------------------

(async () => {
    const data = await chrome.storage.local.get([
        "githubToken",

        "githubUsername",

        "githubRepo",
    ]);

    if (data.githubToken) {
        document.getElementById("token").value = data.githubToken;
    }

    if (data.githubUsername) {
        document.getElementById("username").value = data.githubUsername;
    }

    if (data.githubRepo) {
        document.getElementById("repo").value = data.githubRepo;
    }
})();
