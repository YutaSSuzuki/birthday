// ==========================
// ここだけ編集すればOK
// ==========================

const ITINERARY_URL = "https://tabikanji.com/shiori/php/shiori.php?code=75f4d757a7";
const PASSPHRASE = "愛してる";

// ==========================
// 以下は触らなくていい
// ==========================

// 旅のしおりリンク設定
const link = document.getElementById("itineraryLink");
if (link) {
  link.href = ITINERARY_URL;
}

// 合言葉表示制御
const secret = document.getElementById("secret");

document.getElementById("btnReveal")?.addEventListener("click", () => {
  secret?.classList.toggle("reveal");
});

document.getElementById("btnUnlock")?.addEventListener("click", () => {
  const input = document.getElementById("pass");
  const output = document.getElementById("lockedMsg");

  if (!input || !output) return;

  const value = input.value.trim();

  if (value === PASSPHRASE) {
    output.style.color = "white";
    output.textContent = SECRET_MESSAGE;
    launchConfetti();
  } else {
    output.style.color = "salmon";
    output.textContent = "合言葉が違うみたい。ヒントはふたりだけの記憶。";
  }
});


// ==========================
// 🎉 紙吹雪アニメーション
// ==========================

const canvas = document.getElementById("confetti");
let ctx = null;
let particles = [];
let animationId = null;

if (canvas) {
  ctx = canvas.getContext("2d");
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function launchConfetti() {
  if (!ctx) return;

  particles = [];

  for (let i = 0; i < 200; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 3,
      vx: (Math.random() - 0.5) * 8,
      vy: Math.random() * -8,
      gravity: 0.2,
      size: Math.random() * 4 + 2,
      alpha: 1
    });
  }

  if (animationId) cancelAnimationFrame(animationId);
  animate();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.vy += p.gravity;
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 0.005;

    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = "white";
    ctx.fillRect(p.x, p.y, p.size, p.size);
  });

  particles = particles.filter(p => p.alpha > 0);

  if (particles.length > 0) {
    animationId = requestAnimationFrame(animate);
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

// 🎉 ボタンで発動
document.getElementById("btnConfetti")?.addEventListener("click", launchConfetti);