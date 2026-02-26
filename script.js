
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Responsive resize
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Particle setup
const particles = [];
const total = 29;
const gap = 0.5;
let base = 0;

// Create particles
for (let i = 0; i < total; i++) {
    particles.push({
        offset: i * gap
    });
}

function draw() {
    // CSS background  
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    particles.forEach((p, index) => {
        let angle = base - p.offset;

        let x = 16 * Math.pow(Math.sin(angle), 3);
        let y =
            13 * Math.cos(angle) -
            5 * Math.cos(2 * angle) -
            2 * Math.cos(3 * angle) -
            Math.cos(4 * angle);

        let px = cx + x * 12;
        let py = cy - y * 12;

        ctx.beginPath();

        let size = 6 - index * 0.12;
        ctx.arc(px, py, size, 0, Math.PI * 2);

        let hue = (base * 70 + index * 18) % 360;

        ctx.fillStyle = `hsl(${hue}, 100%, 60%)`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = `hsl(${hue}, 100%, 50%)`;

        ctx.fill();
    });

    // Center Text
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `bold ${Math.min(canvas.width * 0.06, 40)}px Arial`;
    ctx.fillStyle = "white";
    ctx.shadowBlur = 25;
    ctx.shadowColor = "pink";
    ctx.fillText("Sk Kamaluddin", cx, cy);
    ctx.restore();

    base += 0.005; // Speed control 
    requestAnimationFrame(draw);
}

draw();