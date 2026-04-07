
/* ===============================
   Galaxy System (Interactive Canvas)
=============================== */

const canvas = document.getElementById("galaxyCanvas");
const ctx = canvas.getContext("2d");

let cw = 0;
let ch = 0;
let centerX = 0;
let centerY = 0;

function resizeCanvas() {
  cw = canvas.width = window.innerWidth;
  ch = canvas.height = window.innerHeight;
  centerX = cw / 2;
  centerY = ch / 2;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

/* 鼠标视差倾斜参数 */
let mouseX = centerX;
let mouseY = centerY;
let tiltX = 0;
let tiltY = 0;
// 俯瞰角：40度左右的投影效果（y压缩）
let baseTilt = 0.76;  // 40度俯视大概 0.75~0.8
let dynamicTilt = baseTilt;

// 轨道整体旋转角（鼠标移动时轻微变化）
let orbitRotate = 0;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  const nx = (mouseX / cw) * 2 - 1;
  const ny = (mouseY / ch) * 2 - 1;

  // 背景平移视差
  tiltX = nx * 18;
  tiltY = ny * 18;

  // 俯视压缩动态变化（鼠标上下改变俯视程度）
  dynamicTilt = baseTilt + ny * 0.08; // 微调角度

  // 鼠标左右改变轨道旋转角（模拟视角左右转动）
  orbitRotate = nx * 0.35; // 弧度，0.35约20度
});

/* 星点背景 */
const stars = [];
const STAR_COUNT = 140;

function createStars() {
  stars.length = 0;
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * cw,
      y: Math.random() * ch,
      r: Math.random() * 1.6 + 0.2,
      alpha: Math.random() * 0.4 + 0.15,
      twinkle: Math.random() * 0.02 + 0.005
    });
  }
}
createStars();

/* 行星系统 */
const planets = [
  { name: "A", radius: 110, size: 7, speed: 0.004, angle: Math.random() * Math.PI * 2, color: "#7dd3fc" },
  { name: "B", radius: 175, size: 11, speed: 0.0028, angle: Math.random() * Math.PI * 2, color: "#fbbf24" },
  { name: "C", radius: 250, size: 8, speed: 0.0022, angle: Math.random() * Math.PI * 2, color: "#a78bfa" },
  { name: "D", radius: 320, size: 15, speed: 0.0017, angle: Math.random() * Math.PI * 2, color: "#34d399" }
];

/* 切页加速控制 */
let boost = 0; // 0~1
let boostTarget = 0;
let boostDecaySpeed = 0.03;

/* 触发加速：行星快速旋转几圈 */
function triggerGalaxyBoost() {
  boostTarget = 1;

  // 0.8秒后恢复
  setTimeout(() => {
    boostTarget = 0;
  }, 900);
}

//绘制轨道
function drawOrbit(radius, offsetX, offsetY) {
  const x = centerX + offsetX;
  const y = centerY + offsetY;

  const rx = radius;                 // 横轴半径
  const ry = radius * dynamicTilt;   // 纵轴半径（压缩成椭圆）

  ctx.save();

  // 轨道整体旋转（视角效果）
  ctx.translate(x, y);
  ctx.rotate(orbitRotate);

  ctx.beginPath();
  ctx.strokeStyle = "rgba(255,255,255,0.10)";
  ctx.lineWidth = 1;
  ctx.setLineDash([7, 10]);

  ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.setLineDash([]);
  ctx.restore();
}

/* 绘制中心恒星（矢量光晕） */
function drawStarCore(offsetX, offsetY) {
  const x = centerX + offsetX;
  const y = centerY + offsetY;

  // 外圈光晕
  const glow = ctx.createRadialGradient(x, y, 0, x, y, 120);
  glow.addColorStop(0, "rgba(255,255,255,0.55)");
  glow.addColorStop(0.3, "rgba(125,211,252,0.15)");
  glow.addColorStop(1, "rgba(255,255,255,0)");

  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(x, y, 120, 0, Math.PI * 2);
  ctx.fill();

  // 核心恒星
  ctx.beginPath();
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  ctx.arc(x, y, 16, 0, Math.PI * 2);
  ctx.fill();

  // 核心描边
  ctx.beginPath();
  ctx.strokeStyle = "rgba(255,255,255,0.55)";
  ctx.lineWidth = 2;
  ctx.arc(x, y, 16, 0, Math.PI * 2);
  ctx.stroke();
}

/* 绘制行星（矢量风格） */
function drawPlanet(px, py, size, color) {
  // 行星本体
  ctx.beginPath();
  ctx.fillStyle = color + "cc";
  ctx.arc(px, py, size, 0, Math.PI * 2);
  ctx.fill();

  // 描边
  ctx.beginPath();
  ctx.strokeStyle = "rgba(255,255,255,0.45)";
  ctx.lineWidth = 1.5;
  ctx.arc(px, py, size, 0, Math.PI * 2);
  ctx.stroke();

  // 小光点（模拟高光）
  ctx.beginPath();
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.arc(px - size * 0.35, py - size * 0.35, size * 0.25, 0, Math.PI * 2);
  ctx.fill();
}

/* 绘制星点 */
function drawStars(offsetX, offsetY) {
  for (let s of stars) {
    s.alpha += Math.sin(Date.now() * s.twinkle) * 0.003;

    ctx.beginPath();
    ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
    ctx.arc(s.x + offsetX * 0.25, s.y + offsetY * 0.25, s.r, 0, Math.PI * 2);
    ctx.fill();
  }
}

/* 动画主循环 */
function animateGalaxy() {
  ctx.clearRect(0, 0, cw, ch);

  // 让星系随鼠标倾斜移动（视差）
  const offsetX = tiltX;
  const offsetY = tiltY;

  // Boost 平滑过渡
  boost += (boostTarget - boost) * 0.08;

  // 星空
  drawStars(offsetX, offsetY);

  // 中心恒星
  drawStarCore(offsetX * 0.6, offsetY * 0.6);

  // 轨道 + 行星
  planets.forEach((p, index) => {
    drawOrbit(p.radius, offsetX * 0.6, offsetY * 0.6);

    // boost 会让速度瞬间翻倍以上
    const speedBoost = 1 + boost * 12;

    p.angle += p.speed * speedBoost;

    // 椭圆轨道运动：y方向压缩 + 轨道旋转
    const localX = Math.cos(p.angle) * p.radius;
    const localY = Math.sin(p.angle) * p.radius * dynamicTilt;

    // 轨道旋转矩阵（让椭圆可以转动）
    const rotatedX = localX * Math.cos(orbitRotate) - localY * Math.sin(orbitRotate);
    const rotatedY = localX * Math.sin(orbitRotate) + localY * Math.cos(orbitRotate);

    const px = centerX + offsetX * 0.8 + rotatedX;
    const py = centerY + offsetY * 0.8 + rotatedY;
    drawPlanet(px, py, p.size, p.color);

    // 让部分行星带环（更像矢量图）
    if (index === 1) {
      ctx.beginPath();
      ctx.strokeStyle = "rgba(255,255,255,0.20)";
      ctx.lineWidth = 2;
      ctx.ellipse(px, py, p.size * 2.1, p.size * 1.2, p.angle * 0.7, 0, Math.PI * 2);
      ctx.stroke();
    }
  });

  requestAnimationFrame(animateGalaxy);
}

animateGalaxy();

/* ===============================
   Hook into SPA page switching
   切换页面时触发行星加速旋转
=============================== */

/* 给你的 goPage 加一个增强功能：
   每次切换页面都触发 boost
*/
const oldGoPage = goPage;
goPage = function (pageId) {
  triggerGalaxyBoost();
  oldGoPage(pageId);
};