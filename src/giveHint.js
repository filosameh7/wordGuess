import { enableInput } from "./control_Input.js";

function giveHint(trial, hints, correctWord) {
  const hintBtn = document.getElementsByClassName("hint")[0];
  let trialLetters = Array.from(
    document.getElementById(`trial-${trial}`).children,
  );
  for (let i = 0; i < trialLetters.length; i++) {
    let inputClasses = Array.from(trialLetters[i].classList);
    if (inputClasses.length === 0) {
      trialLetters[i].value = correctWord[i];
      if (i < 4) {
        trialLetters[i].disabled = true;
        trialLetters[i].classList.add("done");
        enableInput(trialLetters[i].nextElementSibling);
      } else if (i === 4) {
        hintBtn.previousElementSibling.disabled = false;
        hintBtn.disabled = true;
      }
      break;
    }
  }
  hintBtn.textContent = `${hints} Hint`;
  if (hints === 0) 
    hintBtn.disabled = true;
}

function resetHintButton(hints){
  const hintBtn = document.getElementsByClassName("hint")[0];
  hintBtn.textContent = `${hints} Hints`;
  hintBtn.disabled = false;
}

export {resetHintButton , giveHint};