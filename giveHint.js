import { enableInput } from "./control_Input.js";

export default function giveHint(trial, hints, correctWord) {
  let trialLetters = Array.from(
    document.getElementById(`trial-${trial}`).children,
  );
  for (let i = 0; i < trialLetters.length; i++) {
    let inputClasses = Array.from(trialLetters[i].classList);
    if (!inputClasses.includes("disableIt") && !inputClasses.includes("done")) {
      trialLetters[i].value = correctWord[i];
      if (i < 4) {
        trialLetters[i].disabled = true;
        trialLetters[i].classList.add("done");
        enableInput(trialLetters[i].nextElementSibling);
      } else if (i === 4) 
        checkBtn.disabled = false;
      break;
    }
  }
  const hintBtn = document.getElementsByClassName("hint")[0];
  hintBtn.textContent = `${hints} Hint`;
  if (hints === 0) 
    hintBtn.disabled = true;
}