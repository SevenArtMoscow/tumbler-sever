(() => {
  const fab = document.querySelector(".menu-fab");
  const drawer = document.getElementById("drawer");
  const closeBtn = document.querySelector(".drawer-close");
  const form = document.getElementById("bookForm");
  const note = document.getElementById("formNote");
  const dateInput = form?.querySelector('[name="date"]');

  if (dateInput) {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    dateInput.min = new Date().toISOString().slice(0, 10);
    dateInput.value = d.toISOString().slice(0, 10);
  }

  function openDrawer(open) {
    if (!drawer || !fab) return;
    drawer.hidden = !open;
    fab.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  }

  fab?.addEventListener("click", () => openDrawer(drawer.hidden));
  closeBtn?.addEventListener("click", () => openDrawer(false));
  drawer?.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => openDrawer(false));
  });

  document.querySelectorAll(".menu-tabs button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.tab;
      document.querySelectorAll(".menu-tabs button").forEach((b) => {
        const on = b === btn;
        b.classList.toggle("is-on", on);
        b.setAttribute("aria-selected", on ? "true" : "false");
      });
      ["coffee", "food", "drink"].forEach((key) => {
        const panel = document.getElementById(`tab-${key}`);
        if (panel) panel.hidden = key !== id;
      });
    });
  });

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    note.classList.remove("is-error");
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const tg = String(data.get("tg") || "").trim();
    if (!name || !tg) {
      note.textContent = "Заполни имя и Telegram.";
      note.classList.add("is-error");
      return;
    }
    const text = [
      "SEVER — бронь стола",
      `Имя: ${name}`,
      `TG: ${tg}`,
      `Дата: ${data.get("date")} ${data.get("time")}`,
      `Гостей: ${data.get("guests")}`,
    ].join("\n");
    note.textContent = "Открываю Telegram…";
    window.open(`https://t.me/life_slow?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  });
})();
