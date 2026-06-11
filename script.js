/* =============================================================
   script.js – Portfolio interactions
   ============================================================= */

(function () {
  "use strict";

  /* ── Navbar scroll effect ──────────────────────────────────── */
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
    updateActiveNavLink();
  });

  /* ── Mobile nav toggle ─────────────────────────────────────── */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen);
  });

  // Close mobile nav on link click
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", false);
    });
  });

  /* ── Active nav link on scroll ─────────────────────────────── */
  const sections = document.querySelectorAll("section[id], footer[id]");

  function updateActiveNavLink() {
    let current = "";
    sections.forEach((sec) => {
      const top = sec.offsetTop - 80;
      if (window.scrollY >= top) current = sec.id;
    });

    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  /* ── Scroll reveal (data-aos) ──────────────────────────────── */
  const aosEls = document.querySelectorAll("[data-aos]");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  aosEls.forEach((el) => revealObserver.observe(el));

  /* ── Stagger reveal for grid children ─────────────────────── */
  const staggerParents = document.querySelectorAll(
    ".services-grid, .portfolio-grid, .skills-carousel",
  );

  staggerParents.forEach((parent) => {
    Array.from(parent.children).forEach((child, i) => {
      child.style.transitionDelay = `${i * 100}ms`;
    });
  });

  /* ── Skills carousel ───────────────────────────────────────── */
  const carousel = document.getElementById("skillsCarousel");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  function getScrollAmount() {
    const card = carousel.querySelector(".skill-card");
    if (!card) return 260;
    return card.offsetWidth + 20;
  }

  nextBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
  });

  prevBtn.addEventListener("click", () => {
    carousel.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
  });

  function updateCarouselBtns() {
    prevBtn.style.opacity = carousel.scrollLeft > 8 ? "1" : "0.35";
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    nextBtn.style.opacity = carousel.scrollLeft < maxScroll - 8 ? "1" : "0.35";
  }

  carousel.addEventListener("scroll", updateCarouselBtns, { passive: true });
  window.addEventListener("resize", updateCarouselBtns);
  updateCarouselBtns();

  /* ── Smooth scroll for anchor links ───────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  /* ── Portfolio card hover glow ─────────────────────────────── */
  document.querySelectorAll(".portfolio-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.boxShadow = "0 12px 40px rgba(201,168,76,0.30)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.boxShadow = "";
    });
  });

  /* ── Typing animation for hero greeting ───────────────────── */
  const greetingEl = document.querySelector(".hero-greeting");
  if (greetingEl) {
    const text = greetingEl.textContent;
    greetingEl.textContent = "";
    greetingEl.style.borderRight = "2px solid #C9A84C";

    let i = 0;
    function type() {
      if (i < text.length) {
        greetingEl.textContent += text.charAt(i);
        i++;
        setTimeout(type, 60);
      } else {
        setTimeout(() => {
          greetingEl.style.borderRight = "none";
        }, 1200);
      }
    }
    setTimeout(type, 400);
  }

  /* ── Service card tilt on mousemove ───────────────────────── */
  document.querySelectorAll(".service-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
})();

/* ── Modal foto service card ───────────────────────────────── */
function openModal(src) {
  document.getElementById("modalImg").src = src;
  document.getElementById("serviceModal").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("serviceModal").classList.remove("active");
  document.getElementById("modalImg").src = "";
  document.body.style.overflow = "";
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeModal();
});
