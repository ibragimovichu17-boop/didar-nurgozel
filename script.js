// AOS Animasiýasyny başlatmak
AOS.init({ 
  once: false, 
  duration: 1000,
  easing: 'ease-out-cubic'
});

const overlay = document.getElementById('envelope-overlay');
const audio = document.getElementById("wedding-audio");
const musicIcon = document.getElementById("music-icon");
const musicBtn = document.getElementById("music-btn");

let isOpened = false;

// Aýdymy başlatmak funksiýasy
function startMusic() {
  audio.play().then(() => {
    musicIcon.classList.remove("fa-music");
    musicIcon.classList.add("fa-pause");
  }).catch(e => {
    console.log("Audio play error:", e);
  });
}

// Konwerte basylanda sahypany we aýdymy açmak
overlay.addEventListener('click', () => {
  if (isOpened) return;
  isOpened = true;

  startMusic();
  overlay.classList.add('opened');

  setTimeout(() => {
    AOS.refresh();
  }, 600);
});

// Saz düwmesi (Play / Pause)
musicBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  if (audio.paused) {
    isOpened = true;
    startMusic();
  } else {
    audio.pause();
    musicIcon.classList.remove("fa-pause");
    musicIcon.classList.add("fa-music");
  }
});

// Yza wagt sanaýjy (Countdown)
const weddingDate = new Date("October 17, 2026 18:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const difference = weddingDate - now;

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
  } else {
    document.getElementById("days").innerText = "00";
    document.getElementById("hours").innerText = "00";
    document.getElementById("minutes").innerText = "00";
    document.getElementById("seconds").innerText = "00";
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();
