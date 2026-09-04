import buildDom from "./buildDom.js";
import { checkTrial } from "./checkTrial_Win.js";
import { reset, showWarning } from "./showResult.js";
import { trialWord } from "./checkLetter.js";

let allWords = [];
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
const checkBtn = document.getElementsByClassName("check")[0];
function checkWord(){
  if(allWords.includes(trialWord(trial))){
    checkTrial(correctWord, trial);
    trial++;
  } else if(checkBtn.previousElementSibling.tagName !== "P"){
    showWarning();
  }
  checkBtn.disabled = true;
}

// Handle playing Again
let playAgain = document.querySelector("#result button");
playAgain.addEventListener("click", () => {
  reset();
  trial = 1;
  correctWord = randomWord();
  confetti.stop();
});

export { checkWord };