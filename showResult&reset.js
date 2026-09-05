import { disableInput, enableInput } from "./control_Input.js";

function showMsg(message) {
  let resultCont = document.getElementById("result-cont");
  let myP = resultCont.firstElementChild.firstElementChild;
  myP.innerHTML = message;
  resultCont.style.display = "flex";
  document.body.style.position = "relative";
}

function reset() {
  let resultCont = document.getElementById("result-cont");
  let lettersBoxes = document.getElementsByClassName("lettersBox");
  resultCont.style.display = "none";
  for (let lettersBox of lettersBoxes) {
    for (let myInput of lettersBox.children) {
      myInput.classList = [];
      myInput.value = "";
      if (lettersBox.id === "trial-1" && myInput.id === "letter-1") {
        enableInput(myInput);
      } else {
        disableInput(myInput);
      }
    }
  }
}

function showWarning(trial) {
  const myBtns = document.getElementsByClassName("buttons")[0];
  console.log(myBtns);
  let warning = document.createElement("p");
  warning.textContent = "Word Doesn't Exist!";
  warning.classList.add("warning");
  document.getElementsByClassName("trials")[0].insertBefore(warning, myBtns);
  document
    .getElementById(`trial-${trial}`)
    .lastElementChild.addEventListener("keydown", (event) => {
      if (
        event.key === "Backspace" &&
        myBtns.previousElementSibling.tagName === "P"
      )
        myBtns.previousElementSibling.remove();
    });
}

export { showMsg, reset, showWarning };
