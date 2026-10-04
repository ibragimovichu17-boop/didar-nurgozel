// AOS Animasiýany başlatmak
AOS.init({
  once: true,
  duration: 1000
});

// 1. TÄZE TOÝ SENESI: 25-NJI OKTÝABR 2026, SAĞAT 18:00
const weddingDate = new Date("2026-10-25T18:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance < 0) {
    document.getElementById("days").innerText = "00";
    document.getElementById("hours").innerText = "00";
    document.getElementById("minutes").innerText = "00";
    document.getElementById("seconds").innerText = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days < 10 ? "0" + days : days;
  document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
  document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
  document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// 2. AWTO-OÝNATGAYJY WE SAZ DOLANDYRYŞY
const audio = document.getElementById("wedding-audio");
const musicBtn = document.getElementById("music-btn");
const musicIcon = document.getElementById("music-icon");
const overlay = document.getElementById("envelope-overlay");

let isPlaying = false;

function playAudio() {
  audio.play().then(() => {
    isPlaying = true;
    musicIcon.className = "fas fa-pause text-lg";
  }).catch((err) => {
    console.log("Awtomatiki ses päsgelçiligi:", err);
  });
}

function pauseAudio() {
  audio.pause();
  isPlaying = false;
  musicIcon.className = "fas fa-music text-lg";
}

// Konwert tora basylanda sazy AWTOMATIKI ýagdaýda başlatmak
overlay.addEventListener("click", () => {
  overlay.classList.add("opened");
  playAudio();
});

// Saz düwmesine basylanda saklamak/dowam etdirmek
musicBtn.addEventListener("click", () => {
  if (isPlaying) {
    pauseAudio();
  } else {
    playAudio();
  }
});
