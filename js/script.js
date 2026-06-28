const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const icon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", () => {
  const isHidden = mobileMenu.classList.contains("hidden");

  if (isHidden) {
    mobileMenu.classList.remove("hidden");
    setTimeout(() => {
      mobileMenu.classList.remove("opacity-0", "translate-y-[-10px]");
      mobileMenu.classList.add("opacity-100", "translate-y-0");
    }, 10);
    icon.classList.replace("fa-bars", "fa-xmark");
  } else {
    mobileMenu.classList.remove("opacity-100", "translate-y-0");
    mobileMenu.classList.add("opacity-0", "translate-y-[-10px]");
    setTimeout(() => {
      mobileMenu.classList.add("hidden");
    }, 300);
    icon.classList.replace("fa-xmark", "fa-bars");
  }
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("opacity-0", "translate-y-[-10px]", "hidden");
    icon.classList.replace("fa-xmark", "fa-bars");
  });
});
