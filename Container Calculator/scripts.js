{\rtf1\ansi\ansicpg1252\cocoartf2639
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 document.addEventListener("DOMContentLoaded", function () \{\
  const imperialBtn = document.getElementById("imperial");\
  const metricBtn = document.getElementById("metric");\
  const stackableBtn = document.getElementById("stackable");\
  const nonStackableBtn = document.getElementById("nonStackable");\
  const addBoxBtn = document.getElementById("add-box");\
  const submitBtn = document.getElementById("submit");\
  const boxesContainer = document.getElementById("boxes-container");\
  const results = document.getElementById("results");\
\
  let isImperial = false;\
  let isStackable = true;\
\
  imperialBtn.addEventListener("click", () => \{ imperialBtn.classList.add("active"); metricBtn.classList.remove("active"); isImperial = true; \});\
  metricBtn.addEventListener("click", () => \{ metricBtn.classList.add("active"); imperialBtn.classList.remove("active"); isImperial = false; \});\
  stackableBtn.addEventListener("click", () => \{ stackableBtn.classList.add("active"); nonStackableBtn.classList.remove("active"); isStackable = true; \});\
  nonStackableBtn.addEventListener("click", () => \{ nonStackableBtn.classList.add("active"); stackableBtn.classList.remove("active"); isStackable = false; \});\
\
  addBoxBtn.addEventListener("click", () => \{\
    const boxInput = document.createElement("div");\
    boxInput.className = "box-input";\
    boxInput.innerHTML = `<input type="number" placeholder="Length" min="0" step="0.01" required><input type="number" placeholder="Width" min="0" step="0.01" required><input type="number" placeholder="Height" min="0" step="0.01" required><input type="number" placeholder="Weight" min="0" step="0.01" required><input type="number" placeholder="Quantity" min="1" step="1" value="1" required>`;\
    boxesContainer.appendChild(boxInput);\
  \});\
\
  submitBtn.addEventListener("click", () => \{\
    const boxes = [];\
    for (const boxInput of boxesContainer.children) \{\
      const inputs = boxInput.getElementsByTagName("input");\
      const length = parseFloat(inputs[0].value);\
      const width = parseFloat(inputs[1].value);\
      const height = parseFloat(inputs[2].value);\
      const weight = parseFloat(inputs[3].value);\
      const quantity = parseInt(inputs[4].value);\
\
      for (let i = 0; i < quantity; i++) \{ boxes.push(\{ length, width, height, weight \}); \}\
    \}\
\
    const totalBoxes = boxes.length;\
    const totalLength = boxes.reduce((sum, box) => sum + box.length, 0);\
    const totalWidth = boxes.reduce((sum, box) => sum + box.width, 0);\
    const totalHeight = boxes.reduce((sum, box) => sum + box.height, 0);\
    const totalWeight = boxes.reduce((sum, box) => sum + box.weight, 0);\
\
    const \{ bestContainer, minContainers \} = calculateContainers(totalLength, totalWidth, totalHeight, totalWeight, isStackable, isImperial, totalBoxes);\
    \
    if (bestContainer) \{ results.innerHTML = `You need $\{minContainers\} $\{bestContainer.name\} containers.`; \} else \{ results.innerHTML = "No suitable container found."; \}\
  \});\
\
  addBoxBtn.click();\
\});\
}