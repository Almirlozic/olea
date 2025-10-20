document.addEventListener("DOMContentLoaded", () => {
  // Find alle thumbnails, hovedbilledet og indikatoren
  const thumbs = document.querySelectorAll(".swiper-thumbnail img");
  const mainImg = document.getElementById("expandedImg");
  const indicator = document.querySelector(".thumb-indicator");

  // Stop hvis elementer mangler
  if (!thumbs.length || !mainImg || !indicator) return;

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      // Skift hovedbillede
      mainImg.src = thumb.src;

      // Marker aktiv thumbnail
      thumbs.forEach((img) => img.classList.remove("active"));
      thumb.classList.add("active");

      // Flyt indikatoren (70px thumbnailhøjde + 16px margin = 86px)
      const thumbHeight = thumb.offsetHeight + 15;
      indicator.style.top = `${index * thumbHeight}px`;
    });
  });
  const qtyContainer = document.querySelector(".quantity");
  if (qtyContainer) {
    const qty = qtyContainer.querySelector(".amount");
    let count = parseInt(qty ? qty.textContent : "1", 10) || 1;
    qtyContainer.addEventListener("click", (e) => {
      if (e.target.textContent === "+") count++;
      if (e.target.textContent === "-" && count > 1) count--;
      if (qty) qty.textContent = count;
    });
  }
});
