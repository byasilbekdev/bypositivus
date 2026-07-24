"use strict";

document.addEventListener("DOMContentLoaded", () => {
  initFooterYear();
  initMobileNav();
  initScrollButtons();
  initAccordion();
  initTestimonialCarousel();
  initContactForm();
});

function initFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

function initMobileNav() {
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.getElementById("primary-nav");

  if (!menuBtn || !nav) return;

  menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("active");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("active");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    const isClickInside = nav.contains(event.target) || menuBtn.contains(event.target);
    if (!isClickInside && nav.classList.contains("active")) {
      nav.classList.remove("active");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("active")) {
      nav.classList.remove("active");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.focus();
    }
  });
}

function initScrollButtons() {
  document.querySelectorAll("[data-scroll-to]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-scroll-to");
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

function initAccordion() {
  const items = document.querySelectorAll(".process-item");
  if (!items.length) return;

  items.forEach((item) => {
    const header = item.querySelector(".process-item__header");
    const icon = item.querySelector(".process-item__icon img");

    header.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      items.forEach((other) => {
        other.classList.remove("is-open");
        other.querySelector(".process-item__header").setAttribute("aria-expanded", "false");
        const otherIcon = other.querySelector(".process-item__icon img");
        otherIcon.src = "./assets/icons/plus.svg";
      });

      if (!isOpen) {
        item.classList.add("is-open");
        header.setAttribute("aria-expanded", "true");
        icon.src = "./assets/icons/minus.svg";
      }
    });
  });
}

function initTestimonialCarousel() {
  const track = document.getElementById("testimonialTrack");
  const dotsContainer = document.getElementById("testimonialDots");
  const prevBtn = document.getElementById("testimonialPrev");
  const nextBtn = document.getElementById("testimonialNext");

  if (!track || !dotsContainer || !prevBtn || !nextBtn) return;

  const slides = Array.from(track.children);
  let currentIndex = 0;

  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", `Go to testimonial ${index + 1}`);
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.children);

  function getSlideWidth() {
    const slide = slides[0];
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.columnGap || style.gap || "0");
    return slide.getBoundingClientRect().width + gap;
  }

  function goToSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    const offset = getSlideWidth() * currentIndex;
    track.style.transform = `translateX(-${offset}px)`;
    updateDots();
  }

  function updateDots() {
    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === currentIndex);
    });
  }

  prevBtn.addEventListener("click", () => goToSlide(currentIndex - 1));
  nextBtn.addEventListener("click", () => goToSlide(currentIndex + 1));

  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => goToSlide(currentIndex), 150);
  });

  let touchStartX = 0;
  track.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
    },
    { passive: true }
  );

  track.addEventListener(
    "touchend",
    (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const delta = touchStartX - touchEndX;
      const SWIPE_THRESHOLD = 40;

      if (delta > SWIPE_THRESHOLD) goToSlide(currentIndex + 1);
      if (delta < -SWIPE_THRESHOLD) goToSlide(currentIndex - 1);
    },
    { passive: true }
  );

  goToSlide(0);
}

function initContactForm() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Message sent!";
    submitBtn.disabled = true;

    setTimeout(() => {
      form.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 2500);
  });
}