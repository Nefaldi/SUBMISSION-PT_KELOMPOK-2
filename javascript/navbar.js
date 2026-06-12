document.addEventListener("DOMContentLoaded", initNavbarMenu);

function initNavbarMenu() {
  const buttonMenu = document.querySelector(".button-menu");
  const menu = document.getElementById("navbarMenu");
  if (!buttonMenu || !menu) return;

  buttonMenu.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    buttonMenu.classList.toggle("is-open", isOpen);
    buttonMenu.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      buttonMenu.classList.remove("is-open");
      buttonMenu.setAttribute("aria-expanded", "false");
    });
  });
}
