//sakana
// 等库加载完毕后，再 init
function initSakanaOnHome() {
  // 如果不在 Home 页就不做
  if (!document.getElementById("home").classList.contains("active")) return;

  // 左侧默认角色
  new SakanaWidget({
    autoFit: true,    // 自适应容器
    controls: false,  // 隐藏控制条
  }).mount("#sakana-widget-left");

  // 右侧指定另一个角色
  new SakanaWidget({
    character: "takina", // 用 takina
    autoFit: true,
    controls: false,
  }).mount("#sakana-widget-right");
}

// 页面切换时尝试初始化
function tryInitSakana() {
  // 先清空之前 mount 的 DOM
  document.querySelectorAll(".sakanaFixed").forEach(el => el.innerHTML = "");

  // 延迟初始化确保容器存在
  setTimeout(initSakanaOnHome, 50);
}

// hook 你的 goPage
const oldGoPageForSakana = goPage;
goPage = function(pageId) {
  oldGoPageForSakana(pageId);

  // 每次切换页都会 init
  tryInitSakana();
};

// 首次 load
window.addEventListener("load", tryInitSakana);
