function checkPlace(input, i, correctOne) {
  input.classList.remove("done");
  if (input.value === correctOne[i]) {
    input.classList.add("green");
    correctOne = correctOne.replace(correctOne[i], ",");
  }
  return correctOne;
}

function checkExistence(input, correctOne) {
  if (correctOne.includes(input.value)) {
    input.classList.add("orange");
    correctOne = correctOne.replace(
      correctOne[correctOne.indexOf(input.value)],
      ",",
    );
  } else input.classList.add("wrong");
  return correctOne;
}

function trialWord(trial) {
  let word = "";
  let currentTrial = document.getElementById(`trial-${trial}`);
  let lettersArr = Array.from(currentTrial.children);
  for (let input of lettersArr) {
    word += input.value;
  }
  return word;
}

export { checkPlace, checkExistence, trialWord };
