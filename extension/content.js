let leetcodeApiAccepted = false;
console.log("SyncLeetX Loaded");
window.addEventListener("message", async (event) => {
    if (event.data.type === "LEETCODE_SUBMISSION_RESULT") {
        const data = event.data.payload;

        const accepted =
            data.status_msg === "Accepted" ||
            data.status_code === 10 ||
            data.state === "SUCCESS";

        if (accepted && !leetcodeApiAccepted) {
            leetcodeApiAccepted = true;

            syncing = true;

            setTimeout(() => {
                window.postMessage(
                    {
                        type: "GET_CODE",
                    },
                    "*",
                );
            }, 100);
        }
    }
});
let syncing = false;

window.addEventListener("message", async (event) => {
    if (event.data.type === "GFG_SUBMISSION_RESULT") {
        const data = event.data.payload;

        const accepted =
            data.status === "SUCCESS" &&
            data.sub_status === 1 &&
            data.view_mode === "correct";

        if (accepted && !syncing) {
            syncing = true;

            setTimeout(() => {
                window.postMessage(
                    {
                        type: "GET_CODE",
                    },
                    "*",
                );
            }, 100);
        }
    }
});
// -----------------------------------
// Inject Monaco extractor
// -----------------------------------

const script = document.createElement("script");

script.src = chrome.runtime.getURL("inject.js");

script.onload = () => script.remove();

(document.head || document.documentElement).appendChild(script);

// -----------------------------------
// Receive Monaco Code
// -----------------------------------

window.addEventListener("message", async (event) => {
    if (event.data.type !== "CODE_RESPONSE") return;

    try {
        const title = extractTitle();

        const code = event.data.code;

        if (!code) {
            console.log("No code extracted");

            syncing = false;

            return;
        }

        const syncKey = `${title}-${encodeURIComponent(code)}`;

        const lastSynced = await getLastSynced();

        if (lastSynced === syncKey) {
            console.log("Already synced");

            syncing = false;

            return;
        }
        let previousStats = {
            total: 0,
        };

        if (getPlatform() === "LeetCode") {
            previousStats = await getLeetCodeStats(extractUsername());
        }
        const success = await syncToGitHub({
            platform: getPlatform(),
            title,
            code,
            previousTotal: previousStats.total,
            language: extractLanguage(),
            username: extractUsername(),
            question: extractQuestion(),
            difficulty: extractDifficulty(),
            topics: await extractTopics(),
            problemUrl: extractProblemUrl(),
            gfgStats: await extractGFGStats(),
        });

        if (success) {
            await saveLastSynced(syncKey);
        }
    } catch (error) {
        console.log("Sync error:", error);
    } finally {
        syncing = false;
        leetcodeApiAccepted = false;
    }
});
