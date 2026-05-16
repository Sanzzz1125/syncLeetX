const originalFetch = window.fetch;

window.fetch = async (...args) => {
    const response = await originalFetch(...args);

    try {
        const request = args[0];

        const url = typeof request === "string" ? request : request?.url || "";

        if (url.includes("/v2/check/")) {
            const clone = response.clone();

            const data = await clone.json();

            window.postMessage(
                {
                    type: "LEETCODE_SUBMISSION_RESULT",
                    payload: data,
                },
                "*",
            );
        }

        if (url.includes("result/")) {
            const clone = response.clone();

            const data = await clone.json();

            window.postMessage(
                {
                    type: "GFG_SUBMISSION_RESULT",
                    payload: data,
                },
                "*",
            );
        }
    } catch (err) {}

    return response;
};

window.addEventListener("message", async (event) => {
    if (event.data.type !== "GET_CODE") {
        return;
    }

    let code = "";

    try {
        if (
            window.monaco &&
            monaco.editor &&
            monaco.editor.getModels().length
        ) {
            code = monaco.editor.getModels()[0].getValue();
        }

        if (!code && window.ace) {
            try {
                const editors = document.querySelectorAll(".ace_editor");

                for (const editorEl of editors) {
                    try {
                        const editor = ace.edit(editorEl);

                        const value = editor.getValue();

                        if (value && value.trim().length > 20) {
                            code = value;

                            break;
                        }
                    } catch {}
                }
            } catch {}
        }

        if (!code) {
            const textarea = document.querySelector("textarea");

            if (textarea) {
                code = textarea.value;
            }
        }

        if (!code) {
            code = "CODE_EXTRACTION_FAILED";
        }
    } catch (error) {
        console.log("Code extraction failed", error);

        code = "CODE_EXTRACTION_FAILED";
    }

    window.postMessage(
        {
            type: "CODE_RESPONSE",
            code,
        },
        "*",
    );
});
