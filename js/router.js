    /* ===============================
       SPA Router（页面切换，不跳转）
    =============================== */

    function goPage(pageId) {
      // 切换页面显示
      document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
      });

      const target = document.getElementById(pageId);
      if (target) target.classList.add("active");

      // 切换导航按钮样式
      document.querySelectorAll(".navBtn").forEach(btn => {
        btn.classList.remove("active");
      });

      const activeBtn = document.querySelector(`[data-page="${pageId}"]`);
      if (activeBtn) activeBtn.classList.add("active");

      // 修改URL hash（不刷新页面）
      if (pageId !== "blogDetail") {
  history.pushState({ page: pageId }, "", "#" + pageId);
}
    }

    // navbar点击切换
    document.querySelectorAll(".navBtn").forEach(btn => {
      btn.addEventListener("click", () => {
        goPage(btn.dataset.page);
      });
    });

    // 返回键支持
    function handleRoute() {
  const route = parseHash();

  // 如果是文章详情页
  if (route.page === "blogDetail" && route.id) {
    openBlogDetail(route.id);
    return;
  }

  // 否则正常切换
  goPage(route.page || "home");
}

window.addEventListener("popstate", handleRoute);
window.addEventListener("load", handleRoute);

    function parseHash() {
  const hash = location.hash.replace("#", "");
  if (!hash) return { page: "home" };

  const [pagePart, queryPart] = hash.split("?");
  const params = new URLSearchParams(queryPart || "");

  return {
    page: pagePart,
    id: params.get("id")
  };
}