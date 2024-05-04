const words = document.querySelector(`.words`);

const phrase = `the text will swell and separate and change colour on hover`;

[...phrase].forEach(item => {
  const span = document.createElement(`span`);
  span.innerText = item;
  words.appendChild(span);
});

setInterval(() => {
  document.documentElement.style.setProperty('--text-h', soRandom(360));
}, 2000)

function soRandom(max) {
   return Math.random() * max;
}