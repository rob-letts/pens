// Setup
const sliders = document.querySelectorAll("input[type=range]");
const [sliderOne, sliderTwo] = sliders;
const sliderMaxValue = sliderOne.max;
const sliderTrack = document.querySelector(".track");

sliders.forEach(item => {
  item.addEventListener("input", () => updateSlider(item.id));
});

init();

// Functions
function init() {
  updateSlider(sliderOne.id);
  updateSlider(sliderTwo.id);
}

function updateSlider(id) {
  const sliderOneValue = parseInt(sliderOne.value);
  const sliderTwoValue = parseInt(sliderTwo.value);
  const isRangeOverlap = sliderTwoValue <= sliderOneValue;
  const isLeftThumb = id === "left-thumb";

  if (isRangeOverlap) {
    if (isLeftThumb) {
      sliderOne.value = sliderTwoValue;
      const isMaxBoundary = sliderTwoValue === 100;

      if (isMaxBoundary) {
        handleOverlap(sliderOne, sliderTwo);
      } else {
        // reset overlap to prioritise slider one over slider two
        handleOverlap(sliderTwo, sliderOne);
      }
    } else {
      sliderTwo.value = sliderOneValue;
      const isMinBoundary = sliderOneValue === 0;

      if (isMinBoundary) {
        handleOverlap(sliderTwo, sliderOne);
      }
    }
  }

  fillColor();
}

function handleOverlap(lowerSlider, upperSlider) {
  lowerSlider.style.setProperty('z-index', 2);
  upperSlider.style.setProperty('z-index', 1);
}

function fillColor() {
  const valueOne = (sliderOne.value / sliderMaxValue) * 100;
  const valueTwo = (sliderTwo.value / sliderMaxValue) * 100;
  const trackBackground = "#dadae5";
  const trackForeground = "#3264fe";

  sliderTrack.style.background = `linear-gradient(to right,
      ${trackBackground} ${valueOne}%,
      ${trackForeground} ${valueOne}%,
      ${trackForeground} ${valueTwo}%,
      ${trackBackground} ${valueTwo}%
    )`;
}