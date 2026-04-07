

    /* ===============================
       倒计时 Countdown
    =============================== */

    const countdownText = document.getElementById("countdownText");

    function updateCountdown() {
      const target = new Date("2026-12-31 23:59:59").getTime();
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        countdownText.textContent = "倒计时结束 🎉";
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      countdownText.textContent = `${days}天 ${hours}小时 ${minutes}分 ${seconds}秒`;
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();