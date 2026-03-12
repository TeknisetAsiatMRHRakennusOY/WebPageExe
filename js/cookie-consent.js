(() => {
  const STORAGE_KEY = "mrh-cookie-consent-v1";
  const GA_SCRIPT_ID = "mrh-ga-script";
  const CONSENT_ACCEPTED = "accepted";
  const CONSENT_REJECTED = "rejected";
  const DEFAULT_LANG = "en";

  const I18N = {
    en: {
      title: "Cookie settings",
      intro: "We use essential cookies for site functionality and optional analytics cookies to understand website usage.",
      listLabel: "Typical data we may collect for analytics:",
      list: [
        "Visit statistics (pages visited and time on site)",
        "Browser/device type and operating system",
        "Approximate location based on IP address"
      ],
      more: "View full data list and privacy policy",
      detailsHeading: "Full data list and privacy policy",
      detailsBody: "To ensure secure and efficient website delivery, we rely on trusted technical service providers.",
      detailsPolicy: "Cloudflare:",
      policyList: [
        "This website uses Cloudflare, a content delivery network and security service provided by Cloudflare Inc.",
        "Cloudflare processes technical data such as IP addresses and request information to ensure secure and efficient delivery of the website.",
        "Cloudflare may set necessary security cookies to protect the website from malicious traffic."
      ],
      accept: "Accept cookies",
      reject: "Reject optional cookies",
      reopen: "Cookie settings",
      closeDetails: "Close details"
    },
    fi: {
      title: "Evasteasetukset",
      intro: "Kaytamme valttamattomia evasteita sivuston toimintaan ja valinnaisia analytiikkaevasteita kayton ymmartamiseen.",
      listLabel: "Tyypilliset analytiikkaan kerattavat tiedot:",
      list: [
        "Kayntilastot (vieraillut sivut ja aika sivustolla)",
        "Selaimen/laitteen tyyppi ja kayttojarjestelma",
        "Likimaarainen sijainti IP-osoitteen perusteella"
      ],
      more: "Avaa taydellinen tietolista ja tietosuojaseloste",
      detailsHeading: "Taydellinen tietolista ja tietosuojaseloste",
      detailsBody: "Sivuston turvallisen toiminnan ja toimituksen varmistamiseksi kaytamme luotettavia teknisia palveluntarjoajia.",
      detailsPolicy: "Cloudflare:",
      policyList: [
        "This website uses Cloudflare, a content delivery network and security service provided by Cloudflare Inc.",
        "Cloudflare processes technical data such as IP addresses and request information to ensure secure and efficient delivery of the website.",
        "Cloudflare may set necessary security cookies to protect the website from malicious traffic."
      ],
      accept: "Hyvaksy evasteet",
      reject: "Hylkaa valinnaiset evasteet",
      reopen: "Evasteasetukset",
      closeDetails: "Sulje lisatiedot"
    },
    et: {
      title: "Kupsiste seaded",
      intro: "Kasutame saidi toimimiseks hadavajalikke kupsiseid ja valikulisi analuutikakupsiseid kasutuse moistmiseks.",
      listLabel: "Tuuupilised analuutikaandmed, mida voime koguda:",
      list: [
        "Kulastusstatistika (kulastatud lehed ja aeg saidil)",
        "Brauseri/seadme tuup ja operatsioonisusteem",
        "Ligikaudne asukoht IP-aadressi pohjal"
      ],
      more: "Ava taielik andmeloend ja privaatsuspoliitika",
      detailsHeading: "Taielik andmeloend ja privaatsuspoliitika",
      detailsBody: "Veebisaidi turvalise ja tohusalt toimiva edastuse tagamiseks kasutame usaldusvaarseid tehnilisi teenusepakkujaid.",
      detailsPolicy: "Cloudflare:",
      policyList: [
        "See veebisait kasutab Cloudflare'i, mis on Cloudflare Inc. pakutav sisuedastusvork ja turvateenus.",
        "Cloudflare tootleb tehnilisi andmeid, nagu IP-aadressid ja paringuteave, et tagada veebisaidi turvaline ja tohus edastus.",
        "Cloudflare voib seada vajalikke turvakupsiseid, et kaitsta veebisaiti pahatahtliku liikluse eest."
      ],
      accept: "Noustu kupsistega",
      reject: "Keeldu valikulistest kupsistest",
      reopen: "Kupsiste seaded",
      closeDetails: "Sulge lisainfo"
    },
    ru: {
      title: "Настройки cookie",
      intro: "Мы используем обязательные cookie для работы сайта и дополнительные аналитические cookie для анализа посещений.",
      listLabel: "Типичные аналитические данные, которые могут собираться:",
      list: [
        "Статистика посещений (просмотренные страницы и время на сайте)",
        "Тип браузера/устройства и операционная система",
        "Примерное местоположение на основе IP-адреса"
      ],
      more: "Открыть полный список данных и политику конфиденциальности",
      detailsHeading: "Полный список данных и политика конфиденциальности",
      detailsBody: "Для безопасной и эффективной работы сайта мы используем надежных технических поставщиков услуг.",
      detailsPolicy: "Cloudflare:",
      policyList: [
        "Этот сайт использует Cloudflare - сеть доставки контента и сервис безопасности, предоставляемые Cloudflare Inc.",
        "Cloudflare обрабатывает технические данные, такие как IP-адреса и информация о запросах, чтобы обеспечить безопасную и эффективную доставку сайта.",
        "Cloudflare может устанавливать необходимые защитные cookie-файлы для защиты сайта от вредоносного трафика."
      ],
      accept: "Принять cookie",
      reject: "Отклонить дополнительные cookie",
      reopen: "Настройки cookie",
      closeDetails: "Закрыть детали"
    },
    uk: {
      title: "Налаштування cookie",
      intro: "Ми використовуємо обов'язкові cookie для роботи сайту та додаткові аналітичні cookie для аналізу відвідувань.",
      listLabel: "Типові аналітичні дані, які можуть збиратися:",
      list: [
        "Статистика відвідувань (переглянуті сторінки та час на сайті)",
        "Тип браузера/пристрою та операційна система",
        "Приблизне місцезнаходження на основі IP-адреси"
      ],
      more: "Відкрити повний список даних і політику конфіденційності",
      detailsHeading: "Повний список даних і політика конфіденційності",
      detailsBody: "Для безпечної та ефективної роботи сайту ми використовуємо надійних технічних постачальників послуг.",
      detailsPolicy: "Cloudflare:",
      policyList: [
        "Цей вебсайт використовує Cloudflare - мережу доставки контенту та сервіс безпеки від Cloudflare Inc.",
        "Cloudflare обробляє технічні дані, такі як IP-адреси та інформація про запити, щоб забезпечити безпечну й ефективну доставку вебсайту.",
        "Cloudflare може встановлювати необхідні захисні cookie-файли для захисту вебсайту від шкідливого трафіку."
      ],
      accept: "Прийняти cookie",
      reject: "Відхилити додаткові cookie",
      reopen: "Налаштування cookie",
      closeDetails: "Закрити деталі"
    }
  };

  function getCurrentLang() {
    const htmlLang = (document.documentElement.lang || "").toLowerCase();
    if (htmlLang.startsWith("ua")) return "uk";
    if (htmlLang.startsWith("fi")) return "fi";
    if (htmlLang.startsWith("et")) return "et";
    if (htmlLang.startsWith("ru")) return "ru";
    if (htmlLang.startsWith("uk")) return "uk";
    return "en";
  }

  function packFor(lang) {
    return I18N[lang] || I18N[DEFAULT_LANG];
  }

  function readConsent() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      return null;
    }
  }

  function writeConsent(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (error) {
      // Ignore storage errors (private mode, disabled storage)
    }
  }

  function loadGoogleAnalytics() {
    if (document.getElementById(GA_SCRIPT_ID)) {
      return;
    }

    // Insert your real Google Analytics Measurement ID here.
    const measurementId = "G-XXXXXXXXXX";

    if (!measurementId || measurementId === "G-XXXXXXXXXX") {
      return;
    }

    const script = document.createElement("script");
    script.id = GA_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };

    window.gtag("js", new Date());
    window.gtag("config", measurementId, { anonymize_ip: true });
  }

  function createFooterButton(getText) {
    const existing = document.querySelector(".cookie-settings-btn");
    if (existing) return existing;

    const footerInner = document.querySelector(".footer-inner");
    if (!footerInner) return null;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "cookie-settings-btn";
    btn.textContent = getText();
    footerInner.appendChild(btn);
    return btn;
  }

  function createBanner() {
    const section = document.createElement("section");
    section.className = "cookie-consent";
    section.setAttribute("aria-live", "polite");

    section.innerHTML = `
      <div class="cookie-consent-inner">
        <h2 class="cookie-title"></h2>
        <p class="cookie-intro"></p>
        <p class="cookie-list-label"></p>
        <ul class="cookie-list"></ul>
        <button type="button" class="cookie-more-link"></button>
        <div class="cookie-details" aria-hidden="true">
          <div class="cookie-details-card">
            <div class="cookie-details-head">
              <h3 class="cookie-details-title"></h3>
              <button type="button" class="cookie-details-close"></button>
            </div>
            <p class="cookie-details-body"></p>
            <p class="cookie-details-policy-label"></p>
            <ul class="cookie-details-policy"></ul>
          </div>
        </div>
        <div class="cookie-actions">
          <button type="button" class="cookie-btn cookie-btn-reject"></button>
          <button type="button" class="cookie-btn cookie-btn-accept"></button>
        </div>
      </div>
    `;

    document.body.appendChild(section);
    return section;
  }

  function parseLangFromHref(href) {
    if (!href) return null;
    const parts = href.split("/").filter(Boolean);
    if (!parts.length) return null;
    const target = parts[parts.length - 1].toLowerCase();
    if (target === "ua") return "uk";
    if (I18N[target]) return target;
    return null;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const banner = createBanner();
    const titleEl = banner.querySelector(".cookie-title");
    const introEl = banner.querySelector(".cookie-intro");
    const listLabelEl = banner.querySelector(".cookie-list-label");
    const listEl = banner.querySelector(".cookie-list");
    const moreBtn = banner.querySelector(".cookie-more-link");
    const detailsEl = banner.querySelector(".cookie-details");
    const detailsTitleEl = banner.querySelector(".cookie-details-title");
    const detailsBodyEl = banner.querySelector(".cookie-details-body");
    const detailsPolicyLabelEl = banner.querySelector(".cookie-details-policy-label");
    const detailsPolicyEl = banner.querySelector(".cookie-details-policy");
    const detailsCloseBtn = banner.querySelector(".cookie-details-close");
    const rejectBtn = banner.querySelector(".cookie-btn-reject");
    const acceptBtn = banner.querySelector(".cookie-btn-accept");

    let currentLang = getCurrentLang();
    let detailsOpen = false;

    const footerButton = createFooterButton(() => packFor(currentLang).reopen);

    function setDetailsState(open) {
      detailsOpen = open;
      banner.classList.toggle("is-details-open", open);
      detailsEl.setAttribute("aria-hidden", String(!open));
      moreBtn.setAttribute("aria-expanded", String(open));
    }

    function renderText() {
      const t = packFor(currentLang);
      titleEl.textContent = t.title;
      introEl.textContent = t.intro;
      listLabelEl.textContent = t.listLabel;
      moreBtn.textContent = t.more;
      detailsTitleEl.textContent = t.detailsHeading;
      detailsBodyEl.textContent = t.detailsBody;
      detailsPolicyLabelEl.textContent = t.detailsPolicy || "";
      detailsCloseBtn.textContent = t.closeDetails;
      rejectBtn.textContent = t.reject;
      acceptBtn.textContent = t.accept;
      if (footerButton) {
        footerButton.textContent = t.reopen;
      }

      listEl.innerHTML = "";
      t.list.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        listEl.appendChild(li);
      });

      detailsPolicyEl.innerHTML = "";
      const policyItems = Array.isArray(t.policyList) ? t.policyList : [];
      policyItems.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        detailsPolicyEl.appendChild(li);
      });

      if (!policyItems.length) {
        detailsPolicyLabelEl.style.display = "none";
        detailsPolicyEl.style.display = "none";
      } else {
        detailsPolicyLabelEl.style.display = "";
        detailsPolicyEl.style.display = "";
      }
    }

    function showBanner() {
      banner.classList.add("is-visible");
      banner.setAttribute("aria-hidden", "false");
    }

    function hideBanner() {
      banner.classList.remove("is-visible", "is-details-open");
      banner.setAttribute("aria-hidden", "true");
      setDetailsState(false);
    }

    function applyConsent(value) {
      writeConsent(value);
      if (value === CONSENT_ACCEPTED) {
        loadGoogleAnalytics();
      }
      hideBanner();
    }

    renderText();

    const consent = readConsent();
    if (consent === CONSENT_ACCEPTED) {
      loadGoogleAnalytics();
      hideBanner();
    } else if (consent === CONSENT_REJECTED) {
      hideBanner();
    } else {
      showBanner();
    }

    acceptBtn.addEventListener("click", () => applyConsent(CONSENT_ACCEPTED));
    rejectBtn.addEventListener("click", () => applyConsent(CONSENT_REJECTED));

    moreBtn.addEventListener("click", () => {
      setDetailsState(!detailsOpen);
    });

    detailsCloseBtn.addEventListener("click", () => {
      setDetailsState(false);
    });

    if (footerButton) {
      footerButton.addEventListener("click", () => {
        showBanner();
      });
    }

    const langLinks = Array.from(document.querySelectorAll(".lang-link"));
    langLinks.forEach(link => {
      link.addEventListener("click", () => {
        const targetLang = parseLangFromHref(link.getAttribute("href"));
        if (!targetLang) return;
        currentLang = targetLang;
        renderText();
      });
    });
  });
})();


