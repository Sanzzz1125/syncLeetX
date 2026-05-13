window.addEventListener("message", async (event) => {
    if (event.data.type !== "GET_CODE") {
        return;
    }

    let code = "";

    try {
        // -----------------------------------
        // Monaco (LeetCode)
        // -----------------------------------

        if (
            window.monaco &&
            monaco.editor &&
            monaco.editor.getModels().length
        ) {
            code = monaco.editor.getModels()[0].getValue();
        }

        // -----------------------------------
        // Ace Editor (GFG)
        // -----------------------------------

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

        // -----------------------------------
        // Textarea fallback
        // -----------------------------------

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
