const productlistContainer = document.querySelector(".productContainer");
const categories = document.querySelectorAll(".category");
const h1 = document.querySelector("h1");

let allData = [];
let currentDataset = [];

// Standardkategori
loadCategory("furniture");

// Klik på en category
categories.forEach((cat) => {
  cat.addEventListener("click", () => {
    const category = cat.dataset.category;
    h1.textContent = cat.querySelector("p").textContent;
    loadCategory(category);
  });
});

// Funktion til at hente produkter
function loadCategory(category) {
  fetch(`https://dummyjson.com/products/category/${category}`)
    .then((res) => res.json())
    .then((data) => {
      allData = data.products;
      currentDataset = allData;
      showProducts(allData);
    })
    .catch((err) => console.error("Fejl ved hentning af produkter:", err));
}

function showProducts(products) {
  productlistContainer.innerHTML = "";
  if (!products || products.length === 0) {
    productlistContainer.innerHTML = "<p>Ingen produkter fundet.</p>";
    return;
  }

  const sortHighToLow = document.querySelector("#sort-high");
  const sortLowToHigh = document.querySelector("#sort-low");

  if (sortHighToLow) {
    sortHighToLow.addEventListener("click", () => {
      const sorted = [...currentDataset].sort((a, b) => b.price - a.price);
      showProducts(sorted);
    });
  }

  if (sortLowToHigh) {
    sortLowToHigh.addEventListener("click", () => {
      const sorted = [...currentDataset].sort((a, b) => a.price - b.price);
      showProducts(sorted);
    });
  }

  products.forEach((product) => {
    const discount =
      product.discountPercentage > 0
        ? `<div class="badge">${Math.round(product.discountPercentage)}%</div>`
        : "";

    const priceAfterDiscount = (
      product.price -
      (product.price * product.discountPercentage) / 100
    ).toFixed(2);

    productlistContainer.innerHTML += `
    <article class="products ${product.stock === 0 ? "soldout" : ""}">
      ${
        product.discountPercentage
          ? `<div class="badge">${Math.round(
              product.discountPercentage
            )}%</div>`
          : ""
      }
      ${product.stock === 0 ? `<div class="label">Udsolgt</div>` : ""}
      <a href="product.html?id=${product.id}" class="readmore">
        <img src="${product.thumbnail}" alt="${product.title}" />
  
        <div class="product-info">
        <div class="title-price">
  <h3>${product.title}</h3>
  </div>

   <div class="category">
            <span>${product.category.toUpperCase()} | ${
      product.brand ? product.brand.toUpperCase() : "BRAND"
    }</span>
          </div>

          <section class="pris">
  <p class="rabat">${(
    product.price -
    product.price * (product.discountPercentage / 100)
  ).toLocaleString("da-DK")} ,-</p> 
  
  <div class="discounted">
            <p class="price">${product.price.toLocaleString("da-DK")} ,-</p>
          </div>
  </section>
        
  </section>
          <div class="color-dots">
            <span class="dot" style="background-color: #8b7355;"></span>
            <span class="dot" style="background-color: #a50000;"></span>
            <span class="dot" style="background-color: #226b1f;"></span>
          </div>
        </div>
      </a>
    </article>
  `;
  });
}
