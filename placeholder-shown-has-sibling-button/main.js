const input = document.querySelector(`.input`);

document.querySelector(`.button`).addEventListener(`click`, () => {
  input.value = ``;
  input.focus();
});
