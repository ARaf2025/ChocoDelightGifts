const products = [
  { id: 1, name: "Премиум Ассорти Бельгийского Шоколада", price: 45, image: "choco1.jpg" },
  { id: 2, name: "Набор трюфелей с орехами", price: 30, image: "choco2.jpg" },
  { id: 3, name: "Мини-ассорти шоколадных пралине", price: 25, image: "choco3.jpg" },
  { id: 4, name: "Шоколадный набор с плиткой-открыткой на 8 конфет", price: 55,image: "choco4.jpg"},
  { id: 5, name: "Набор шоколада в каллетах", price: 75, image:"choco5.jpg"}
];

let cart = {};

function addToCart(productId) {
  if (cart[productId]) {
    cart[productId]++;
  } else {
    cart[productId] = 1;
  }
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartDiv = document.getElementById('cart');
  cartDiv.innerHTML = '';
  let total = 0;

  for (const id in cart) {
    const product = products.find(p => p.id == id);
    const quantity = cart[id];
    const subtotal = product.price * quantity;
    total += subtotal;
    const itemDiv = document.createElement('div');
    itemDiv.innerHTML = `${product.name} — Количество: ${quantity} — Итого: $${subtotal}`;
    cartDiv.appendChild(itemDiv);
  }

  const totalDiv = document.createElement('div');
  totalDiv.innerHTML = `<strong>Общая сумма: $${total}</strong>`;
  cartDiv.appendChild(totalDiv);
}

function showOrderForm() {
  document.getElementById('order-form').style.display = 'block';
}

function submitOrder(event) {
  event.preventDefault();
  alert('Спасибо за заказ! Оплата прошла успешно (имитация).');
  cart = {};
  updateCartDisplay();
  document.getElementById('order-form').style.display = 'none';
}

// Фильтрация и сортировка товаров
function renderProducts(filteredProducts) {
  const container = document.getElementById('productsContainer');
  container.innerHTML = "";
  if (filteredProducts.length === 0) {
    container.innerHTML = "<p>Нет товаров по вашему запросу.</p>";
    return;
  }
  filteredProducts.forEach(product => {
    const div = document.createElement('div');
    div.className = "product";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>Цена: $${product.price}</p>
      <button onclick="addToCart(${product.id})">Добавить в корзину</button>
    `;
    container.appendChild(div);
  });
}

function filterAndSortProducts() {
  let filtered = [...products];
  const search = document.getElementById('searchInput').value.toLowerCase();
  if (search) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(search));
  }
  const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
  const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;
  filtered = filtered.filter(p => p.price >= minPrice && p.price <= maxPrice);
  const sort = document.getElementById('sortSelect').value;
  switch (sort) {
    case "price_asc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price_desc":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "name_asc":
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name_desc":
      filtered.sort((a, b) => b.name.localeCompare(a.name));
      break;
  }
  renderProducts(filtered);
}

window.onload = function() {
  filterAndSortProducts();
  updateCartDisplay();
};