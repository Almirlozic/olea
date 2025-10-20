document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("newsletter-popup");
  const closeBtn = document.getElementById("close-popup");

  // Tjek om vi er på index siden
  if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
    // Hvis brugeren ikke har besøgt siden i denne session (altså lige refreshet eller åbnet på ny)
    const hasVisited = sessionStorage.getItem("hasVisitedIndex");

    if (!hasVisited) {
      popup.style.display = "flex";
      // Gem at brugeren nu har besøgt index-siden i denne session
      sessionStorage.setItem("hasVisitedIndex", "true");
    }
  }

  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });
});
