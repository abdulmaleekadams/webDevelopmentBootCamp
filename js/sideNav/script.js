// Link active
const linkColor = document.querySelectorAll('.navLink');

function colorLink() {
  linkColor.forEach((link) => {
    link.classList.remove('activeLink');
    this.classList.add('activeLink');
  });
}

linkColor.forEach((link) => {
  link.addEventListener('click', colorLink);
});

// Hide menu

const showMenu = (toggleId, navbarId) => {
  const toggle = document.getElementById(toggleId),
    navbar = document.getElementById(navbarId);

  if (toggle && navbar) {
    toggle.addEventListener('click', () => {
      // Show menu
      navbar.classList.toggle('showMenu');
      //   Rotate button
      toggle.classList.toggle('rotate');
    });
  }
};

showMenu('navToggle', 'nav');
