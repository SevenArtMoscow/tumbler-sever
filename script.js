(() => {
  const form = document.getElementById("bookForm");
  const note = document.getElementById("formNote");
  const dateInput = form?.querySelector('[name="date"]');
  const burger = document.querySelector(".burger");
  const mobileNav = document.querySelector(".mobile-nav");

  if (dateInput) {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    dateInput.min = new Date().toISOString().slice(0, 10);
    dateInput.value = d.toISOString().slice(0, 10);
  }

  document.querySelectorAll(".menu-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const id = tab.dataset.tab;
      document.querySelectorAll(".menu-tab").forEach((t) => {
        const on = t === tab;
        t.classList.toggle("is-active", on);
        t.setAttribute("aria-selected", on ? "true" : "false");
      });
      document.querySelectorAll(".menu-panel").forEach((panel) => {
        const on = panel.id === `panel-${id}`;
        panel.classList.toggle("is-active", on);
        panel.hidden = !on;
      });
    });
  });

  burger?.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("is-open");
    mobileNav.hidden = !open;
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });

  mobileNav?.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      mobileNav.classList.remove("is-open");
      mobileNav.hidden = true;
      burger?.setAttribute("aria-expanded", "false");
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
      data.get("note") ? `Комментарий: ${data.get("note")}` : null,
    ]
      .filter(Boolean)
      .join("\n");
    note.textContent = "Открываю Telegram…";
    window.open(`https://t.me/life_slow?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  });
})();
