import { disableInput,enableInput } from "./control_Input.js";
import { checkWord } from "./main.js";

export default function buildDom(trials, letters) {
  let trialsCont = document.getElementsByClassName("trials")[0];

  let checkBtn = document.createElement("button");
  checkBtn.textContent = "Check Word";
  checkBtn.classList.add("check");
  checkBtn.disabled = true;
  checkBtn.addEventListener("click", () => checkWord());

  for (let i = 0; i < trials; i++) {
    let myDiv = document.createElement("div");
    myDiv.classList.add("trialbox");

    let myP = document.createElement("p");
    myP.textContent = `Try ${i + 1}`;
    myP.classList.add("label");
    myDiv.appendChild(myP);

    let lettersDiv = document.createElement("div");
    lettersDiv.classList.add("lettersBox");
    lettersDiv.id = `trial-${i + 1}`;

    for (let j = 0; j < letters; j++) {
      let myInput = document.createElement("input");
      myInput.setAttribute("maxlength", 1);
      myInput.id = `letter-${j + 1}`;
      if (j !== 0) {
        myInput.addEventListener("keydown", (event) => {
          if (event.key === "Backspace" && event.target.value === "") {
            enableInput(myInput.previousElementSibling);
            myInput.previousElementSibling.value = "";
            disableInput(myInput);
            myInput.classList.remove("done");
          }
        });
      }
      if (j !== letters - 1) {
        myInput.addEventListener("keydown", (event) => {
          if (event.key === "Enter" && event.target.value !== "") {
            enableInput(myInput.nextElementSibling);
          }
        });
      } else {
        document.addEventListener("keydown", (event) => {
          if (event.key === "Enter" && event.target.value !== "") {
            checkWord();
          }
        });
      }

      myInput.addEventListener("input", () => {
        if (!/[a-z]|[A-Z]/.test(myInput.value)) myInput.value = "";
        else {
          myInput.value = myInput.value.toUpperCase();
          if (j !== letters - 1) {
            myInput.disabled = true;
            myInput.classList.add("done");
            enableInput(myInput.nextElementSibling);
          }
        }
        if (j === letters - 1) {
          if (myInput.value !== "") 
            checkBtn.disabled = false;
          else checkBtn.disabled = true;
        }
      });
      if (i !== 0 || j !== 0) {
        disableInput(myInput);
      }
      lettersDiv.appendChild(myInput);
    }

    myDiv.appendChild(lettersDiv);

    trialsCont.appendChild(myDiv);
  }
  trialsCont.appendChild(checkBtn);
}