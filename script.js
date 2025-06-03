
async function sendToChatGPT() {
    const userInput = document.getElementById("userInput").value;
    const responseArea = document.getElementById("responseArea");

    const apiKey = prompt("Enter your OpenAI API key:");

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
    };

    const body = JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userInput }]
    });

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: headers,
            body: body
        });

        const data = await response.json();
        responseArea.textContent = data.choices[0].message.content;
    } catch (error) {
        responseArea.textContent = "Error: " + error.message;
    }
}
