// -----------------------------------
// Extract Problem Title
// -----------------------------------

function extractTitle() {
    return document.title.replace(" - LeetCode", "");
}

// -----------------------------------
// Extract Problem URL
// -----------------------------------

function extractProblemUrl() {
    return (
        window.location.origin +
        window.location.pathname.split("/submissions")[0]
    );
}

// -----------------------------------
// Extract Question
// -----------------------------------

function extractQuestion() {
    try {
        const description = document.querySelector(
            '[data-track-load="description_content"]',
        );

        if (!description) {
            return "";
        }

        return description.innerText.trim();
    } catch (error) {
        console.log("Question extraction failed");

        return "";
    }
}

// -----------------------------------
// Extract Difficulty
// -----------------------------------

function extractDifficulty() {
    try {
        const difficultyCandidates = document.querySelectorAll("div");

        for (const element of difficultyCandidates) {
            const text = element.innerText?.trim();

            if (text === "Easy" || text === "Medium" || text === "Hard") {
                return text;
            }
        }

        return "Unknown";
    } catch (error) {
        console.log("Difficulty extraction failed");

        return "Unknown";
    }
}

// -----------------------------------
// Extract Topics
// -----------------------------------

function extractTopics() {
    try {
        const topicSet = new Set();

        const topicContainers = document.querySelectorAll('a[href*="/tag/"]');

        for (const topic of topicContainers) {
            const text = topic.innerText.trim();

            if (!text) {
                continue;
            }

            if (text.length > 30) {
                continue;
            }

            topicSet.add(text);
        }

        return Array.from(topicSet);
    } catch (error) {
        console.log("Topics extraction failed");

        return [];
    }
}

// -----------------------------------
// Extract Language
// -----------------------------------

function extractLanguage() {
    try {
        const buttons = document.querySelectorAll("button");

        for (const button of buttons) {
            const text = button.innerText.trim().toLowerCase();

            if (SUPPORTED_LANGUAGES.includes(text)) {
                return text;
            }
        }

        return "txt";
    } catch (error) {
        console.log("Language extraction failed");

        return "txt";
    }
}

// -----------------------------------
// Extract LeetCode Username
// -----------------------------------

// -----------------------------------
// Extract LeetCode Username
// -----------------------------------

function extractUsername() {
    try {
        // Method 1
        // Check global localStorage

        const localData = window.localStorage;

        for (const key in localData) {
            const value = localData.getItem(key);

            if (value && value.includes('"username"')) {
                try {
                    const parsed = JSON.parse(value);

                    if (parsed.username) {
                        return parsed.username;
                    }
                } catch {}
            }
        }

        // Method 2
        // Navbar profile links

        const profileLinks = document.querySelectorAll('a[href*="/u/"]');

        for (const link of profileLinks) {
            const href = link.getAttribute("href");

            if (href && href.includes("/u/")) {
                return href.split("/u/")[1].replace("/", "");
            }
        }

        return "";
    } catch (error) {
        console.log("Username extraction failed");

        return "";
    }
}
