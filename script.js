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

  // Stop other audios when one is played
  document.addEventListener("play", function(e) {
    const audios = document.querySelectorAll("audio");
    audios.forEach(audio => {
      if (audio !== e.target) {
        audio.pause();
      }
    });
  }, true);
});
