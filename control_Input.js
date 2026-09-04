function enableInput(input) {
  input.disabled = false;
  input.classList.remove("disableIt");
  input.focus();
}

function disableInput(input) {
  input.disabled = true;
  input.classList.add("disableIt");
}

export {enableInput, disableInput};