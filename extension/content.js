console.log("SyncLeetX Loaded");
let syncing = false;
let observer = null;
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

    const text = button.innerText?.trim().toLowerCase();

    const isLeetCodeSubmit = text === "submit";

    const isGFGSubmit = text.includes("submit");

    if ((isLeetCodeSubmit || isGFGSubmit) && !syncing) {
        syncing = true;

        waitForAccepted();
    }
});

// -----------------------------------
// Wait For Accepted Result
// -----------------------------------

function waitForAccepted() {
    let synced = false;

    if (observer) {
        observer.disconnect();
    }

    observer = new MutationObserver(() => {
        if (synced) return;

        const bodyText = document.body.innerText;

        // -----------------------------------
        // LeetCode Detection
        // -----------------------------------

        const resultElement = document.querySelector(
            '[data-e2e-locator="submission-result"]',
        );

        const leetcodeAccepted =
            resultElement && resultElement.innerText.includes("Accepted");

        // -----------------------------------
        // GeeksForGeeks Detection
        // -----------------------------------

        const gfgAccepted =
            bodyText.includes("Problem Solved Successfully") ||
            bodyText.includes("Correct Answer");

        // -----------------------------------
        // Final Check
        // -----------------------------------

        const accepted = leetcodeAccepted || gfgAccepted;

        if (accepted) {
            synced = true;

            observer.disconnect();

            observer = null;

            setTimeout(() => {
                window.postMessage(
                    {
                        type: "GET_CODE",
                    },
                    "*",
                );
            }, 1500);
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

    setTimeout(() => {
        if (!synced && observer) {
            observer.disconnect();

            observer = null;

            syncing = false;

            console.log("Timed out waiting for Accepted");
        }
    }, 60000);
}

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
    }
});
