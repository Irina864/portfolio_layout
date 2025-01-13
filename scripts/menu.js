const openMenu = document.querySelector('.menu-burger');
const crossMenu = document.querySelector('.cross');
const closeMenu = document.querySelector('.close');
const menuSection = document.querySelector('.overlay');
const navLinks = document.querySelectorAll('.nav__link');
const navSocials = document.querySelectorAll('.nav-social-icons__link');

openMenu.addEventListener('click', toggleMenu);
crossMenu.addEventListener('click', toggleMenu);
closeMenu.addEventListener('click', toggleMenu);

function toggleMenu(e) {
  e.preventDefault();
  menuSection.classList.toggle('overlay_active');
}

navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    menuSection.classList.remove('overlay_active');
    setTimeout(() => {
      window.location.href = link.href;
    }, 300);
  });
});

navSocials.forEach((social) => {
  social.addEventListener('click', (e) => {
    menuSection.classList.remove('overlay_active');
  });
});
