(() => {
  const top = document.querySelector(".top");
  if (!top) return;

  const onScroll = () => {
    top.style.background =
      window.scrollY > 40
        ? "rgba(16, 19, 26, 0.92)"
        : "linear-gradient(to bottom, rgba(16, 19, 26, 0.92), transparent)";
    top.style.backdropFilter = window.scrollY > 40 ? "blur(10px)" : "none";
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();
