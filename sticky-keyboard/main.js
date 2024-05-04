const map = new Map();

document.querySelectorAll(".letter").forEach(letter => {
  map.set(letter.textContent, letter);
});

document.addEventListener("transitionend", ({ target }) => {
  target.classList.remove("active");
});

document.addEventListener("keydown", ({ key }) => {
  const letter = map.get(key);
  if (letter) letter.classList.add("active");
});
