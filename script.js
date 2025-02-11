const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const images = [];
const imageCount = 5;

for (let i = 1; i <= imageCount; i++) {
    let img = new Image();
    img.src = `https://source.unsplash.com/1920x1080/?spartan,warrior,helmet,fitness,training,${i}`;
    images.push(img);
}

let frame = 0;

function drawBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let index = frame % images.length;
    ctx.drawImage(images[index], 0, 0, canvas.width, canvas.height);
}

function animateBackground() {
    frame++;
    drawBackground();
    setTimeout(animateBackground, 5000); // Ändrar bilden var 5:e sekund
}

setTimeout(animateBackground, 1000);

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// API-NYCKEL OCH ENDPOINT FRÅN AZURE OPENAI
const apiKey = "";  // <-- Ersätt med din API-nyckel
const endpoint = "";  // <-- Ersätt med din API-endpoint

// Chatbot funktion för att skicka meddelande till OpenAI
async function sendMessageToOpenAI(message) {
    document.getElementById("chatbot-messages").innerHTML += `<div><b>Du:</b> ${message}</div>`;

    const response = await fetch(`${endpoint}/openai/deployments/text-davinci-003/completions?api-version=2023-06-01-preview`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "api-key": apiKey
        },
        body: JSON.stringify({
            prompt: message,
            max_tokens: 150,
            temperature: 0.7
        })
    });

    const data = await response.json();
    const botReply = data.choices[0].text.trim();

    document.getElementById("chatbot-messages").innerHTML += `<div><b>AI:</b> ${botReply}</div>`;
}

// Skicka meddelande när användaren trycker på knappen
document.getElementById("chatbot-send").addEventListener("click", () => {
    const message = document.getElementById("chatbot-input").value;
    if (message.trim() !== "") {
        sendMessageToOpenAI(message);
        document.getElementById("chatbot-input").value = "";
    }
});

// Skicka meddelande när Enter trycks
document.getElementById("chatbot-input").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        document.getElementById("chatbot-send").click();
    }
});

