console.log("SyncLeetX Loaded");

let syncing = false;

// -----------------------------------
// Inject Monaco extractor
// -----------------------------------

const script = document.createElement("script");

script.src = chrome.runtime.getURL("inject.js");

script.onload = () => script.remove();

(document.head || document.documentElement).appendChild(script);

// -----------------------------------
// Detect Submit Button Click
// -----------------------------------

document.addEventListener("click", async (e) => {
    const button = e.target.closest("button");

    if (!button) return;

    const text = button.innerText?.trim();

    if (text === "Submit" && !syncing) {
        console.log("Submit clicked");

        syncing = true;

        waitForAccepted();
    }
});

// -----------------------------------
// Wait For Accepted Result
// -----------------------------------

function waitForAccepted() {
    let attempts = 0;

    const interval = setInterval(() => {
        attempts++;

        // -----------------------------------
        // Modern LeetCode Accepted Detection
        // -----------------------------------

        const bodyText = document.body.innerText;

        const accepted =
            bodyText.includes("Accepted") && bodyText.includes("Runtime");

        if (accepted) {
            clearInterval(interval);

            console.log("Accepted detected");

            // ask inject.js for code

            window.postMessage(
                {
                    type: "GET_CODE",
                },

                "*",
            );

            return;
        }

        // stop after 60 sec

        if (attempts > 120) {
            clearInterval(interval);

            syncing = false;

            console.log("Timed out waiting for Accepted");
        }
    }, 500);
}

// -----------------------------------
// Receive Monaco Code
// -----------------------------------

window.addEventListener("message", async (event) => {
    if (event.data.type !== "CODE_RESPONSE") return;

    try {
        console.log("Code received");

        const title = extractTitle();

        const code = event.data.code;

        if (!code) {
            console.log("No code extracted");

            syncing = false;

            return;
        }

        const syncKey = `${title}-${btoa(code)}`;

        const lastSynced = await getLastSynced();

        if (lastSynced === syncKey) {
            console.log("Already synced");

            syncing = false;

            return;
        }

        console.log("Starting GitHub sync...");

        const success = await syncToGitHub({
            title,

            code,

            language: extractLanguage(),

            username: extractUsername(),

            question: extractQuestion(),

            difficulty: extractDifficulty(),

            topics: extractTopics(),

            problemUrl: extractProblemUrl(),
        });

        if (success) {
            await saveLastSynced(syncKey);
        }

        console.log("Sync completed");
    } catch (error) {
        console.log("Sync error:", error);
    } finally {
        syncing = false;
    }
});
