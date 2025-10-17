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

document.getElementById("confirm").addEventListener("click", () => {
  const y = parseInt(document.getElementById("year").value, 10);
  const mInput = parseInt(document.getElementById("month").value, 10);
  const d = parseInt(document.getElementById("day").value, 10);
  const m = isNaN(mInput) ? NaN : (mInput - 1); // 月份转为 0-11

  const calculator = document.querySelector(".calculator-section");
  const header = calculator.querySelector("h2");
  const dateInputs = calculator.querySelector(".date-inputs");
  const buttonsDiv = calculator.querySelector(".buttons");
  const resultBox = document.getElementById("result-container");
  const resultText = document.getElementById("result");

  // 基本验证
  if (isNaN(y) || isNaN(m) || isNaN(d)) {
    resultText.textContent = "请完整输入有效的 年 / 月 / 日。";
    resultBox.style.opacity = 1;
    return;
  }

  const birth = new Date(y, m, d);
  const now = new Date();
  const diff = Math.floor((now - birth) / (1000 * 60 * 60 * 24));

  if (diff < 0) {
    resultText.textContent = "这个日期还没到呢！";
    resultBox.style.opacity = 1;
    return;
  }

  // 1) 对“输入区（标题、输入、按钮）”分别添加淡出类（不会影响父容器）
  header.classList.add("fade-out");
  dateInputs.classList.add("fade-out");
  buttonsDiv.classList.add("fade-out");

  // 2) 等动画完成后，彻底隐藏输入区并显示结果（在同一位置淡入）
  setTimeout(() => {
    header.style.display = "none";
    dateInputs.style.display = "none";
    buttonsDiv.style.display = "none";

    resultText.textContent = `你来到这个世界上已经 ${diff} 天。`;
    resultBox.style.opacity = 1;

    // 可选：让父容器恢复为普通状态（如果之前有其他全局样式）
    calculator.classList.remove("fade-out");
  }, 800);
});
