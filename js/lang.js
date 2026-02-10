/* =========================
   Language content storage
   ========================= */

const LANG_CONTENT = {
  fi: {
    meta: {
      titleSuffix: "Rakennuspalvelut Valkeakoskella",
      description:
        "MRH Rakennus Oy on rakennusalan yritys Valkeakoskella. Tarjoamme laadukasta uudis- ja korjausrakentamista."
    },

    hero: {
      title: "Luotettava rakennuskumppani",
      text: "Tarjoamme laadukasta ja vastuullista uudis- ja korjausrakentamista."
    },

    services: {
      heading: "Palvelumme",
      list: [
        "Väliseinät ja rungot",
        "Alakatot",
        "Seinä- ja kattotyöt",
        "Saneeraus",
        "Ovien ja ikkunoiden asennus"
      ]
    }
  },

  en: {
    meta: {
      titleSuffix: "Construction Services in Valkeakoski",
      description:
        "MRH Rakennus Oy is a construction company in Valkeakoski specializing in new builds and renovations."
    },

    hero: {
      title: "Your trusted construction partner",
      text: "We provide high-quality and responsible construction services."
    },

    services: {
      heading: "Our Services",
      list: [
        "Partition walls and frameworks",
        "Suspended ceilings",
        "Wall and ceiling works",
        "Renovation",
        "Door and window installation"
      ]
    }
  },

  ru: {
    meta: {
      titleSuffix: "Строительные услуги в Валкеакоски",
      description:
        "MRH Rakennus Oy — строительная компания в Валкеакоски. Новое строительство и ремонт."
    },

    hero: {
      title: "Надёжный строительный партнёр",
      text: "Качественные и ответственные строительные услуги."
    },

    services: {
      heading: "Наши услуги",
      list: [
        "Перегородки и каркасы",
        "Подвесные потолки",
        "Отделка стен и потолков",
        "Ремонт",
        "Установка дверей и окон"
      ]
    }
  },

  et: {
    meta: {
      titleSuffix: "Ehitus- ja renoveerimisteenused",
      description:
        "MRH Rakennus Oy on ehitusettevõte Valkeakoski piirkonnas. Uus- ja renoveerimistööd."
    },

    hero: {
      title: "Usaldusväärne ehituspartner",
      text: "Pakume kvaliteetseid ja vastutustundlikke ehitusteenuseid."
    },

    services: {
      heading: "Teenused",
      list: [
        "Vaheseinad ja karkassid",
        "Ripplaed",
        "Seina- ja laetööd",
        "Renoveerimine",
        "Uste ja akende paigaldus"
      ]
    }
  },

  uk: {
    meta: {
      titleSuffix: "Будівельні послуги у Валкеакоскі",
      description:
        "MRH Rakennus Oy — будівельна компанія у Валкеакоскі. Нове будівництво та ремонт."
    },

    hero: {
      title: "Надійний будівельний партнер",
      text: "Якісні та відповідальні будівельні послуги."
    },

    services: {
      heading: "Наші послуги",
      list: [
        "Перегородки та каркаси",
        "Підвісні стелі",
        "Оздоблення стін і стель",
        "Ремонт",
        "Встановлення дверей та вікон"
      ]
    }
  }
};

/* =========================
   Language detection (URL)
   ========================= */

function detectLanguage() {
  const pathParts = window.location.pathname.split("/").filter(Boolean);

  // Works for:
  // domain.com/fi/
  // username.github.io/repo/fi/
  const possibleLang = pathParts[pathParts.length - 1];

  return LANG_CONTENT[possibleLang] ? possibleLang : "fi";
}

/* =========================
   Content injection
   ========================= */

function applyLanguage(lang) {
  const data = LANG_CONTENT[lang];

  // <html lang="">
  document.documentElement.lang = lang;

  // <title>
  document.title = `MRH Rakennus Oy – ${data.meta.titleSuffix}`;

  // meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute("content", data.meta.description);
  }

  // Hero section
  setText("hero-title", data.hero.title);
  setText("hero-text", data.hero.text);

  // Services
  setText("services-heading", data.services.heading);
  renderList("services-list", data.services.list);
}

/* =========================
   Helpers
   ========================= */

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function renderList(id, items) {
  const el = document.getElementById(id);
  if (!el) return;

  el.innerHTML = "";
  items.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    el.appendChild(li);
  });
}

/* =========================
   Init
   ========================= */

const currentLang = detectLanguage();
applyLanguage(currentLang);
