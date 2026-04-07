
/* ===============================
   Modal Logic
=============================== */

const modal = document.getElementById("customModal");
const openModalBtn = document.getElementById("openModalBtn");
const modalOkBtn = document.getElementById("modalOkBtn");

openModalBtn.addEventListener("click", () => {
  modal.classList.add("show");
});

modalOkBtn.addEventListener("click", () => {
  modal.classList.remove("show");
});

// 点击遮罩关闭
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
  }
});