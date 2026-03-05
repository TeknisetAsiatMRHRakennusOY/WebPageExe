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
    slider.dataset.currentIndex = String(index);
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

/* ================= PROJECT GALLERY MODAL ================= */

const projectCards = Array.from(document.querySelectorAll(".project-card"));
const galleryItemsByCard = new Map();

projectCards.forEach(card => {
  const images = Array.from(card.querySelectorAll(".project-track img, img"));
  const uniqueImages = images.filter((img, i) => images.indexOf(img) === i);
  if (!uniqueImages.length) return;

  const sliderArea = card.querySelector(".project-slider");
  const fallbackImage = uniqueImages[0];
  const triggerArea = sliderArea || fallbackImage;

  if (!triggerArea) return;

  triggerArea.setAttribute("data-gallery-trigger", "true");
  galleryItemsByCard.set(card, {
    images: uniqueImages,
    triggerArea,
    title: (card.querySelector(".project-overlay")?.textContent || "").trim()
  });
});

function createGalleryModal() {
  let modal = document.querySelector(".gallery-modal");
  if (modal) return modal;

  modal = document.createElement("div");
  modal.className = "gallery-modal";
  modal.setAttribute("aria-hidden", "true");
  modal.innerHTML = `
    <div class="gallery-dialog" role="dialog" aria-modal="true" aria-label="Project image gallery" tabindex="-1">
      <button class="gallery-close" type="button" aria-label="Close gallery">&times;</button>
      <button class="gallery-prev" type="button" aria-label="Previous image">&#10094;</button>
      <img class="gallery-image" src="" alt="">
      <button class="gallery-next" type="button" aria-label="Next image">&#10095;</button>
      <div class="gallery-footer">
        <p class="gallery-caption"></p>
        <div class="gallery-dots" role="tablist" aria-label="Gallery images"></div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  return modal;
}

const galleryModal = createGalleryModal();
const galleryDialog = galleryModal.querySelector(".gallery-dialog");
const galleryImage = galleryModal.querySelector(".gallery-image");
const galleryCaption = galleryModal.querySelector(".gallery-caption");
const galleryDots = galleryModal.querySelector(".gallery-dots");
const galleryClose = galleryModal.querySelector(".gallery-close");
const galleryPrev = galleryModal.querySelector(".gallery-prev");
const galleryNext = galleryModal.querySelector(".gallery-next");

const galleryState = {
  images: [],
  title: "",
  index: 0,
  opener: null
};

function getFocusableInModal() {
  return Array.from(
    galleryModal.querySelectorAll(
      "button:not([disabled]), [href], [tabindex]:not([tabindex='-1'])"
    )
  ).filter(el => el.offsetParent !== null);
}

function renderGallery() {
  if (!galleryState.images.length) return;

  const total = galleryState.images.length;
  const index = (galleryState.index + total) % total;
  galleryState.index = index;

  const current = galleryState.images[index];
  const alt = (current.getAttribute("alt") || "").trim();
  galleryImage.src = current.currentSrc || current.src;
  galleryImage.alt = alt || galleryState.title || `Project image ${index + 1}`;
  galleryCaption.textContent = galleryState.title || alt || "";

  galleryDots.innerHTML = "";
  galleryState.images.forEach((_, dotIndex) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = `gallery-dot${dotIndex === index ? " is-active" : ""}`;
    dot.setAttribute("aria-label", `Show image ${dotIndex + 1}`);
    dot.setAttribute("aria-current", dotIndex === index ? "true" : "false");
    dot.dataset.galleryIndex = String(dotIndex);
    galleryDots.appendChild(dot);
  });

  const showNav = total > 1;
  galleryPrev.hidden = !showNav;
  galleryNext.hidden = !showNav;
  galleryDots.hidden = !showNav;
}

function openGallery(images, startIndex, title, opener) {
  if (!images.length) return;
  galleryState.images = images;
  galleryState.index = startIndex;
  galleryState.title = title || "";
  galleryState.opener = opener || document.activeElement;

  renderGallery();
  galleryModal.classList.add("is-open");
  galleryModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  galleryClose.focus();
}

function closeGallery() {
  if (!galleryModal.classList.contains("is-open")) return;

  galleryModal.classList.remove("is-open");
  galleryModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");

  if (galleryState.opener && typeof galleryState.opener.focus === "function") {
    galleryState.opener.focus();
  }
}

function moveGallery(step) {
  if (!galleryState.images.length) return;
  galleryState.index += step;
  renderGallery();
}

projectCards.forEach(card => {
  const data = galleryItemsByCard.get(card);
  if (!data) return;

  data.triggerArea.addEventListener("click", event => {
    const blocked = event.target.closest(".project-nav, .project-dot, .project-overlay a, .project-overlay button");
    if (blocked) return;

    const clickedImage = event.target.closest("img");
    const currentIndex = Number(card.querySelector("[data-slider]")?.dataset.currentIndex || 0);
    const imageIndex = clickedImage ? data.images.indexOf(clickedImage) : -1;
    const startIndex = imageIndex >= 0 ? imageIndex : currentIndex;

    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    openGallery(data.images, startIndex, data.title, opener);
  });
});

galleryClose.addEventListener("click", closeGallery);
galleryPrev.addEventListener("click", () => moveGallery(-1));
galleryNext.addEventListener("click", () => moveGallery(1));
galleryDots.addEventListener("click", event => {
  const dot = event.target.closest("[data-gallery-index]");
  if (!dot) return;
  galleryState.index = Number(dot.dataset.galleryIndex || 0);
  renderGallery();
});

galleryModal.addEventListener("click", event => {
  if (event.target === galleryModal) {
    closeGallery();
  }
});

document.addEventListener("keydown", event => {
  if (!galleryModal.classList.contains("is-open")) return;

  if (event.key === "Escape") {
    event.preventDefault();
    closeGallery();
    return;
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    moveGallery(-1);
    return;
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();
    moveGallery(1);
    return;
  }

  if (event.key === "Tab") {
    const focusable = getFocusableInModal();
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }
});


  const yearNodes = document.querySelectorAll("[data-year]");
  if (yearNodes.length) {
    const year = new Date().getFullYear();
    yearNodes.forEach(node => {
      node.textContent = String(year);
    });
  }
})();
