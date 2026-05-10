// -----------------------------------
// Save Last Synced Problem
// -----------------------------------

async function saveLastSynced(syncKey) {
    return new Promise((resolve) => {
        chrome.storage.local.set(
            {
                lastSyncedProblem: syncKey,
            },
            resolve,
        );
    });
}

// -----------------------------------
// Get Last Synced Problem
// -----------------------------------

async function getLastSynced() {
    return new Promise((resolve) => {
        chrome.storage.local.get(
            "lastSyncedProblem",

            (data) => {
                resolve(data.lastSyncedProblem);
            },
        );
    });
}
