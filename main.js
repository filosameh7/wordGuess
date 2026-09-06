import buildDom from "./src/buildDom.js";
import { checkTrial } from "./src/checkTrial&Win.js";
import { reset, showWarning } from "./src/showResult&reset.js";
import { trialWord } from "./src/checkLetter.js";
import { giveHint, resetHintButton } from "./src/giveHint.js";

let allWords = [];
let hints = 2;
let trial = 1;
const trials = 5;
const letters = 5;
let correctWord = "";
let url =
  "https://raw.githubusercontent.com/darkermango/5-Letter-words/main/words.txt";

function randomWord() {
  return allWords[Math.trunc(Math.random() * allWords.length)];
}

// Fetching Words
let fetchWords = async () => {
  const res = await fetch(url);
  const data = await res.text();

  allWords = data.split("\r\n").map((word) => word.toUpperCase());

  correctWord = randomWord();
};

fetchWords();

// Building DOM
buildDom(trials, letters);

// check each trial call
const myBtns = document.getElementsByClassName("buttons")[0];
const checkBtn = document.querySelector(".check");
function checkWord() {
  if (allWords.includes(trialWord(trial))) {
    checkTrial(correctWord, trial);
    trial++;
    if (hints !== 0) 
      myBtns.lastElementChild.disabled = false;
  } else if (myBtns.previousElementSibling.tagName !== "P") {
    showWarning(trial);
  }
  checkBtn.disabled = true;
}

// Hint
const hintBtn = myBtns.lastElementChild;
hintBtn.addEventListener("click", () => {
  hints--;
  giveHint(trial, hints, correctWord);
});

// Handle playing Again
let playAgain = document.querySelector("#result button");
playAgain.addEventListener("click", () => {
  reset();
  trial = 1;
  correctWord = randomWord();
  confetti.stop();
  hints = 2;
  resetHintButton(hints);
});

// Enter = checkWord (UserFriendly)
document.addEventListener("keydown", (event) => {
  let lastInput = document.querySelector(`#trial-${trial} #letter-${letters}`);
  if (event.key === "Enter" && lastInput.value !== "") {
    checkWord();
  }
});

export { checkWord };
