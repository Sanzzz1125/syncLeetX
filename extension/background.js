chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "GET_LEETCODE_SESSION") {
        chrome.cookies.get(
            {
                url: "https://leetcode.com",
                name: "LEETCODE_SESSION",
            },

            (cookie) => {
                sendResponse({
                    session: cookie?.value || "",
                });
            },
        );

        return true;
    }
});
