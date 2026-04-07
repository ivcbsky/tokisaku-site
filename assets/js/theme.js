
    /* ===============================
       Theme切换（暗色/亮色）
    =============================== */

    const themeBtn = document.getElementById("themeBtn");

    function toggleTheme() {
      document.body.classList.toggle("light");

      const isLight = document.body.classList.contains("light");
      localStorage.setItem("theme", isLight ? "light" : "dark");

      themeBtn.textContent = isLight ? "☀️" : "🌙";
    }

    themeBtn.addEventListener("click", toggleTheme);

    (function initTheme() {
      const saved = localStorage.getItem("theme");
      if (saved === "light") {
        document.body.classList.add("light");
        themeBtn.textContent = "☀️";
      }
    })();
