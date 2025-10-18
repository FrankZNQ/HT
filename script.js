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
    title: "时间旅程",
    section1: "你曾经好奇，时间是怎样流逝的吗？",
    section2: "每一天都像是一颗沙粒，悄然堆积。",
    section3: "有时你会停下，回望那一路走来的足迹。",
    section4: "直到此刻，你已经在这个世界上存在了多久？",
    calculator: "计算你来到这个世界的天数",
    resultPrefix: "你来到这个世界上已经",
    resultSuffix: "天。",
    placeholderYear: "年",
    placeholderMonth: "月",
    placeholderDay: "日",
    confirm: "确认",
    delete: "删除",
    invalidInput: "请完整输入有效的 年 / 月 / 日。",
    futureDate: "这个日期还没到呢！"
  },
  en: {
    title: "Journey of Time",
    section1: "Have you ever wondered how time flows?",
    section2: "Every day is like a grain of sand, quietly piling up.",
    section3: "Sometimes you pause to look back at your path.",
    section4: "Until this moment, how long have you been in this world?",
    calculator: "Calculate how many days you have lived",
    resultPrefix: "You have been in this world for",
    resultSuffix: "days.",
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
  document.getElementById("section1").textContent = texts[currentLang].section1;
  document.getElementById("section2").textContent = texts[currentLang].section2;
  document.getElementById("section3").textContent = texts[currentLang].section3;
  document.getElementById("section4").textContent = texts[currentLang].section4;
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


