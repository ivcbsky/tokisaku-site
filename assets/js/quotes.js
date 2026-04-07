
    /* ===============================
   Side Quotes (三体语录左右显示)
=============================== */

const leftQuoteEl = document.getElementById("leftQuote");
const rightQuoteEl = document.getElementById("rightQuote");

/* 此处为科幻小说三体中的语录 供页面两旁随机显示 点击可切换
  还加了特殊特效*/
  const threeBodyQuotes = [
  "宇宙就是一座黑暗森林，每个文明都是带枪的猎人。",
  "在这片森林中，他人就是地狱，就是永恒的威胁。",
  "任何暴露自己存在的生命都将很快被消灭。",
  "毁灭你，与你有何相干？",
  "藏好自己，做好清理。",
  "斩尽杀绝，这是对一个文明最高的重视。",
  "生存是文明的第一需要。",
  "文明不断增长和扩张，但宇宙中的物质总量保持不变。",
  "光锥之内就是命运。",
  "把海弄干的鱼在海干前上了陆地，从一片黑暗森林奔向另一片黑暗森林。",
  "不要回答！不要回答！！不要回答！！！",
  "宇宙也曾光明过，创世大爆炸后不久，一切物质都以光的形式存在。",
  "在宇宙中，你再快都有比你更快的，你再慢也有比你更慢的。",
  "在疯狂面前，理智是软弱无力的。",
  "宇宙不是童话。",
  "主不在乎。",
  "给岁月以文明，而不是给文明以岁月。",
  "黑暗是生命和文明之母。",
  "在宇宙间，一个技术文明等级的重要标志，是它能够控制和使用的微观维度。",
  "弱小和无知，不是生存的障碍，傲慢才是。",
  "你的无畏来源于无知。",
  "自以为历尽沧桑，其实刚蹒跚学步。",
  "没有什么能永远存在，即使是宇宙也有灭亡的那一天。",
  "生存本来就是一种幸运。",
  "仅靠生存本身是不能保证生存的，发展是生存的最好保障。",
  "你们是虫子！",
  "虫子从来就没有被真正战胜过。",
  "把人类看做虫子的三体人似乎忘记了一个事实：虫子从来没有被战胜过。",
  "人类不感谢罗辑。",
  "大多数人到死都没有向尘世之外瞥一眼。",
  "在中国，任何超脱飞扬的思想都会砰然坠地的，现实的引力太沉重了。",
  "城市就是森林，每一个男人都是猎手，每一个女人都是陷阱。",
  "我们不知道外星文明是什么样子，但知道人类。",
  "孩子们啊，我这两个世纪前的人了，现在居然还能在大学里教物理。",
  "不理睬是最大的轻蔑。",
  "人类文明，终于在自己的内部孕育出了强大的异化力量。",
  "人类真正的道德自觉是不可能的。",
  "在派出这个人之前，必须杀死他（她）。",
  "当人类真正流落太空时，极权只需五分钟。",
  "失去人性，失去很多；失去兽性，失去一切。",
  "“我选择人性。”——程心",
  "前进！前进！不择手段的前进！",
  "你们认为没有路，是因为没有学会不择手段。",
  "我爱你，与你有何相干？",
  "没关系的，都一样。",
  "给时光以生命，给岁月以文明。",
  "如果千秋功罪真是有人评说，现在已经可以派一个人去解释岁月造成的误会。",
  "这是人类的落日。",
  "活着本身就很美妙。",
  "人生苦短，少做些虚无缥缈的事。",
  "如果全人类都不幸福，我们能幸福吗？",
  "这是计划的一部分。",
  "成吉思汗的骑兵，攻击速度与二十世纪的装甲部队相当。",
  "自然选择，前进四。",
  "面壁者罗辑，我是你的破壁人。",
  "我是个小人物，生活在社会最底层。",
  "孩子，看看你干了什么？",
  "只有这个选择，人是大写的。",
  "死亡是唯一一座永远亮着的灯塔。",
  "一切都会逝去，只有死神永生。",
  "唯一不可阻挡的是时间。",
  "记忆是一条早已干涸的河流。",
  "把字刻在石头上。",
  "文明像一场五千年的狂奔。",
  "这一刻，沧海桑田。",
  "生命是一手同花顺，一洗什么都没了。",
  "在这寒冷无际的草原间，燃烧是无意义的。",
  "死亡不是你的敌人，永恒才是。",
  "既然太阳已经落下去了，我们就在黑暗中做梦吧。",
  "我们都是阴沟里的虫子,但总还是得有人仰望星空。",
  "我有一个梦，也许有一天，灿烂的阳光能照进黑暗森林。",
  "“太阳快落下去了，你们的孩子居然不害怕？”“当然不害怕，她知道明天太阳还会升起来的。”",
  "来了，爱了，给了她一颗星星，走了。",
  "宇宙很大，生活更大，也许以后我们还有缘相见。",
  "不要返航，这里不是家！",
  "妈妈，我将变成一只萤火虫。",
  "如果我真的能够拯救一个自己爱上的遥远的美丽世界，那这一辈子至少没有白活。",
  "没有救世的能力不是你的错，但给世界以希望后又打碎它就是一种不可饶恕的罪恶了。",
  "爱是没错的，一个人不可能毁灭一个世界。",
  "如果大山不会走向穆罕穆德，穆罕穆德可以走向大山。",
  "我没有太多要说的，只有一个警告：生命从海洋登上陆地是地球生物进化的一个里程碑，但那些上岸的鱼再也不是鱼了；同样，真正进入太空的人，再也不是人了。",
  "所有的部落都已消失，所有的长矛都已折断。",
  "物理学从来就没有存在过，将来也不会存在。",
  "是的，整个人类历史也是偶然。",
  "大自然真是自然的吗？",
  "空不是无，空是一种存在，你得用空这种存在填满自己。",
  "越透明的东西越神秘。",
  "上帝是个无耻的老赌徒，他抛弃了我们！",
  "射手和农场主假说。",
  "在每一个历史断面上，你都能找到一大堆丢失的机遇。",
  "真那样的话，你仍然很幸运，大多数人，到死都没向尘世之外瞥一眼。",
  "通过忠实地映射宇宙来隐藏自我，是融入永恒的唯一途径。",
  "科学在宇宙面前，只是摇篮里的婴儿。",
  "宇宙的熵在升高，有序度在降低。",
  "不要轻视简单，简单意味着坚固。",
  "一切的一切都导向这样一个结果。",
  "在意义之塔上，生存高于一切。",
  "粮食？这不都是粮食？每个人看看你们的周围，都是粮食，活生生的粮食。",
  "孩子，人做过的，神都记着。",
  "那个篝火余烬旁的孩子，由外向乐观变得孤僻自闭了。",
  "你看看，在那样的时代，他们依然有这样的志向。",
  "先生，我想掩盖对您的鄙视，但我做不到。",
  "要知道，一个文学人物十分钟的行为，可能是她十年的经历的反映。",
  "如果文明需要牺牲，那么我们就做那个牺牲者。",
  "不是的，大部分人的爱情对象也只是存在于自己的想象之中。",
  "这是人类面临的最大危机，也是最大的机遇。",
  "既来之则安之，这句古老的箴书好像很有道理。",
  "你们好，我回来了。",
  "我不知道，你们是虫子！",
  "失去一切，失去包括我们在内的人类现在的一切。",
  "其实，你到了我这个年纪，就会发现当年以为天要塌下来的那些大事，其实没有什么的。",
  "没有永恒的敌人或同志，只有永恒的责任。",
  "不，别说在哪儿！一知道在哪儿，世界就变得像一张地图那么小了。",
  "面对冷酷的宇宙，任何温情脉脉都是致命的。",
  "在这个宇宙中，要想生存下去，既需要隐藏自己，也需要清理别人。",
  "在宇宙的舞台上，文明不过是一闪而过的火花。",
  "你的心中没有女人，所以才能容下整个宇宙。",
  "宇宙的物竞天择已经到了这种时刻，在宇宙的战场上，如果人类失败，其后果远比一个地球国家的胜利或失败要严重的多。",
  "我们就像无知的孩子，点燃了一堆篝火，还在高喊着我在这，我在这……",
  "人类能够延续到今天，纯粹是偶然。",
  "文明的轨迹从一条小小的青铜手柄开始。",
  "文明的灭绝是正常的，文明的存在是偶然的。",
  "在这文明的尽头，他们也只能做远古的婴儿时代做过的事，把字刻在石头上。",
  "博物馆是给人看的，墓碑是给自己建的。",
  "没有不散的宴席，一切都有个尽头。",
  "文明的这种长大，是一种像胎儿臃肿的畸变。",
  "也许人类文明就此终结，也许以后还有缘相见。",
  "人类社会的这种变化，像是一个女人的蜕变。",
  "我正变成死亡，世界的毁灭者。",
  "黑，真他妈的黑啊。",
  "已阅，狗屁不通！",
  "傻孩子们，快跑啊！",
  "消灭人类暴政，世界属于三体。",
  "只送大脑。",
  "像坟墓一样简洁。",
  "碑是那么小，与其说是为了纪念，更像是为了忘却。",
  "在银河系猎户旋臂的漫漫长夜中，有两颗文明的流星划过，宇宙记住了他们的光芒。",
  "我爱她，与她何干？",
  "有时候，你会在一个瞬间明白一切。",
  "人类一思考，上帝就发笑。",
  "从成为军人的那一刻起，我就准备好了去任何地方。",
  "有时候，生命真的比一粒尘埃还要轻。",
  "把海弄干的鱼在海干前上了陆地，从一片黑暗森林奔向另一片黑暗森林。",
  "在四维空间里，三维世界的一切都暴露无遗。",
  "它们是来自四维世界的魔戒。",
  "快离开水洼，你们是薄薄的画儿。",
  "给我一块二向箔，清理用。",
  "在二维化的太阳系中，地球和人类变成了一幅画。",
  "太阳系如一张二维的画一般，没有厚度。",
  "三维空间向二维的跌落，永远无法逆转。",
  "他们从四维空间奔向了三维空间。",
  "降维打击，是宇宙中最残酷的战争形式。",
  "宇宙的田园时代已经远去。",
  "最终的胜利者，属于能够在低维度生存的文明。",
  "万有引力号追逐着蓝色空间号，误入了四维空间的碎片。",
  "这里是墓地，是四维世界的墓地。",
  "因为海干了，所以鱼儿就要聚集在水洼里。",
  "宇宙正在死去，就像一片慢慢干涸的海洋。",
  "我们是薄薄的画儿，正在被风吹干。",
  "整个宇宙将为你闪烁。",
  "宇宙是丰富多彩的，各种各样的生命都有。",
  "北海，我只能告诉你那以前要多想。",
  "逃离是事实，但我没有背叛。",
  "青铜时代呼叫蓝色空间，不要返航！",
  "孩子们，走好。",
  "小女孩，你看，我遵守了诺言。"
];

/* 关键词池：会随机挑一个加粗放大 */
const keywords = [
  "宇宙", "黑暗森林", "文明", "生存", "命运", "时间", "死亡",
  "虫子", "太阳系", "四维", "降维", "永恒", "清理", "暴露"
];

/* 根据字数自动缩放字体 */
function getFontSizeByLength(text) {
  const len = text.length;

  if (len <= 12) return "26px";
  if (len <= 20) return "22px";
  if (len <= 32) return "20px";
  if (len <= 45) return "18px";
  if (len <= 60) return "16px";
  return "14px";
}

/* 随机抽一句 */
function getRandomQuote() {
  return threeBodyQuotes[Math.floor(Math.random() * threeBodyQuotes.length)];
}

/* 自动强调关键词：随机挑一个关键词，如果句子里存在，就替换成 strong */
function highlightKeyword(text) {
  // 打乱关键词顺序
  const shuffled = [...keywords].sort(() => Math.random() - 0.5);

  for (let key of shuffled) {
    if (text.includes(key)) {
      return text.replace(key, `<strong>${key}</strong>`);
    }
  }

  // 如果没有关键词，就随机强调句子中的一个词（简单做法：强调前4个字）
  if (text.length >= 4) {
    const part = text.slice(0, 4);
    return text.replace(part, `<strong>${part}</strong>`);
  }

  return text;
}

/* 设置某一侧句子 */
function setSideQuote(element, text) {
  element.style.fontSize = getFontSizeByLength(text);
  element.innerHTML = highlightKeyword(text);
}

/* 刷新动画：点击哪侧就刷新哪侧 */
/* ===============================
   打字机效果：逐字渲染 HTML
=============================== */
function tokenizeHTML(html) {
  return html.match(/(<[^>]+>|[^<]+)/g) || [];
}

function randomNoiseChar() {
  const pool = "█▓▒░<>/\\|#@*&$%!?01△◇◆○●◎※";
  return pool[Math.floor(Math.random() * pool.length)];
}

function makeNoise(text, strength = 1) {
  let out = "";
  for (let c of text) {
    if (c === " " || c === "\n") {
      out += c;
      continue;
    }
    if (Math.random() < strength) out += randomNoiseChar();
    else out += c;
  }
  return out;
}

async function decodeTypeWriter(element, htmlText, options = {}) {
  const speed = options.speed ?? 26;
  const glitchTime = options.glitchTime ?? 420;
  const stabilizeSteps = options.stabilizeSteps ?? 7;
  const stabilizeDelay = options.stabilizeDelay ?? 90;

  const tokens = tokenizeHTML(htmlText);

  element.innerHTML = "";

  // 初始：强噪声
  let pureText = tokens.filter(t => !t.startsWith("<")).join("");
  element.innerHTML = makeNoise(pureText, 1);

  await new Promise(r => setTimeout(r, glitchTime));

  // 稳定阶段
  for (let i = 0; i < stabilizeSteps; i++) {
    const strength = 1 - (i + 1) / stabilizeSteps;
    element.innerHTML = makeNoise(pureText, strength * 0.9);
    await new Promise(r => setTimeout(r, stabilizeDelay));
  }

  // 正式逐字解码（支持 strong）
  element.innerHTML = "";

  for (let token of tokens) {
    if (token.startsWith("<")) {
      element.innerHTML += token;
      continue;
    }

    for (let i = 0; i < token.length; i++) {
      element.innerHTML += token[i];

      if (Math.random() < 0.12) {
        const backup = element.innerHTML;
        element.innerHTML = makeNoise(backup, 0.06);
        await new Promise(r => setTimeout(r, 35));
        element.innerHTML = backup;
      }

      await new Promise(r => setTimeout(r, speed));
    }
  }

  element.innerHTML = htmlText;
}

async function refreshSide(element) {
  if (element.dataset.locked === "1") return;
  element.dataset.locked = "1";

  element.classList.add("fadeOut");
  await new Promise((r) => setTimeout(r, 260));

  const newText = getRandomQuote();
  element.style.fontSize = getFontSizeByLength(newText);

  const highlighted = highlightKeyword(newText);

  element.classList.remove("fadeOut");
  element.classList.add("glitchFlash");

  await decodeTypeWriter(element, highlighted, {
    speed: 26,
    glitchTime: 420,
    stabilizeSteps: 7,
    stabilizeDelay: 90
  });

  element.classList.remove("glitchFlash");
  element.dataset.locked = "0";
}

/* 初始化左右各一句 */
setSideQuote(leftQuoteEl, getRandomQuote());
setSideQuote(rightQuoteEl, getRandomQuote());

/* 点击刷新该侧 */
leftQuoteEl.addEventListener("click", () => refreshSide(leftQuoteEl, "left"));
rightQuoteEl.addEventListener("click", () => refreshSide(rightQuoteEl, "right"));
