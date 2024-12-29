// Create a map of all cells and their index
const cells = new Map();
document.querySelectorAll(".cell").forEach((element) => {
  cells.set(element.getAttribute("data-index"), element);
});

// When the grid or a cell is clicked
document.querySelector(".grid").addEventListener("click", (event) => {
  // Remove any previous animations
  cells.forEach((cell) => {
    cell.classList.remove("animate");
    cell.style.setProperty("--delay", "0");
  });

  requestAnimationFrame(() => {
    // Get the cell
    const key = event.target.getAttribute("data-index");
    const cell = cells.get(key);
    if (!cell) return;

    // Prep your maths
    const keyNumber = Number(key);
    const leftBoundary = keyNumber - (keyNumber % 8);
    const rightBoundary = leftBoundary + 8 - 1;
    const xNeighbours = [-1, 1];
    const yNeighbours = [-8, 8];
    const delayAmount = 0.1;
    let xDelay = delayAmount;
    let yDelay = delayAmount;

    // Let's go
    cell.classList.add("animate");

    // These two while loops should be a function but who's got the time to DRY
    while (xNeighbours.length) {
      const offset = xNeighbours.shift();
      const neighbourIndex = `${offset + Number(key)}`;

      // Make sure you don't break on to the next row
      if (neighbourIndex <= rightBoundary && neighbourIndex >= leftBoundary) {
        const neighbour = cells.get(neighbourIndex);

        if (neighbour) {
          neighbour.style.setProperty("--delay", `${xDelay}s`);
          xDelay = xDelay + delayAmount;
          neighbour.classList.add("animate");

          // Stack the next neighbour
          xNeighbours.push(offset > 0 ? offset + 1 : offset - 1);
        }
      }
    }

    while (yNeighbours.length) {
      const offset = yNeighbours.shift();
      const neighbourIndex = `${offset + Number(key)}`;

      if (neighbourIndex <= cells.size && neighbourIndex >= 0) {
        const neighbour = cells.get(neighbourIndex);

        if (neighbour) {
          neighbour.style.setProperty("--delay", `${yDelay}s`);
          yDelay = yDelay + delayAmount;
          neighbour.classList.add("animate");
          yNeighbours.push(offset > 0 ? offset + 8 : offset - 8);
        }
      }
    }
  });
});

