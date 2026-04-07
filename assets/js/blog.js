   /* ===============================
       Blog 渲染
    =============================== */

    const blogList = document.getElementById("blogList");

    const blogs = [
  {
    id: "blog—about-this-web",
    title: "关于这个网站",
    intro: "我正在学习前端 尽可能的想把网站做的简洁大气 符合审美一些",
    date: "2026-04-01",
    content: `
      <p>关于网页的外观与交互</p>

      <h2>1. 选择了SPA而不是MPA的原因</h2>
      <p>我希望网站在任何地方都是简洁的,包括其互动性.<br>所以我选择了不需要每次都跳转到新界面的SPA
         但新增标签页有的时候感觉也不是坏事,在需要同时打开几个标签页同时观看内容的时候,还是传统的MPA
         更符合直觉和方便一些,但是这个网站并不需要这种特性,所以先使用单个标签页的形式吧.</p>

      <h2>2. 网站的外观以及UI</h2>
      <p></p>

      <h2>3. </h2>
      <p></p>
    `
  },
];

    function renderBlogs() {
  blogList.innerHTML = "";

  blogs.forEach(b => {
    const div = document.createElement("div");
    div.className = "item blogCard";

    div.innerHTML = `
      <h3>${b.title}</h3>
      <p>${b.intro}</p>
      <p class="blogMeta">📅 ${b.date}</p>
      <button class="smallBtn">阅读文章</button>
    `;

    div.addEventListener("click", () => {
      openBlogDetail(b.id);
    });

    blogList.appendChild(div);
  });
}

    renderBlogs();

    const detailTitle = document.getElementById("detailTitle");
const detailDate = document.getElementById("detailDate");
const detailContent = document.getElementById("detailContent");

function openBlogDetail(blogId) {
  const blog = blogs.find(b => b.id === blogId);
  if (!blog) return;

  detailTitle.textContent = blog.title;
  detailDate.textContent = "📅 " + blog.date;
  detailContent.innerHTML = blog.content;

  // 改URL hash，支持刷新恢复
  history.pushState({ page: "blogDetail", id: blogId }, "", `#blogDetail?id=${blogId}`);

  // 切换页面显示（不再用 goPage 以免覆盖hash）
  document.querySelectorAll(".page").forEach(page => page.classList.remove("active"));
  document.getElementById("blogDetail").classList.add("active");

  document.querySelectorAll(".navBtn").forEach(btn => btn.classList.remove("active"));
  const blogBtn = document.querySelector(`[data-page="blog"]`);
  if (blogBtn) blogBtn.classList.add("active");
}