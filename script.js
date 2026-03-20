const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createFirework() {
  let x = Math.random() * canvas.width;
  let y = Math.random() * canvas.height / 2;

  for (let i = 0; i < 50; i++) {
    particles.push({
      x: x,
      y: y,
      dx: (Math.random() - 0.5) * 5,
      dy: (Math.random() - 0.5) * 5,
      life: 100
    });
  }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, index) => {
    p.x += p.dx;
    p.y += p.dy;
    p.life--;

    ctx.fillStyle = "gold";
    ctx.fillRect(p.x, p.y, 2, 2);

    if (p.life <= 0) particles.splice(index, 1);
  });

  requestAnimationFrame(update);
}

setInterval(createFirework, 1500);
update();

const audio = document.getElementById("bgMusic");

// ===== AUTO PLAY FIX (Android) =====
function startAudio() {
  audio.play().catch(() => {
    document.body.addEventListener("click", () => {
      audio.play();
    }, { once: true });
  });
}
startAudio();


// ===== EFEK GEMA (REVERB) =====
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const source = audioContext.createMediaElementSource(audio);

// delay (gema)
const delay = audioContext.createDelay();
delay.delayTime.value = 0.25;

// feedback (ulang gema)
const feedback = audioContext.createGain();
feedback.gain.value = 0.4;

// volume utama
const gain = audioContext.createGain();
gain.gain.value = 1;

// sambungkan node
source.connect(gain);
gain.connect(audioContext.destination);

source.connect(delay);
delay.connect(feedback);
feedback.connect(delay);
delay.connect(audioContext.destination);


// aktifkan audio context saat user klik (biar jalan di HP)
document.body.addEventListener("click", () => {
  audioContext.resume();
});
const titleText = "Selamat Hari Raya Idul Fitri 1447 H 🌙";
const messageText = `Di bawah cahaya bulan yang tenang,
gema takbir mengalun penuh kemenangan.
Hati yang sempat berjarak, kini didekatkan,
dalam maaf yang tulus dan keikhlasan.

Mohon Maaf Lahir dan Batin ✨`;

const fromText = "Dari: A. Izza M & keluarga";

// fungsi typing
function typeEffect(element, text, speed, delay = 0) {
  setTimeout(() => {
    let i = 0;
    function typing() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(typing, speed);
      }
    }
    typing();
  }, delay);
}

// jalankan animasi
typeEffect(document.getElementById("title"), titleText, 70);
typeEffect(document.getElementById("message"), messageText, 40, 2000);

// tampilkan nama setelah selesai
setTimeout(() => {
  const fromEl = document.getElementById("from");
  fromEl.innerText = fromText;
  fromEl.style.opacity = 1;
}, 8000);