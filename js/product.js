const productContainer = document.querySelector(".product-page");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const apiUrl = id
  ? `https://dummyjson.com/products/${id}` // ét produkt
  : "https://dummyjson.com/products/category/furniture"; // hele kategorien

fetch(apiUrl)
  .then((res) => res.json())
  .then((data) => showProduct(data.products ? data.products[0] : data))
  .catch((err) => console.error(err));

function showProduct(product) {
  productContainer.innerHTML = `
  <div class="breadcrumbs">
    <a href="index.html">Home</a>
    <a href="productlist.html">Products</a>
  </div>
    <section class="product-gallery">
      <div class="swiper-thumbnail">
        ${product.images
          .map(
            (img) =>
              `<div class="column"><img src="${img}" alt="${product.title}"></div>`
          )
          .join("")}
        <div class="thumb-indicator"></div>
      </div>
      <div class="container">
        <img id="expandedImg" src="${product.thumbnail}" alt="${product.title}">
      </div>
    </section>
        <section>
            <!-- Product Info -->
            <div class="product-info">
                <h2 class="productName">${product.title}</h2>
                <p class="price">${product.price},-</p>
                <p class="desc">
                    ${product.description}
                </p>

                <!-- Color options -->
                <div class="colors">
                    <span class="color brown"></span>
                    <span class="color red"></span>
                    <span class="color green"></span>
                </div>

                <!-- Quantity & Button -->
                <div class="actions">
                    <div class="quantity">
                        <span class="minus">-</span>
                        <span class="amount">1</span>
                        <span class="plus">+</span>
                    </div>
                    <button class="add-to-basket">Add to basket</button>
                    <span class="wishlist">♡</span>
                </div>

                <p class="dimensions">68 cm x 72 cm x 78 cm <br><small>WIDTH x DEPTH x HEIGHT</small></p>
            </div>
        </section>
        


        <!-- Extra Information -->
        <section class="extra-info">
            <h3>Product Information</h3>
            <p>The Nordic Noir Collection celebrates timeless elegance with a modern edge. Each piece is crafted from
                rich dark oak wood, creating a warm yet sophisticated tone that complements any interior. The sleek
                black upholstery adds a bold contrast, combining comfort and style in perfect harmony. This refined
                design, with its clean lines and subtle detailing, brings a touch of mid-century charm to contemporary
                living spaces.</p>

            <h3>Care and Maintenance</h3>
            <p>The Nordic Noir Collection celebrates timeless elegance with a modern edge. Each piece is crafted from
                rich dark oak wood, creating a warm yet sophisticated tone that complements any interior.</p>
        </section>
`;

  // Set up thumbnail click events immediately after HTML is inserted
  const thumbs = document.querySelectorAll(".swiper-thumbnail img");
  const mainImg = document.getElementById("expandedImg");
  const indicator = document.querySelector(".thumb-indicator");

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      mainImg.src = thumb.src;
      thumbs.forEach((img) => img.classList.remove("active"));
      thumb.classList.add("active");

      const thumbHeight = thumb.offsetHeight + 40; // margin mellem thumbnails
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
}
