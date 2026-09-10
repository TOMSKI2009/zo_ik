// Language switcher and translation engine for Furniture House Zoik
(function () {
  let currentLang = localStorage.getItem('fhz_lang') || 'ge';

  function getActiveDict(lang) {
    if (lang === 'en') {
      return window.translationsGE || (typeof translationsGE !== 'undefined' ? translationsGE : {});
    } else {
      return window.translationsEN || (typeof translationsEN !== 'undefined' ? translationsEN : {});
    }
  }

  function updateSwitcherUI(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const btnLang = btn.getAttribute('data-lang');
      if (btnLang === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  function translatePage(targetLang) {
    const dict = getActiveDict(targetLang);
    if (!dict || Object.keys(dict).length === 0) return;

    // 1. Document title
    if (document.title) {
      const normTitle = document.title.trim().replace(/\s+/g, ' ');
      if (dict[normTitle]) {
        document.title = dict[normTitle];
      } else {
        for (const [k, v] of Object.entries(dict)) {
          if (k.length > 5 && document.title.includes(k)) {
            document.title = document.title.replace(k, v);
          }
        }
      }
    }

    // 2. Elements with HTML tags in dictionary (e.g. <em>, <br>, <strong>)
    const htmlKeys = Object.keys(dict).filter(k => k.includes('<'));
    htmlKeys.sort((a, b) => b.length - a.length);

    const candidates = document.querySelectorAll('h1, h2, h3, h4, p, div, span, address');
    candidates.forEach(el => {
      if (el.childElementCount > 0 && el.childElementCount <= 4) {
        const norm = el.innerHTML.trim().replace(/\s+/g, ' ');
        for (const k of htmlKeys) {
          if (norm === k.replace(/\s+/g, ' ')) {
            el.innerHTML = dict[k];
            break;
          }
        }
      }
    });

    // 3. TreeWalker for text nodes
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function (node) {
          if (!node || !node.nodeValue) return NodeFilter.FILTER_REJECT;
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          const tag = parent.tagName;
          if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') {
            return NodeFilter.FILTER_REJECT;
          }
          if (parent.classList.contains('lang-btn') || parent.classList.contains('lang-sep')) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const textNodes = [];
    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    for (const node of textNodes) {
      const val = node.nodeValue;
      const trimmed = val.trim().replace(/\s+/g, ' ');
      if (trimmed && dict[trimmed]) {
        const matchLead = val.match(/^\s*/);
        const matchTrail = val.match(/\s*$/);
        const lead = matchLead ? matchLead[0] : '';
        const trail = matchTrail ? matchTrail[0] : '';
        node.nodeValue = lead + dict[trimmed] + trail;
      }
    }

    // 4. Form inputs, placeholders, select options, button values, and aria labels
    document.querySelectorAll('input, textarea, select, button, [aria-label]').forEach(el => {
      if (el.placeholder) {
        const norm = el.placeholder.trim().replace(/\s+/g, ' ');
        if (dict[norm]) el.placeholder = dict[norm];
      }
      if ((el.tagName === 'INPUT' || el.tagName === 'BUTTON') && el.value) {
        const norm = el.value.trim().replace(/\s+/g, ' ');
        if (dict[norm]) el.value = dict[norm];
      }
      if (el.tagName === 'SELECT') {
        Array.from(el.options).forEach(opt => {
          const norm = opt.text.trim().replace(/\s+/g, ' ');
          if (dict[norm]) opt.text = dict[norm];
        });
      }
      const aria = el.getAttribute('aria-label');
      if (aria) {
        const norm = aria.trim().replace(/\s+/g, ' ');
        if (dict[norm]) el.setAttribute('aria-label', dict[norm]);
      }
    });

    // 5. Notify page-specific dynamic handlers
    if (typeof window.onLanguageChange === 'function') {
      try {
        window.onLanguageChange(targetLang);
      } catch (err) {
        console.warn('Error in onLanguageChange:', err);
      }
    }
  }

  function setLanguage(lang, doTranslate = true) {
    if (lang !== 'en' && lang !== 'ge') return;

    currentLang = lang;
    localStorage.setItem('fhz_lang', lang);
    document.documentElement.lang = lang;
    updateSwitcherUI(lang);

    if (doTranslate) {
      translatePage(lang);
    }
  }

  // Hook toast messages so notifications match active language
  function hookToast() {
    if (typeof window.showToast === 'function' && !window.showToast._isHooked) {
      const rawToast = window.showToast;
      window.showToast = function (msg) {
        const dict = getActiveDict(currentLang);
        const norm = msg ? msg.trim().replace(/\s+/g, ' ') : '';
        const translated = (dict && dict[norm]) ? dict[norm] : msg;
        return rawToast(translated);
      };
      window.showToast._isHooked = true;
    }
  }

  // Delegated click handler for language switcher
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.lang-btn');
    if (btn) {
      e.preventDefault();
      const lang = btn.getAttribute('data-lang');
      if (lang) {
        setLanguage(lang, true);
      }
    }
  });

  // Initial setup when DOM is ready
  function init() {
    document.documentElement.lang = currentLang;
    updateSwitcherUI(currentLang);
    hookToast();

    // If initial language is English, apply English translations to page
    if (currentLang === 'en') {
      translatePage('en');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose global methods
  window.setLanguage = setLanguage;
  window.getCurrentLanguage = function () { return currentLang; };
  window.translatePage = translatePage;
})();
