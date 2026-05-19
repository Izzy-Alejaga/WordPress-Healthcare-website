const products = [
  {
    name: "Classic Black Roof Cage",
    image: "cage1.png",
    alt: "Black roof custom dog cage with open door",
    description: "A clean black-roof cage with a secure front door and raised flooring for easier daily cleaning.",
    bestFor: "Small to medium dogs",
    sizes: [
      { label: "Small - 2ft x 2ft x 2ft", price: 2500 },
      { label: "Medium - 2ft x 3ft x 2ft", price: 3500 },
      { label: "Medium - 2ft x 3ft x 3ft", price: 4500 },
      { label: "Large - 3ft x 3ft x 3ft", price: 5500 },
      { label: "Large - 3ft x 4ft x 3ft", price: 7000 },
      { label: "Large - 3ft x 4ft x 4ft", price: 9000 }
    ]
  },
  {
    name: "Two Doors Cage",
    image: "cage9.png",
    alt: "Red roof custom dog cage",
    description: "A bright red-roof pet house with a sturdy frame and roomy floor area for active dogs.",
    bestFor: "Medium dogs",
    sizes: [
      { label: "Small - 2ft x 4ft x 2ft", price: 5500 },
      { label: "Medium - 3ft x 4ft x 3ft", price: 8000 },
      { label: "Large - 3ft x 4ft x 4ft", price: 9500 }
    ]
  },
  {
    name: "No Roof Cage",
    image: "cage10.png",
    alt: "Wide red roof dog cage with side panels",
    description: "A wide cage style that gives dogs better movement while keeping the same secure house shape.",
    bestFor: "Medium to large dogs",
    sizes: [
      { label: "Medium - 4ft x 2.5ft x 3ft", price: 6600 },
      { label: "Large - 5ft x 3ft x 3.5ft", price: 8400 },
      { label: "XL - 6ft x 3.5ft x 4ft", price: 9900 }
    ]
  },
  {
    name: "Giga Cage",
    image: "cage11.png",
    alt: "Compact black roof dog cage",
    description: "A compact, tidy cage made for tighter home spaces without losing the raised pet-house design.",
    bestFor: "Puppies and small dogs",
    sizes: [
      { label: "Large - 3ft x 7ft x 4ft", price: 15500 }
    ]
  }
];

const galleryImages = [
  "gallery-01.png",
  "gallery-02.jfif",
  "gallery-03.jfif",
  "gallery-04.jfif",
  "gallery-05.jfif",
  "gallery-06.jfif",
  "gallery-07.jfif",
  "gallery-08.jfif",
  "gallery-09.jfif",
  "gallery-10.jfif",
  "gallery-11.jfif",
  "gallery-12.jfif",
  "gallery-13.jfif",
  "gallery-14.jfif",
  "gallery-15.jfif",
  "gallery-16.jfif",
  "gallery-17.jfif",
  "gallery-18.png",
  "gallery-19.png",
  "gallery-20.png",
  "gallery-21.png",
  "gallery-22.png",
  "gallery-23.png",
  "gallery-24.png",
  "gallery-25.png",
  "gallery-26.png",
  "gallery-27.png",
  "gallery-28.png",
  "gallery-29.png",
  "gallery-30.png",
  "gallery-31.png",
  "gallery-32.png",
  "gallery-33.png"
].map((file, index) => ({
  src: `assets/gallery/${file}`,
  alt: `Dog cage gallery photo ${index + 1}`
}));

const formatter = new Intl.NumberFormat("en-PH", {
  maximumFractionDigits: 0
});

let activeIndex = 0;

const productImage = document.getElementById("productImage");
const productName = document.getElementById("productName");
const productDescription = document.getElementById("productDescription");
const productCount = document.getElementById("productCount");
const sizeSelect = document.getElementById("sizeSelect");
const roofSelect = document.getElementById("roofSelect");
const floorSelect = document.getElementById("floorSelect");
const priceValue = document.getElementById("priceValue");
const bestFor = document.getElementById("bestFor");
const orderLink = document.getElementById("orderLink");
const thumbRow = document.getElementById("thumbRow");
const stage = document.querySelector(".product-stage");
const galleryTrack = document.getElementById("galleryTrack");
const galleryCount = document.getElementById("galleryCount");

function renderThumbs() {
  thumbRow.innerHTML = products.map((product, index) => `
    <button class="thumb" type="button" aria-label="View ${product.name}" data-index="${index}">
      <img src="${product.image}" alt="">
    </button>
  `).join("");

  thumbRow.querySelectorAll(".thumb").forEach((button) => {
    button.addEventListener("click", () => setActiveProduct(Number(button.dataset.index)));
  });
}

function renderSizeOptions(product) {
  sizeSelect.innerHTML = product.sizes.map((size, index) => (
    `<option value="${index}">${size.label}</option>`
  )).join("");
}

function updatePrice() {
  const product = products[activeIndex];
  const selectedSize = product.sizes[Number(sizeSelect.value)] || product.sizes[0];
  const roofPrice = Number(roofSelect.value);
  const floorPrice = Number(floorSelect.value);
  const total = selectedSize.price + roofPrice + floorPrice;

  priceValue.textContent = `PHP ${formatter.format(total)}`;
  const message = encodeURIComponent(`Hello Dog cage Cavite, I want to ask about the ${product.name} in ${selectedSize.label}. Estimated price: PHP ${total}.`);
  orderLink.href = `https://www.facebook.com/Joysidecar?sk=messages&text=${message}`;
}

function setActiveProduct(index) {
  activeIndex = (index + products.length) % products.length;
  const product = products[activeIndex];

  stage.classList.add("is-changing");
  window.setTimeout(() => {
    productImage.src = product.image;
    productImage.alt = product.alt;
    productName.textContent = product.name;
    productDescription.textContent = product.description;
    productCount.textContent = `${activeIndex + 1} / ${products.length}`;
    bestFor.textContent = product.bestFor;
    renderSizeOptions(product);
    updatePrice();

    thumbRow.querySelectorAll(".thumb").forEach((thumb, index) => {
      thumb.classList.toggle("is-active", index === activeIndex);
    });
    stage.classList.remove("is-changing");
  }, 120);
}

function renderGallery() {
  galleryTrack.innerHTML = galleryImages.map((image, index) => `
    <figure class="gallery-card">
      <img src="${image.src}" alt="${image.alt}" loading="lazy">
      <span>Build ${index + 1}</span>
    </figure>
  `).join("");
  updateGalleryCount();
}

function getActiveGalleryIndex() {
  const cards = [...galleryTrack.querySelectorAll(".gallery-card")];
  const trackCenter = galleryTrack.scrollLeft + galleryTrack.clientWidth / 2;
  let closestIndex = 0;
  let closestDistance = Infinity;

  cards.forEach((card, index) => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const distance = Math.abs(trackCenter - cardCenter);
    if (distance < closestDistance) {
      closestIndex = index;
      closestDistance = distance;
    }
  });

  return closestIndex;
}

function updateGalleryCount() {
  galleryCount.textContent = `${getActiveGalleryIndex() + 1} / ${galleryImages.length}`;
}

function moveGallery(direction) {
  const card = galleryTrack.querySelector(".gallery-card");
  if (!card) {
    return;
  }

  const gap = Number.parseFloat(getComputedStyle(galleryTrack).columnGap) || 0;
  galleryTrack.scrollBy({
    left: direction * (card.offsetWidth + gap),
    behavior: "smooth"
  });
}

document.getElementById("prevProduct").addEventListener("click", () => setActiveProduct(activeIndex - 1));
document.getElementById("nextProduct").addEventListener("click", () => setActiveProduct(activeIndex + 1));
document.getElementById("prevGallery").addEventListener("click", () => moveGallery(-1));
document.getElementById("nextGallery").addEventListener("click", () => moveGallery(1));
sizeSelect.addEventListener("change", updatePrice);
roofSelect.addEventListener("change", updatePrice);
floorSelect.addEventListener("change", updatePrice);
galleryTrack.addEventListener("scroll", () => window.requestAnimationFrame(updateGalleryCount), { passive: true });
galleryTrack.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    moveGallery(-1);
  }
  if (event.key === "ArrowRight") {
    event.preventDefault();
    moveGallery(1);
  }
});

renderThumbs();
renderGallery();
setActiveProduct(0);

if (window.lucide) {
  window.lucide.createIcons();
} else {
  window.addEventListener("load", () => window.lucide?.createIcons());
}
