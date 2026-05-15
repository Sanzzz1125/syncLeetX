async function waitForStorage(retries = 10) {
    for (let i = 0; i < retries; i++) {
        if (
            typeof chrome !== "undefined" &&
            chrome.storage &&
            chrome.storage.local
        ) {
            return chrome.storage.local;
        }

        await new Promise((resolve) => setTimeout(resolve, 300));
    }

    return null;
}

// -----------------------------------
// Save Last Synced
// -----------------------------------

async function saveLastSynced(syncKey) {
    const storage = await waitForStorage();

    if (!storage) {
        console.log("Chrome storage unavailable");

        return;
    }

    return new Promise((resolve) => {
        storage.set(
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
    const storage = await waitForStorage();

    if (!storage) {
        console.log("Chrome storage unavailable");

        return null;
    }

    return new Promise((resolve) => {
        storage.get(["lastSynced"], (result) => {
            resolve(result.lastSynced || null);
        });
    });
}
