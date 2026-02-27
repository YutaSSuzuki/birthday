// ==========================
// ここだけ編集すればOK
// ==========================

const ITINERARY_URL = "https://tabikanji.com/shiori/php/shiori.php?code=75f4d757a7";
const PASSPHRASE = "愛してる";
const SECRET_MESSAGE = "これからも彩也華と一緒に色々な場所へ行けることを心から楽しみにしてるよ！<br>今日明日は伊東を遊びまくって、二人で倒れるまで遊ぼうね！<br>26歳の誕生日おめでとう！<br>こころから愛してるよ！";

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
    output.innerHTML = SECRET_MESSAGE;
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
  if (!canvas) return;
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
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.2,
      gravity: 0.2,
      size: Math.random() * 8 + 4,
      color: ["#ffd36e", "#ff7aa2", "#7cf2ff", "#8effa1", "#ffffff"][Math.floor(Math.random() * 5)],
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
    p.rotation += p.rotationSpeed;
    p.alpha -= 0.005;

    ctx.save();
    ctx.globalAlpha = p.alpha;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
    ctx.restore();
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
