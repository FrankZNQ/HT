

// --- 滚动时文字淡入 ---
const sections = document.querySelectorAll(".text-section");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.3 }
);
sections.forEach((sec) => observer.observe(sec));

// --- 计算器逻辑（修正版） ---
let currentInput = null;
const inputs = document.querySelectorAll(".date-inputs input");

inputs.forEach((input) => {
  input.addEventListener("click", () => {
    currentInput = input;
  });
});

document.querySelectorAll(".num").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (currentInput) currentInput.value += btn.textContent;
  });
});

document.getElementById("delete").addEventListener("click", () => {
  if (currentInput) {
    currentInput.value = currentInput.value.slice(0, -1);
  }
});

// --- 动态数字递增函数（缓动） ---


function animateNumber(targetEl, finalValue, duration = 1500) {
  const start = 0;
  const change = finalValue - start - 1826;
  const startTime = performance.now();

  function easeOutQuad(t) {
    return - (t/3 - 1)*(t/3 - 1) + 1; // 缓动公式：从快到慢
  }

    
    
  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 3);
    const easedProgress = easeOutQuad(progress);
    const currentValue = Math.floor(start + change * easedProgress);
    
    const hearttick = Math.log((currentValue)/365)+1/(2*((currentValue)/365))-1/((12*((currentValue)/365))*(12*((currentValue)/365)))+0.57721566;
    let rounded = hearttick.toFixed(4);
    targetEl.textContent = `${texts[currentLang].resultPrefix} ${rounded} ${texts[currentLang].resultSuffix}`;

    if (progress < 3) {
      requestAnimationFrame(update);
    }
                                                         
                                                         
  }

  requestAnimationFrame(update);
}



const texts = {
  zh: {
    title: "心刻",
    section1: "你曾经好奇，时间是怎样流逝的吗？（下划）",
    section2: "我们都认为时间的流动是稳定，线性的<br>明年，与今年相比，是相同的长度<br>同样的365天，8,760小时，31,536,000秒......<br>但事实真的如此吗？",
    section3: "是，也不是。当我们说，一个声音比另一个声音响一倍，后者的能量其实比前者强10倍。<br>当我们说，一束光比另一束光亮一倍，其实后者的通量是前者的4倍......<br>这就是 韦伯-费希纳定律，它指出，外界刺激的强度与我们感受到的心理强度之间的关系，呈对数关系<br>也就是说，只有在外界刺激的强度以比例增加时，我们才能感受到与之前的差别<br>除了视觉与听觉，五感中的触觉，味觉，嗅觉，甚至是情绪，均有这个定律存在",
    section4: "不妨畅想一下，如果「时间」也是这样呢？",
    section5: "让我们把记事起第一年的记忆，当作标准的一年<br>那么第二年在我们的全部记忆中，只会占1/2的长度，也就是说，我们在第二年感受到的时间流动，只有第一年的一半<br>第三年就是1/3，第四年就是1/4......<br>当我们使用这个调和级数来形容感官中的时间，到我们年过八旬，也只不过活了区区五年<br>而在十一岁时，我们就已经过完一半人生了",
    section6: "在这个尺度上，每一段感知的岁月，我称之为「心刻」，唯心的心，时刻的刻<br>若一生只有五心刻，你已经度过了几个？",
    section7: "如果事实真是这样的话<br>当光阴似箭，日月如梭，不再是一句比喻<br>当时间真的在加速<br>你会更加铭记过去，珍惜未来吗？",
    calculator: "你是何时来到这个世界的？",
    resultPrefix: "你已经度过了",
    resultSuffix: "心刻（↓）",
    placeholderYear: "年",
    placeholderMonth: "月",
    placeholderDay: "日",
    confirm: "确认",
    delete: "删除",
    invalidInput: "请完整输入有效的 年 / 月 / 日。",
    futureDate: "这个日期还没到呢！"
  },
  en: {
    title: "Heartmark",
      section1: "Have you ever wondered how time flows? (Scroll down)",
      section2: "We all think the passage of time is steady and linear<br>Next year is the same length as this year<br>The same 365 days, 8,760 hours, 31,536,000 seconds…<br>But is that really the case?",
      section3: "Yes and no. When we say one sound is twice as loud as another, its energy is actually ten times greater.<br>When we say one beam of light is twice as bright as another, its flux is actually four times higher…<br>This is the Weber–Fechner law, which states that the relationship between the intensity of an external stimulus and the psychological strength we perceive is logarithmic<br>In other words, we only notice a difference when the stimulus increases proportionally<br>Beyond sight and hearing, this law applies to touch, taste, smell, and even emotions.",
      section4: "Now, imagine if 'time' worked the same way.",
      section5: "Let’s take the memories of our first year of conscious life as a full year<br>The second year, in the sum of our memories, counts for only half its length —<br>meaning that in the second year, the flow of time feels only half as long as the first<br>The third year is 1/3, the fourth 1/4…<br>Using this harmonic series to describe perceived time, even by our eighties, we have only lived through five years in perception<br>By the age of eleven, we have already passed half of our life in perception.",
      section6: "On this scale, each segment of perceived time I call a 'Heartmark' — heart for mind, mark for moment<br>If a lifetime holds only five Heartmarks, how many have you lived through?",
      section7: "If this were truly the case<br>When time flies, when years slip by like arrows, no longer just a metaphor<br>When time truly accelerates<br>Would you treasure the past more, and cherish the future all the more?",
    calculator: "Calculate how many days you have lived",
    resultPrefix: "You have been in this world for",
    resultSuffix: "Heartmarks（↓）",
    placeholderYear: "Year",
    placeholderMonth: "Month",
    placeholderDay: "Day",
    confirm: "Confirm",
    delete: "Delete",
    invalidInput: "Please enter valid Year / Month / Day.",
    futureDate: "This date hasn’t arrived yet!"
  }
};



let currentLang = "zh";

function switchLanguage() {
  currentLang = currentLang === "zh" ? "en" : "zh";

  document.title = texts[currentLang].title;
  document.getElementById("section1").innerHTML = texts[currentLang].section1;
  document.getElementById("section2").innerHTML = texts[currentLang].section2;
  document.getElementById("section3").innerHTML = texts[currentLang].section3;
  document.getElementById("section4").innerHTML = texts[currentLang].section4;
  document.getElementById("section5").innerHTML = texts[currentLang].section5;
  document.getElementById("section6").innerHTML = texts[currentLang].section6;
  document.getElementById("section7").innerHTML = texts[currentLang].section7;
  document.getElementById("calc-title").textContent = texts[currentLang].calculator;
  document.getElementById("year").placeholder = texts[currentLang].placeholderYear;
  document.getElementById("month").placeholder = texts[currentLang].placeholderMonth;
  document.getElementById("day").placeholder = texts[currentLang].placeholderDay;
  document.getElementById("confirm").textContent = texts[currentLang].confirm;
  document.getElementById("delete").textContent = texts[currentLang].delete;
}

document.getElementById("lang-switch").addEventListener("click", switchLanguage);


// --- 点击确认后的逻辑 ---
document.getElementById("confirm").addEventListener("click", () => {
  const y = parseInt(document.getElementById("year").value, 10);
  const mInput = parseInt(document.getElementById("month").value, 10);
  const d = parseInt(document.getElementById("day").value, 10);
  const m = isNaN(mInput) ? NaN : (mInput - 1);

  const calculator = document.querySelector(".calculator-section");
  const header = calculator.querySelector("h2");
  const dateInputs = calculator.querySelector(".date-inputs");
  const buttonsDiv = calculator.querySelector(".buttons");
  const resultBox = document.getElementById("result-container");
  const resultText = document.getElementById("result");

  if (isNaN(y) || isNaN(m) || isNaN(d)) {
    resultText.textContent = texts[currentLang].invalidInput;
    resultBox.style.opacity = 1;
    return;
  }

  const birth = new Date(y, m, d);
  const now = new Date();
  const diff = Math.floor((now - birth) / (1000 * 60 * 60 * 24));

  if (diff < 0) {
    resultText.textContent = texts[currentLang].futureDate;
    resultBox.style.opacity = 1;
    return;
  }

  // --- 平滑淡出计算器 ---
  [header, dateInputs, buttonsDiv].forEach(el => {
    el.classList.add("fade-out");
  });

  // --- 动画结束后隐藏输入区，显示动态递增结果 ---
  setTimeout(() => {
    [header, dateInputs, buttonsDiv].forEach(el => el.style.display = "none");
    resultBox.style.opacity = 1;
    animateNumber(resultText, diff, 1800); // 1.8 秒动画
  }, 900);
});





