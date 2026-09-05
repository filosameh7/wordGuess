import { checkExistence, checkPlace } from "./checkLetter.js";
import { enableInput } from "./control_Input.js";
import { showMsg } from "./showResult&reset.js";

function checkTrial(correctWord, trial) {
  let currentTrial = document.getElementById(`trial-${trial}`);
  let correctOne = correctWord;
  let correctLetters = 0;
  let lettersArr = Array.from(currentTrial.children);
  for (let input of lettersArr) {
    if (input.id === "letter-5") {
      input.classList.add("done");
      input.disabled = true;
    }
    let i = +input.id.split("-")[1];
    correctOne = checkPlace(input, i - 1, correctOne);
    if (Array.from(input.classList).includes("green")) correctLetters++;
  }
  for (let input of lettersArr) {
    if (!Array.from(input.classList).includes("green"))
      correctOne = checkExistence(input, correctOne);
  }
  let time = 0;
  if (trial === 5) {
    time = 200;
  }
  setTimeout(() => {
    checkWin(correctLetters, trial, correctWord);
  }, time);
}

function checkWin(correctLetters, trial, correctWord) {
  if (correctLetters === 5) {
    showMsg(`Congratulations! You Won`);
    confetti.start();
  } else if (trial !== 5) {
    enableInput(document.getElementById(`trial-${trial + 1}`).firstChild);
  } else {
    showMsg(
      `No Problem! Try Again<br>The Correct Word is <span style="color:green">${correctWord}</span>`,
    );
  }
}

export { checkTrial, checkWin };
