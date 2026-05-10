window.addEventListener("message", async (event) => {
    if (event.data.type === "GET_CODE") {
        let code = "";

        try {
            // Wait for Monaco to initialize
            let attempts = 0;

            while (
                (!window.monaco ||
                    !monaco.editor ||
                    monaco.editor.getModels().length === 0) &&
                attempts < 20
            ) {
                await new Promise((resolve) => setTimeout(resolve, 500));

                attempts++;
            }

            code = monaco.editor.getModels()[0].getValue();
        } catch (error) {
            code = "CODE_EXTRACTION_FAILED";
        }

        window.postMessage({
            type: "CODE_RESPONSE",
            code: code,
        });
    }
});
