function getPlatform() {
    if (window.location.hostname.includes("leetcode")) {
        return "LeetCode";
    }

    if (window.location.hostname.includes("geeksforgeeks")) {
        return "GeeksForGeeks";
    }

    return "Unknown";
}

function extractTitle() {
    if (window.location.hostname.includes("leetcode")) {
        return document.title.replace(" - LeetCode", "").trim();
    }

    if (window.location.hostname.includes("geeksforgeeks")) {
        const title = document.querySelector(".problems_header_content h3");

        if (title) {
            return title.innerText.trim();
        }
    }

    return document.title.trim();
}

function extractProblemUrl() {
    return (
        window.location.origin +
        window.location.pathname.split("/submissions")[0]
    );
}

function extractQuestion() {
    try {
        // -----------------------------------
        // LeetCode
        // -----------------------------------

        if (window.location.hostname.includes("leetcode")) {
            const description = document.querySelector(
                '[data-track-load="description_content"]',
            );

            if (!description) {
                return "Problem statement not found.";
            }

            return description.innerText
                .replace(/\u00A0/g, " ")
                .replace(/\n{3,}/g, "\n\n")
                .trim()
                .slice(0, 5000);
        }

        // -----------------------------------
        // GeeksForGeeks
        // -----------------------------------

        if (window.location.hostname.includes("geeksforgeeks")) {
            const problem = document.querySelector(
                ".problems_problem_content__Xm_eO",
            );

            if (!problem) {
                return "Problem statement not found.";
            }

            return problem.innerText
                .replace(/\u00A0/g, " ")
                .replace(/\n{3,}/g, "\n\n")
                .trim()
                .slice(0, 5000);
        }

        return "Problem statement not available.";
    } catch (error) {
        console.log("Question extraction failed");

        return "Problem statement not available.";
    }
}

function extractDifficulty() {
    try {
        // -----------------------------------
        // LeetCode
        // -----------------------------------

        if (window.location.hostname.includes("leetcode")) {
            const difficultyElement = document.querySelector(
                '[class*="text-difficulty-easy"], [class*="text-difficulty-medium"], [class*="text-difficulty-hard"]',
            );

            if (difficultyElement) {
                const text = difficultyElement.innerText.trim();

                if (text === "Easy" || text === "Medium" || text === "Hard") {
                    return text;
                }
            }
        }

        // -----------------------------------
        // GeeksForGeeks
        // -----------------------------------

        if (window.location.hostname.includes("geeksforgeeks")) {
            const bodyText = document.body.innerText;

            if (bodyText.includes("Difficulty: School")) {
                return "School";
            }

            if (bodyText.includes("Difficulty: Basic")) {
                return "Basic";
            }

            if (bodyText.includes("Difficulty: Easy")) {
                return "Easy";
            }

            if (bodyText.includes("Difficulty: Medium")) {
                return "Medium";
            }

            if (bodyText.includes("Difficulty: Hard")) {
                return "Hard";
            }
        }

        // -----------------------------------
        // Safe fallback
        // -----------------------------------

        return "Medium";
    } catch {
        return "Medium";
    }
}

// -----------------------------------
// Extract Topics
// -----------------------------------

async function extractTopics() {
    try {
        const topicSet = new Set();

        // -----------------------------------
        // LeetCode
        // -----------------------------------

        if (window.location.hostname.includes("leetcode")) {
            const topicContainers =
                document.querySelectorAll('a[href*="/tag/"]');

            for (const topic of topicContainers) {
                const text = topic.innerText.trim();

                if (text && text.length < 30) {
                    topicSet.add(text);
                }
            }
        }

        // -----------------------------------
        // GeeksForGeeks
        // -----------------------------------

        if (window.location.hostname.includes("geeksforgeeks")) {
            // Open Topic Tags dropdown

            const dropdown = document.querySelector(
                ".problems_tag_dropdown__x6C2I",
            );

            if (dropdown) {
                dropdown.click();

                await new Promise((resolve) => setTimeout(resolve, 1000));
            }

            // Find Topic Tags accordion

            const accordions = document.querySelectorAll(
                ".problems_accordion_tags__JJ2DX",
            );

            for (const accordion of accordions) {
                const heading = accordion.innerText || "";

                // ONLY Topic Tags section

                if (heading.includes("Topic Tags")) {
                    const tags = accordion.querySelectorAll(
                        "a.ui.label.problems_tag_label__A4Ism",
                    );

                    for (const tag of tags) {
                        const text = tag.innerText?.trim();

                        if (text && text.length < 25) {
                            topicSet.add(text);
                        }
                    }
                }
            }
        }

        return Array.from(topicSet);
    } catch (error) {
        console.log("Topics extraction failed");

        return [];
    }
}

function extractLanguage() {
    try {
        // -----------------------------------
        // LeetCode
        // -----------------------------------

        if (window.location.hostname.includes("leetcode")) {
            const buttons = document.querySelectorAll("button");

            for (const button of buttons) {
                const text = button.innerText.trim().toLowerCase();

                if (SUPPORTED_LANGUAGES.includes(text)) {
                    return text;
                }
            }
        }

        // -----------------------------------
        // GeeksForGeeks
        // -----------------------------------

        if (window.location.hostname.includes("geeksforgeeks")) {
            const bodyText = document.body.innerText.toLowerCase();

            if (bodyText.includes("java")) {
                return "java";
            }

            if (bodyText.includes("python")) {
                return "py";
            }

            if (bodyText.includes("c++")) {
                return "cpp";
            }

            if (bodyText.includes("c#")) {
                return "cs";
            }

            if (bodyText.includes("javascript")) {
                return "js";
            }
        }

        return "txt";
    } catch (error) {
        console.log("Language extraction failed");

        return "txt";
    }
}

function extractUsername() {
    // -----------------------------------
    // GeeksForGeeks
    // -----------------------------------

    if (window.location.hostname.includes("geeksforgeeks")) {
        try {
            const loginData = JSON.parse(localStorage.getItem("loginData"));

            return loginData?.handle || "";
        } catch {
            return "";
        }
    }

    // -----------------------------------
    // LeetCode
    // -----------------------------------

    try {
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

async function extractGFGStats() {
    try {
        const d = JSON.parse(localStorage.getItem("loginData"));

        const res = await fetch(
            "https://practiceapi.geeksforgeeks.org/api/v1/user/problems/submissions/",
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": d.csrf_token,
                },
                body: JSON.stringify({ handle: d.handle }),
            },
        );

        const data = await res.json();
        const result = data?.result || {};

        const easy = Object.keys(result.Easy || {}).length;
        const medium = Object.keys(result.Medium || {}).length;
        const hard = Object.keys(result.Hard || {}).length;
        const basic = Object.keys(result.Basic || {}).length;
        const school = Object.keys(result.School || {}).length;
        const total = school + basic + easy + medium + hard;

        return { easy, medium, hard, basic, total };
    } catch {
        return { easy: 0, medium: 0, hard: 0, basic: 0, total: 0 };
    }
}
