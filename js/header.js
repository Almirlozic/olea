const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu");
const header = document.querySelector(".header");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  menu.classList.toggle("active");
});

let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  // Hvis man scroller ned → skjul headeren
  if (currentScroll > lastScroll && currentScroll > 80) {
    header.classList.remove("show");
    header.classList.add("hide");
  }
  // Hvis man scroller op → vis headeren
  else if (currentScroll < lastScroll) {
    header.classList.remove("hide");
    header.classList.add("show");
  }

  lastScroll = currentScroll;
});

// Sørg for header starter synlig
header.classList.add("show");
