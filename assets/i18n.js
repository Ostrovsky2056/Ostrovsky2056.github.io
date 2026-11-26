(() => {
  const storageKey = "open-projects.language";
  const simplifiedChineseSubtags = new Set(["hans", "cn", "sg", "my"]);
  const pickerContainer = document.querySelector("[data-language-picker]");
  const picker = pickerContainer?.querySelector("select");
  const translations = [];

  for (const [source, target] of [
    ["data-zh-cn", null],
    ["data-zh-cn-aria-label", "aria-label"],
    ["data-zh-cn-content", "content"],
  ]) {
    for (const element of document.querySelectorAll(`[${source}]`)) {
      translations.push({
        element,
        target,
        english: target ? element.getAttribute(target) : element.textContent,
        chinese: element.getAttribute(source),
      });
    }
  }

  function browserLanguage() {
    const preferences = navigator.languages?.length ? navigator.languages : [navigator.language];

    for (const preference of preferences) {
      if (!preference) continue;

      const [language, subtag] = preference.toLowerCase().split("-");
      if (language === "en") return "en";
      if (language === "zh" && (!subtag || simplifiedChineseSubtags.has(subtag))) return "zh-CN";
    }

    return "en";
  }

  function applyLanguage(choice) {
    const language = choice === "auto" ? browserLanguage() : choice;
    document.documentElement.lang = language;

    for (const { element, target, english, chinese } of translations) {
      const value = language === "zh-CN" ? chinese : english;
      if (target) {
        element.setAttribute(target, value);
      } else {
        element.textContent = value;
      }
    }
  }

  let choice = "auto";
  try {
    const savedLanguage = localStorage.getItem(storageKey);
    if (savedLanguage === "en" || savedLanguage === "zh-CN") choice = savedLanguage;
  } catch {
    // Storage may be disabled by the browser.
  }

  applyLanguage(choice);

  if (!picker) return;

  picker.value = choice;
  pickerContainer.hidden = false;
  picker.addEventListener("change", () => {
    const selected = picker.value;
    applyLanguage(selected);

    try {
      if (selected === "auto") {
        localStorage.removeItem(storageKey);
      } else {
        localStorage.setItem(storageKey, selected);
      }
    } catch {
      // The selected language still applies to this page.
    }
  });
})();
