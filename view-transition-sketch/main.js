const heading = document.querySelector("h1");
const button = document.querySelector("button");

button.addEventListener("click", () => {
  document.startViewTransition(() => {
    const isHello = heading.textContent.toLowerCase() === "hello"
    heading.textContent = isHello ? "World" : "Hello";
  });
});
