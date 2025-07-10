document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menu-btn');
  const navMenu = document.getElementById('nav-menu');

  // Toggle nav menu on hamburger click
  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevent menu from closing immediately
    navMenu.classList.toggle('open');
  });

  // Close menu when clicking on a nav link
  document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
    });
  });

  // Prevent nav click from closing it
  navMenu.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Close menu if clicked anywhere outside
  document.addEventListener('click', () => {
    navMenu.classList.remove('open');
  });

  // Stop other audios when one is played and reset current time
  document.addEventListener("play", function (e) {
    const audios = document.querySelectorAll("audio");
    audios.forEach(audio => {
      if (audio !== e.target) {
        audio.pause();
      }
    });
    e.target.currentTime = 0;
  }, true);

});



const audios = document.querySelectorAll("audio");
const nowPlayingBar = document.getElementById("nowPlayingBar");
const trackTitle = document.getElementById("track-title");
const trackArtist = document.getElementById("track-artist");
const progressBar = document.getElementById("progress-bar");
const nowPlayingImg = document.getElementById("nowPlayingImg");
const togglePlayBtn = document.getElementById("togglePlayBtn");

let currentAudio = null;
let progressRAF = null;

audios.forEach(audio => {
  audio.addEventListener("play", () => {
    // Pause other audios and reset
    audios.forEach(a => {
      if (a !== audio) {
        a.pause();
        a.currentTime = 0;
      }
    });

    currentAudio = audio;

    const card = audio.closest(".beat-card");
    trackTitle.textContent = card.querySelector("h3").textContent;
    trackArtist.textContent = "JP BEATS";
    nowPlayingImg.src = card.querySelector("img").src;

    nowPlayingBar.style.display = "flex";
    togglePlayBtn.textContent = "❚❚";

    cancelAnimationFrame(progressRAF);
    progressRAF = requestAnimationFrame(updateProgress);
  });

  audio.addEventListener("pause", () => {
    if (audio === currentAudio) {
      togglePlayBtn.textContent = "▶";
      cancelAnimationFrame(progressRAF);
    }
  });

  audio.addEventListener("ended", () => {
    if (audio === currentAudio) {
      nowPlayingBar.style.display = "none";
      togglePlayBtn.textContent = "▶";
      progressBar.value = 0;
      currentAudio = null;
      cancelAnimationFrame(progressRAF);
    }
  });

  audio.addEventListener("timeupdate", () => {
    if (currentAudio && !currentAudio.paused) {
      const percent = (currentAudio.currentTime / currentAudio.duration) * 100;
      progressBar.value = percent || 0;
    }
  });
});


// Toggle play/pause button functionality
togglePlayBtn.addEventListener("click", () => {
  if (!currentAudio) return;

  if (currentAudio.paused) {
    currentAudio.play();
    togglePlayBtn.textContent = "❚❚";
    progressRAF = requestAnimationFrame(updateProgress);
  } else {
    currentAudio.pause();
    togglePlayBtn.textContent = "▶";
    cancelAnimationFrame(progressRAF);
  }
});


const elapsed = document.getElementById("elapsed");
const durationEl = document.getElementById("duration");

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

function updateProgress() {
  if (!currentAudio || currentAudio.paused || currentAudio.ended) return;

  const percent = (currentAudio.currentTime / currentAudio.duration) * 100;
  progressBar.value = percent || 0;

  elapsed.textContent = formatTime(currentAudio.currentTime);
  durationEl.textContent = formatTime(currentAudio.duration);

  progressRAF = requestAnimationFrame(updateProgress);
}
progressBar.addEventListener("input", (e) => {
  if (!currentAudio) return;
  const value = e.target.value;
  const newTime = (value / 100) * currentAudio.duration;
  currentAudio.currentTime = newTime;

  // Update elapsed time display
  elapsed.textContent = formatTime(currentAudio.currentTime);
});

const closeNowPlaying = document.getElementById("closeNowPlaying");

closeNowPlaying.addEventListener("click", () => {
  if (currentAudio) {
    currentAudio.pause();        // Pause audio
    currentAudio.currentTime = 0; // Reset audio
    currentAudio = null;
  }
  progressBar.value = 0;
  togglePlayBtn.textContent = "▶";
  nowPlayingBar.style.display = "none";
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && nowPlayingBar.style.display === "flex") {
    closeNowPlaying.click();
  }
});