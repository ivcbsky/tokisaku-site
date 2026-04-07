    /* ===============================
       Projects 渲染
    =============================== */

    const projectList = document.getElementById("projectList");

    const projects = [
      { title: "SPA个人网站", desc: "纯原生HTML/CSS/JS 单页框架。" },
      { title: "音乐电台播放器", desc: "支持播放、暂停、切歌。" },
    ];

    function renderProjects() {
      projectList.innerHTML = "";
      projects.forEach(p => {
        const div = document.createElement("div");
        div.className = "item";
        div.innerHTML = `
          <h3>${p.title}</h3>
          <p>${p.desc}</p>
        `;
        projectList.appendChild(div);
      });
    }

    renderProjects();
