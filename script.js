// script.js

document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menu-btn');
  const navMenu = document.getElementById('nav-menu');

  menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
});

//Close menu when a nav link is clicked (for mobile)
document.querySelectorAll('#nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
  });
});

// Stop other audios when one is played
document.addEventListener("play", function(e) {
  const audios = document.querySelectorAll("audio");
  audios.forEach(audio => {
    if (audio !== e.target) {
      audio.pause();
    }
  });
}, true);
