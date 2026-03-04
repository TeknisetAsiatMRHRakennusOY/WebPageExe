(() => {
  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("[data-nav]");
  const burger = document.querySelector("[data-burger]");
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));

  function setHeaderState() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  function closeMenu() {
    if (!nav || !burger) return;
    nav.classList.remove("is-open");
    burger.classList.remove("is-active");
    burger.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }

  function toggleMenu() {
    if (!nav || !burger) return;
    const isOpen = nav.classList.toggle("is-open");
    burger.classList.toggle("is-active", isOpen);
    burger.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  }

  if (burger) {
    burger.addEventListener("click", toggleMenu);
  }

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 1023px)").matches) {
        closeMenu();
      }
    });
  });

/* ================= ACCORDION ================= */

const cards = Array.from(document.querySelectorAll("[data-service-card]"));

const allowMultipleOpen = true; // ← change to false if you want classic accordion

function setExpanded(card, expanded) {
  const button = card.querySelector(".service-toggle");
  const content = card.querySelector(".service-content");
  const inner = card.querySelector(".service-content-inner");

  if (!button || !content || !inner) return;

  button.setAttribute("aria-expanded", String(expanded));
  content.setAttribute("aria-hidden", String(!expanded));
  card.classList.toggle("is-open", expanded);

  if (expanded) {
    content.style.maxHeight = `${inner.scrollHeight + 32}px`;
  } else {
    content.style.maxHeight = "0px";
  }
}

cards.forEach(card => {
  const button = card.querySelector(".service-toggle");
  if (!button) return;

  setExpanded(card, false);

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";

    if (!allowMultipleOpen) {
      cards.forEach(other => {
        if (other !== card) setExpanded(other, false);
      });
    }

    setExpanded(card, !isOpen);
  });
});

/* Resize recalculation for smooth animation */
window.addEventListener("resize", () => {
  cards.forEach(card => {
    if (card.classList.contains("is-open")) {
      const content = card.querySelector(".service-content");
      const inner = card.querySelector(".service-content-inner");
      if (content && inner) {
        content.style.maxHeight = `${inner.scrollHeight + 32}px`;
      }
    }
  });
});

/* ================= PROJECT SLIDERS ================= */

const sliders = Array.from(document.querySelectorAll("[data-slider]"));

sliders.forEach(slider => {
  const track = slider.querySelector(".project-track");
  if (!track) return;

  const slides = Array.from(track.querySelectorAll("img"));
  const prev = slider.querySelector(".project-nav.prev");
  const next = slider.querySelector(".project-nav.next");
  const dots = Array.from(slider.querySelectorAll(".project-dot"));

  if (!slides.length) return;

  let index = 0;
  const total = slides.length;

  function render() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === index;
      dot.classList.toggle("is-active", active);
      dot.setAttribute("aria-current", active ? "true" : "false");
    });
  }

  function goTo(nextIndex) {
    index = (nextIndex + total) % total;
    render();
  }

  if (prev) {
    prev.addEventListener("click", () => goTo(index - 1));
  }

  if (next) {
    next.addEventListener("click", () => goTo(index + 1));
  }

  dots.forEach((dot, dotIndex) => {
    dot.addEventListener("click", () => goTo(dotIndex));
  });

  // Prevent persistent focus-within hover state after mouse/touch clicks.
  [prev, next, ...dots].forEach(control => {
    if (!control) return;
    control.addEventListener("pointerup", event => {
      if (event.pointerType === "mouse" || event.pointerType === "touch" || event.pointerType === "pen") {
        control.blur();
      }
    });
  });

  render();
});


  const yearNodes = document.querySelectorAll("[data-year]");
  if (yearNodes.length) {
    const year = new Date().getFullYear();
    yearNodes.forEach(node => {
      node.textContent = String(year);
    });
  }
})();
