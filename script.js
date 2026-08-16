const basketCount = document.querySelector('#basket-count');
const toast = document.querySelector('.toast');
const cartDialog = document.querySelector('#cart-dialog');
const checkoutDialog = document.querySelector('#checkout-dialog');
const cartItems = document.querySelector('.cart-items');
const subtotal = document.querySelector('.subtotal');
const total = document.querySelector('.total');
const checkoutTotal = document.querySelector('.checkout-total strong');
const checkoutButton = document.querySelector('.checkout-button');
const checkoutForm = document.querySelector('.checkout-form');
const orderSuccess = document.querySelector('.order-success');
const ordersDialog = document.querySelector('#orders-dialog');
const ordersList = document.querySelector('.orders-list');
const productDialog = document.querySelector('#product-dialog');
const searchForm = document.querySelector('.search');
const productCards = [...document.querySelectorAll('.product-card')];
const searchResults = document.querySelector('.search-results');
const savedDialog = document.querySelector('#saved-dialog');
const savedList = document.querySelector('.saved-list');
const locationDialog = document.querySelector('#location-dialog');
const locationForm = document.querySelector('.location-form');
const deliveryLocation = document.querySelector('#delivery-location');
const browseDialog = document.querySelector('#browse-dialog');
const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const cartKey = 'northstar-cart';
const ordersKey = 'northstar-orders';
const savedKey = 'northstar-saved';
const locationKey = 'northstar-delivery-location';
const cart = new Map(readStorage(cartKey, []).map((item) => [item.name, item]));

function readStorage(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return Array.isArray(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

function saveStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function readPreference(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function renderLocation() {
  const location = readPreference(locationKey, { city: 'San Francisco', postal: '94103' });
  deliveryLocation.textContent = `${location.city} ${location.postal}`;
  locationForm.elements.city.value = location.city;
  locationForm.elements.postal.value = location.postal;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2200);
}

function cartTotal() {
  return [...cart.values()].reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function addToCart(name, price) {
  const currentItem = cart.get(name);
  cart.set(name, { name, price, quantity: (currentItem?.quantity ?? 0) + 1 });
  renderCart();
  showToast(`${name} added to your basket`);
}

function renderCart() {
  const itemCount = [...cart.values()].reduce((sum, item) => sum + item.quantity, 0);
  const orderTotal = cartTotal();
  basketCount.textContent = itemCount;
  subtotal.textContent = money.format(orderTotal);
  total.textContent = money.format(orderTotal);
  checkoutTotal.textContent = money.format(orderTotal);
  checkoutButton.disabled = itemCount === 0;
  saveStorage(cartKey, [...cart.values()]);
  cartItems.innerHTML = itemCount === 0
    ? '<div class="empty-cart"><span>✦</span><h3>Your basket is waiting.</h3><p>Add a few things you love, then come back here.</p></div>'
    : [...cart.values()].map((item) => `<article class="cart-item"><div><h3>${item.name}</h3><p>${money.format(item.price)} each</p></div><div class="quantity-controls"><button type="button" data-action="decrease" data-product="${item.name}" aria-label="Remove one ${item.name}">−</button><span>${item.quantity}</span><button type="button" data-action="increase" data-product="${item.name}" aria-label="Add one ${item.name}">+</button></div><strong>${money.format(item.price * item.quantity)}</strong><button class="remove-item" type="button" data-action="remove" data-product="${item.name}">Remove</button></article>`).join('');
}

function renderOrders() {
  const orders = readStorage(ordersKey, []);
  ordersList.innerHTML = orders.length === 0
    ? '<div class="empty-orders"><span>✦</span><h3>No orders yet.</h3><p>When you check out, your order details will appear here.</p></div>'
    : orders.map((order) => `<article class="order-card"><div><p class="order-date">${new Date(order.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p><h3>${order.number}</h3><p>${order.items.map((item) => `${item.quantity} × ${item.name}`).join(' · ')}</p>${order.delivery ? `<p class="order-delivery">Delivering to ${order.delivery.city}, ${order.delivery.postal}</p>` : ''}</div><div><strong>${money.format(order.total)}</strong><span>Order confirmed</span></div></article>`).join('');
}

function productFromCard(card) {
  const addButton = card.querySelector('.add-button');
  return { name: addButton.dataset.product, price: Number(addButton.dataset.price), image: card.querySelector('img').src, alt: card.querySelector('img').alt };
}

function renderSaved() {
  const savedItems = readStorage(savedKey, []);
  document.querySelectorAll('.product-card').forEach((card) => {
    const button = card.querySelector('.save-button');
    const isSaved = savedItems.some((item) => item.name === productFromCard(card).name);
    button.textContent = isSaved ? 'Saved' : 'Save';
    button.classList.toggle('is-saved', isSaved);
  });
  savedList.innerHTML = savedItems.length ? savedItems.map((item) => `<article class="saved-item"><img src="${item.image}" alt="${item.alt}" /><div><h3>${item.name}</h3><strong>${money.format(item.price)}</strong></div><div><button type="button" data-saved-action="cart" data-product="${item.name}">Add to basket</button><button type="button" data-saved-action="remove" data-product="${item.name}">Remove</button></div></article>`).join('') : '<div class="empty-orders"><span>✦</span><h3>Your list is ready.</h3><p>Save products here to revisit them later.</p></div>';
}

function toggleSaved(item) {
  const savedItems = readStorage(savedKey, []);
  const alreadySaved = savedItems.some((savedItem) => savedItem.name === item.name);
  saveStorage(savedKey, alreadySaved ? savedItems.filter((savedItem) => savedItem.name !== item.name) : [item, ...savedItems]);
  renderSaved();
  showToast(alreadySaved ? `${item.name} removed from saved items` : `${item.name} saved for later`);
}

function filterCatalog(query, selectedCategory) {
  let matches = 0;

  productCards.forEach((card) => {
    const matchesQuery = !query || card.textContent.toLowerCase().includes(query);
    const matchesCategory = !selectedCategory || card.dataset.category === selectedCategory;
    const isMatch = matchesQuery && matchesCategory;
    card.hidden = !isMatch;
    if (isMatch) matches += 1;
  });

  searchResults.hidden = false;
  const label = query ? `"${query}"` : selectedCategory || 'all products';
  searchResults.textContent = matches
    ? `${matches} ${matches === 1 ? 'result' : 'results'} for ${label}.`
    : `No results for ${label}. Try another search.`;
  document.querySelector('#trending').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

document.querySelectorAll('.add-button').forEach((button) => {
  button.addEventListener('click', () => {
    addToCart(button.dataset.product, Number(button.dataset.price));
  });
});

document.querySelectorAll('.details-button').forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.product-card');
    const addButton = card.querySelector('.add-button');
    const image = card.querySelector('img');
    productDialog.querySelector('.detail-image img').src = image.src;
    productDialog.querySelector('.detail-image img').alt = image.alt;
    productDialog.querySelector('.detail-category').textContent = card.querySelector('.product-type').textContent;
    productDialog.querySelector('#product-title').textContent = card.querySelector('h3').textContent;
    productDialog.querySelector('.detail-rating').textContent = card.querySelector('.rating').textContent;
    productDialog.querySelector('.detail-description').textContent = card.dataset.description;
    productDialog.querySelector('.detail-price').textContent = card.querySelector('.price').firstChild.textContent.trim();
    const detailAdd = productDialog.querySelector('.detail-add');
    detailAdd.dataset.product = addButton.dataset.product;
    detailAdd.dataset.price = addButton.dataset.price;
    const detailSave = productDialog.querySelector('.detail-save');
    detailSave.dataset.product = addButton.dataset.product;
    detailSave.dataset.price = addButton.dataset.price;
    detailSave.dataset.image = image.src;
    detailSave.dataset.alt = image.alt;
    productDialog.showModal();
  });
});

document.querySelector('.close-product').addEventListener('click', () => productDialog.close());
document.querySelector('.detail-add').addEventListener('click', (event) => {
  addToCart(event.currentTarget.dataset.product, Number(event.currentTarget.dataset.price));
  productDialog.close();
});
document.querySelectorAll('.save-button').forEach((button) => button.addEventListener('click', () => toggleSaved(productFromCard(button.closest('.product-card')))));
document.querySelector('.detail-save').addEventListener('click', (event) => toggleSaved({ name: event.currentTarget.dataset.product, price: Number(event.currentTarget.dataset.price), image: event.currentTarget.dataset.image, alt: event.currentTarget.dataset.alt }));

document.querySelector('.basket').addEventListener('click', () => {
  renderCart();
  cartDialog.showModal();
});

document.querySelector('.close-cart').addEventListener('click', () => cartDialog.close());
document.querySelector('.close-checkout').addEventListener('click', () => checkoutDialog.close());
document.querySelector('.orders').addEventListener('click', () => {
  renderOrders();
  ordersDialog.showModal();
});
document.querySelector('.close-orders').addEventListener('click', () => ordersDialog.close());
document.querySelector('.account').addEventListener('click', () => { renderSaved(); savedDialog.showModal(); });
document.querySelector('.close-saved').addEventListener('click', () => savedDialog.close());
document.querySelector('.location').addEventListener('click', () => { renderLocation(); locationDialog.showModal(); });
document.querySelector('.close-location').addEventListener('click', () => locationDialog.close());
document.querySelector('.menu-button').addEventListener('click', () => browseDialog.showModal());
document.querySelector('.close-browse').addEventListener('click', () => browseDialog.close());
document.querySelectorAll('[data-browse-category]').forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.dataset.browseCategory;
    searchForm.querySelector('input').value = '';
    searchForm.querySelector('select').value = category || 'All departments';
    browseDialog.close();
    filterCatalog('', category);
  });
});
locationForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const location = { city: locationForm.elements.city.value.trim(), postal: locationForm.elements.postal.value.trim() };
  localStorage.setItem(locationKey, JSON.stringify(location));
  renderLocation();
  locationDialog.close();
  showToast(`Delivery location set to ${location.city}`);
});
savedList.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-saved-action]');
  if (!button) return;
  const savedItems = readStorage(savedKey, []);
  const item = savedItems.find((savedItem) => savedItem.name === button.dataset.product);
  if (!item) return;
  if (button.dataset.savedAction === 'cart') addToCart(item.name, item.price);
  if (button.dataset.savedAction === 'remove') { saveStorage(savedKey, savedItems.filter((savedItem) => savedItem.name !== item.name)); renderSaved(); }
});

cartItems.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const item = cart.get(button.dataset.product);
  if (!item) return;
  if (button.dataset.action === 'increase') item.quantity += 1;
  if (button.dataset.action === 'decrease') item.quantity -= 1;
  if (button.dataset.action === 'remove' || item.quantity === 0) cart.delete(item.name);
  renderCart();
});

checkoutButton.addEventListener('click', () => {
  if (cart.size === 0) return;
  cartDialog.close();
  orderSuccess.hidden = true;
  checkoutForm.hidden = false;
  checkoutForm.reset();
  const location = readPreference(locationKey, { city: '', postal: '' });
  checkoutForm.elements.city.value = location.city;
  checkoutForm.elements.postal.value = location.postal;
  checkoutDialog.showModal();
});

checkoutForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const orderNumber = `NS-${Math.floor(100000 + Math.random() * 900000)}`;
  const orders = readStorage(ordersKey, []);
  const delivery = { city: checkoutForm.elements.city.value.trim(), postal: checkoutForm.elements.postal.value.trim() };
  orders.unshift({ number: orderNumber, date: new Date().toISOString(), total: cartTotal(), items: [...cart.values()], delivery });
  saveStorage(ordersKey, orders);
  document.querySelector('.order-number').textContent = orderNumber;
  cart.clear();
  renderCart();
  checkoutForm.hidden = true;
  orderSuccess.hidden = false;
});

document.querySelector('.return-shop').addEventListener('click', () => {
  checkoutDialog.close();
  showToast('Order confirmed. Thanks for shopping Northstar.');
});

renderCart();
renderSaved();
renderLocation();

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const query = event.currentTarget.querySelector('input').value.trim().toLowerCase();
  const category = event.currentTarget.querySelector('select').value.toLowerCase();
  const selectedCategory = category === 'all departments' ? '' : category;
  filterCatalog(query, selectedCategory);
});

document.querySelectorAll('.category-button').forEach((button) => {
  button.addEventListener('click', () => {
    searchForm.querySelector('input').value = '';
    searchForm.querySelector('select').value = button.dataset.category || 'All departments';
    filterCatalog('', button.dataset.category);
  });
});