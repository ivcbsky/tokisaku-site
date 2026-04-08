const barContainer = document.getElementById("barContainer");
const barCountSelect = document.getElementById("barCount");
const modeSelect = document.getElementById("modeSelect");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const restartBtn = document.getElementById("restartBtn");
const timeDisplay = document.getElementById("timeDisplay");
const gameStatus = document.getElementById("gameStatus");

let values = [];
let running = false;
let paused = false;

let timerInterval = null;
let startTime = null;
let elapsedBeforePause = 0;

let draggedIndex = null;

/* ===== 插入提示竖线 ===== */
const insertLine = document.createElement("div");
insertLine.className = "insert-line";
insertLine.style.opacity = "0";

/* ===== 生成数据 ===== */
function generateValues(count) {
  values = [];
  for (let i = 0; i < count; i++) {
    values.push(Math.floor(Math.random() * 90) + 10);
  }
}

/* ===== 渲染柱子 ===== */
function renderBars() {
  barContainer.innerHTML = "";

  values.forEach((value, index) => {
    const bar = document.createElement("div");
    bar.classList.add("bar");

    bar.style.height = value * 2 + "px";
    bar.dataset.index = index;

    bar.draggable = running && !paused;

    bar.addEventListener("dragstart", dragStart);
    bar.addEventListener("dragend", dragEnd);

    barContainer.appendChild(bar);
  });

  // 保证插入线永远在最上层
  barContainer.appendChild(insertLine);
}

/* ===== 根据鼠标X计算插入位置 index ===== */
function getDropIndex(clientX) {
  const bars = Array.from(barContainer.querySelectorAll(".bar"));
  if (bars.length === 0) return null;

  for (let i = 0; i < bars.length; i++) {
    const rect = bars[i].getBoundingClientRect();
    const mid = rect.left + rect.width / 2;

    if (clientX < mid) return i;
  }

  return bars.length; // 插入到末尾
}

/* ===== 更新插入竖线位置 ===== */
function updateInsertLine(clientX) {
  const bars = Array.from(barContainer.querySelectorAll(".bar"));
  if (bars.length === 0) return;

  const containerRect = barContainer.getBoundingClientRect();

  let x = bars[bars.length - 1].getBoundingClientRect().right - containerRect.left;

  for (let i = 0; i < bars.length; i++) {
    const rect = bars[i].getBoundingClientRect();
    const mid = rect.left + rect.width / 2;

    if (clientX < mid) {
      x = rect.left - containerRect.left;
      break;
    }
  }

  insertLine.style.left = `${x}px`;
  insertLine.style.opacity = "1";
}

/* ===== 拖拽事件 ===== */
function dragStart(e) {
  if (!running || paused) return;

  draggedIndex = Number(e.target.dataset.index);

  // Safari 必须 setData 才能拖动
  e.dataTransfer.setData("text/plain", "drag");
  e.dataTransfer.effectAllowed = "move";

  e.target.classList.add("dragging");
}

function dragEnd(e) {
  draggedIndex = null;
  e.target.classList.remove("dragging");

  insertLine.style.opacity = "0";
  document.querySelectorAll(".bar").forEach((bar) => bar.classList.remove("over"));

  checkSorted();
}

/* ===== Container 接管 dragover/drop ===== */
barContainer.addEventListener("dragover", (e) => {
  if (!running || paused) return;
  e.preventDefault();

  const dropIndex = getDropIndex(e.clientX);
  if (dropIndex === null) return;

  const mode = modeSelect.value;

  // 插入模式显示竖线
  if (mode === "insert") {
    updateInsertLine(e.clientX);
  } else {
    insertLine.style.opacity = "0";
  }

  // 交换模式用 over 高亮目标
  document.querySelectorAll(".bar").forEach((bar) => bar.classList.remove("over"));
  if (mode === "swap") {
    const bars = barContainer.querySelectorAll(".bar");
    if (bars[dropIndex]) bars[dropIndex].classList.add("over");
  }
});

barContainer.addEventListener("drop", (e) => {
  if (!running || paused) return;
  e.preventDefault();

  const dropIndex = getDropIndex(e.clientX);
  if (dropIndex === null) return;
  if (draggedIndex === null) return;

  const mode = modeSelect.value;

  if (mode === "swap") {
    // 交换模式
    if (dropIndex === draggedIndex) return;

    [values[draggedIndex], values[dropIndex]] = [values[dropIndex], values[draggedIndex]];
  } else if (mode === "insert") {
    // 插入模式
    if (dropIndex === draggedIndex || dropIndex === draggedIndex + 1) {
      insertLine.style.opacity = "0";
      return;
    }

    const item = values.splice(draggedIndex, 1)[0];

    let insertIndex = dropIndex;
    if (draggedIndex < dropIndex) insertIndex--;

    values.splice(insertIndex, 0, item);
  }

  draggedIndex = null;
  insertLine.style.opacity = "0";

  renderBars();
});

/* ===== 计时器 ===== */
function startTimer() {
  clearInterval(timerInterval);

  startTime = performance.now();
  timerInterval = setInterval(() => {
    const now = performance.now();
    const elapsed = elapsedBeforePause + (now - startTime) / 1000;
    timeDisplay.textContent = elapsed.toFixed(2);
  }, 30);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function pauseTimer() {
  if (!running) return;

  const now = performance.now();
  elapsedBeforePause += (now - startTime) / 1000;
  stopTimer();
}

/* ===== 游戏控制 ===== */
function startGame() {
  // 暂停中点击开始 = 继续
  if (running && paused) {
    paused = false;
    pauseBtn.textContent = "暂停";
    gameStatus.textContent = "继续排序中...";
    startTimer();
    renderBars();
    return;
  }

  // 新游戏
  const count = Number(barCountSelect.value);
  generateValues(count);

  elapsedBeforePause = 0;
  timeDisplay.textContent = "0.00";

  running = true;
  paused = false;

  renderBars();

  startTimer();
  pauseBtn.textContent = "暂停";
  gameStatus.textContent = "开始排序吧！（从小到大）";
}

function pauseGame() {
  if (!running) return;

  if (!paused) {
    paused = true;
    pauseTimer();
    pauseBtn.textContent = "继续";
    gameStatus.textContent = "⏸ 已暂停";
  } else {
    paused = false;
    startTimer();
    pauseBtn.textContent = "暂停";
    gameStatus.textContent = "继续排序中...";
  }

  renderBars();
}

function resetGame() {
  running = false;
  paused = false;

  stopTimer();
  elapsedBeforePause = 0;

  values = [];
  draggedIndex = null;

  barContainer.innerHTML = "";
  timeDisplay.textContent = "0.00";
  pauseBtn.textContent = "暂停";

  insertLine.style.opacity = "0";
  gameStatus.textContent = "已重置，请点击开始生成新数据";
}

function checkSorted() {
  if (!running || paused) return;

  for (let i = 0; i < values.length - 1; i++) {
    if (values[i] > values[i + 1]) {
      gameStatus.textContent = "继续排序中...";
      return;
    }
  }

  running = false;
  stopTimer();
  pauseBtn.textContent = "暂停";
  gameStatus.textContent = `🎉 排序成功！用时 ${timeDisplay.textContent}s`;

  renderBars();
}

/* ===== 绑定按钮 ===== */
startBtn.addEventListener("click", startGame);
pauseBtn.addEventListener("click", pauseGame);
restartBtn.addEventListener("click", resetGame);

/* ===== 初始化 ===== */
resetGame();