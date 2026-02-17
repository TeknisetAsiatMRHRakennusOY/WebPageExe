(() => {
  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("[data-nav]");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setHeaderState() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  function toggleNav() {
    if (!nav || !navToggle) return;
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  }

  function scrollSection(target, smooth = true) {
    const rect = target.getBoundingClientRect();
    const absoluteTop = window.scrollY + rect.top;
    const headerOffset = header ? header.offsetHeight : 0;
    const shouldCenter = target.id === "about" || target.id === "contact";
    const targetY = shouldCenter
      ? absoluteTop - (window.innerHeight / 2) + (rect.height / 2)
      : absoluteTop - headerOffset;
    const maxY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const finalY = Math.max(0, Math.min(targetY, maxY));

    window.scrollTo({
      top: finalY,
      behavior: smooth && !prefersReducedMotion ? "smooth" : "auto"
    });
  }

  if (navToggle) {
    navToggle.addEventListener("click", toggleNav);
  }

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 1023px)").matches) {
        closeNav();
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      scrollSection(target, true);
      history.replaceState(null, "", href);
    });
  });

  if (window.location.hash) {
    const initialTarget = document.querySelector(window.location.hash);
    if (initialTarget) {
      requestAnimationFrame(() => scrollSection(initialTarget, false));
    }
  }

  window.addEventListener("scroll", setHeaderState, { passive: true });
  setHeaderState();

  const sections = Array.from(document.querySelectorAll("main section[id]"));
  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const id = `#${entry.target.id}`;
          navLinks.forEach(link => {
            link.classList.toggle("is-active", link.getAttribute("href") === id);
          });
        });
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: 0.01 }
    );

    sections.forEach(section => observer.observe(section));
  }

  const cards = Array.from(document.querySelectorAll("[data-service-card]"));

  function setExpanded(card, expanded) {
    const button = card.querySelector(".service-toggle");
    const content = card.querySelector(".service-content");
    const label = button?.querySelector("[data-toggle-label]");

    if (!button || !content || !label) return;

    button.setAttribute("aria-expanded", String(expanded));
    content.setAttribute("aria-hidden", String(!expanded));
    card.classList.toggle("is-open", expanded);

    label.textContent = expanded ? button.dataset.readLess : button.dataset.readMore;
    content.style.maxHeight = expanded ? `${content.scrollHeight}px` : "0px";
  }

  cards.forEach(card => {
    const button = card.querySelector(".service-toggle");
    if (!button) return;

    setExpanded(card, false);

    button.addEventListener("click", () => {
      const isOpen = button.getAttribute("aria-expanded") === "true";

      cards.forEach(otherCard => {
        if (otherCard !== card) setExpanded(otherCard, false);
      });

      setExpanded(card, !isOpen);
    });
  });

  window.addEventListener("resize", () => {
    cards.forEach(card => {
      const button = card.querySelector(".service-toggle");
      const content = card.querySelector(".service-content");
      if (!button || !content) return;

      if (button.getAttribute("aria-expanded") === "true") {
        content.style.maxHeight = `${content.scrollHeight}px`;
      }
    });
  });

  const yearNodes = document.querySelectorAll("[data-year]");
  if (yearNodes.length) {
    const year = new Date().getFullYear();
    yearNodes.forEach(node => {
      node.textContent = String(year);
    });
  }
})();
