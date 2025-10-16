const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu");
const header = document.querySelector(".header");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  menu.classList.toggle("active");
});
