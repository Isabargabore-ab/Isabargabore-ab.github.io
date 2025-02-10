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
