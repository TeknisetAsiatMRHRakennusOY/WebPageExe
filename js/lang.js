(() => {
  const langLinks = Array.from(document.querySelectorAll(".lang-link"));
  if (!langLinks.length) return;

  const parts = window.location.pathname.split("/").filter(Boolean);
  const knownLangs = ["fi", "en", "ru", "et", "uk", "ua"];
  const currentLang = [...parts].reverse().find(part => knownLangs.includes(part)) || "fi";

  langLinks.forEach(link => {
    const targetPath = link.getAttribute("href") || "";
    const targetParts = targetPath.split("/").filter(Boolean);
    const targetLang = targetParts[targetParts.length - 1];

    if (targetLang === currentLang || (targetLang === "ua" && currentLang === "uk")) {
      link.setAttribute("aria-current", "page");
    }
  });
})();
