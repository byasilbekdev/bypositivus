const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const icon = menuBtn.querySelector("i");

let menuTimeout;

function toggleMenu(show) {
  clearTimeout(menuTimeout);

  if (show) {
    mobileMenu.classList.remove("hidden");

    menuTimeout = setTimeout(() => {
      mobileMenu.classList.remove("opacity-0", "translate-y-[-10px]");
      mobileMenu.classList.add("opacity-100", "translate-y-0");
    }, 10);

    icon.classList.replace("fa-bars", "fa-xmark");
  } else {
    mobileMenu.classList.remove("opacity-100", "translate-y-0");
    mobileMenu.classList.add("opacity-0", "translate-y-[-10px]");

    menuTimeout = setTimeout(() => {
      mobileMenu.classList.add("hidden");
    }, 300);

    icon.classList.replace("fa-xmark", "fa-bars");
  }
}

menuBtn.addEventListener("click", () => {
  const isHidden = mobileMenu.classList.contains("hidden");
  toggleMenu(isHidden);
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    toggleMenu(false);
  });
});
