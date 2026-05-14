// -----------------------------------
// Save Last Synced
// -----------------------------------

async function saveLastSynced(syncKey) {
    return new Promise((resolve) => {
        if (!chrome || !chrome.storage || !chrome.storage.local) {
            console.log("Chrome storage unavailable");

            resolve();

            return;
        }

        chrome.storage.local.set(
            {
                lastSynced: syncKey,
            },
            () => resolve(),
        );
    });
}

// -----------------------------------
// Get Last Synced
// -----------------------------------

async function getLastSynced() {
    return new Promise((resolve) => {
        if (!chrome || !chrome.storage || !chrome.storage.local) {
            console.log("Chrome storage unavailable");

            resolve(null);

            return;
        }

        chrome.storage.local.get(["lastSynced"], (result) => {
            resolve(result.lastSynced || null);
        });
    });
}
