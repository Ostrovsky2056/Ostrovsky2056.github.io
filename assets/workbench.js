(() => {
  const handoff = window.screenshotHandoff;
  if (!handoff || !window.crypto?.randomUUID) return;

  const dropArea = document.querySelector("#screenshot-drop");
  const input = document.querySelector("#choose-screenshot");
  const status = document.querySelector("#screenshot-import-status");
  const editor = new URL(document.querySelector("#open-screenshot-tool").href);
  if (editor.origin !== location.origin) return;

  const messages = {
    en: {
      multiple: "Choose or drop one screenshot at a time.",
      unsupported: "Choose a PNG, JPEG, or WebP image.",
      opening: "Opening the screenshot in the editor…",
      failed: "Couldn’t open the screenshot automatically. Try again or choose it in the tool.",
    },
    "zh-CN": {
      multiple: "请一次选择或拖入一张截图。",
      unsupported: "请选择 PNG、JPEG 或 WebP 图片。",
      opening: "正在打开截图并进入脱敏工具…",
      failed: "无法自动打开截图。请重试，或打开工具直接选择截图。",
    },
  };
  let opening = false;
  let notice = "";

  function showStatus(message) {
    notice = message;
    status.textContent = (messages[document.documentElement.lang] || messages.en)[notice] || "";
    status.toggleAttribute("data-error", !!notice && notice !== "opening");
  }

  function setOpening(value) {
    opening = value;
    input.disabled = opening;
    dropArea.setAttribute("aria-busy", String(opening));
  }

  async function openFiles(files) {
    if (opening || !files.length) return;
    if (files.length !== 1) {
      showStatus("multiple");
      return;
    }

    const [file] = files;
    setOpening(true);
    showStatus("opening");
    try {
      if (!await handoff.supportedFormat(file)) {
        setOpening(false);
        showStatus("unsupported");
        return;
      }
      const token = await handoff.send(file);
      editor.hash = new URLSearchParams({ handoff: token }).toString();
      location.assign(editor.href);
    } catch {
      setOpening(false);
      showStatus("failed");
    }
  }

  input.addEventListener("change", () => {
    const files = Array.from(input.files);
    input.value = "";
    openFiles(files);
  });

  window.addEventListener("dragover", event => {
    if (!event.dataTransfer?.types.includes("Files")) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = opening ? "none" : "copy";
    dropArea.toggleAttribute("data-dragging", !opening);
  });

  window.addEventListener("dragleave", event => {
    if (!event.relatedTarget) dropArea.removeAttribute("data-dragging");
  });

  window.addEventListener("drop", event => {
    dropArea.removeAttribute("data-dragging");
    const files = event.dataTransfer?.files;
    if (!files?.length) return;
    event.preventDefault();
    openFiles(files);
  });

  window.addEventListener("pageshow", event => {
    if (!event.persisted) return;
    setOpening(false);
    showStatus("");
  });

  new MutationObserver(() => showStatus(notice)).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"],
  });
  dropArea.hidden = false;
})();
