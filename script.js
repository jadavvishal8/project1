// Initialize cart from localStorage or set it to an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
  loadCartFromLocalStorage();
  updateCart();
});

// Save cart to localStorage
function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCartFromLocalStorage() {
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    cart = JSON.parse(storedCart);
  }
}

// Add item to cart
function addToCart(name, price) {
  const existingItem = cart.find((item) => item.name === name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  saveCartToLocalStorage();
  updateCart();
}

// Remove item from cart
function removeItem(name) {
  cart = cart.filter((item) => item.name !== name);
  saveCartToLocalStorage();
  updateCart();
}

// Update cart display
function updateCart() {
  const cartTable = document.getElementById('cartss');
  if (!cartTable) {
    console.error('Element with ID "cartss" not found.');
    return;
  }

  cartTable.innerHTML = '';

  if (cart.length === 0) {
    cartTable.innerHTML = `<tr><td colspan="6">Your cart is empty</td></tr>`;
    return;
  }

  let total = 0;

  cart.forEach((item) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    const cartRow = `
      <tr>
        <td><a href="#" class="remove-item" data-name="${item.name}"><i class="fa-regular fa-circle-xmark fa-fade"></i></a></td>
        <td><img src="products/Almond.webp" alt=""></td>
        <td>${item.name}</td>
        <td>$${item.price}</td>
        <td><input type="number" min="1" value="${item.quantity}" onchange="updateQuantity('${item.name}', this.value)"></td>
        <td>$${subtotal}</td>
      </tr>
    `;
    cartTable.innerHTML += cartRow;
  });

  document.getElementById('subtotal').innerHTML = `
    <h3>Cart Totals</h3>
    <table>
      <tr><td>Cart Subtotal</td><td>$${total}</td></tr>
      <tr><td>Shipping</td><td>Free</td></tr>
      <tr><td><strong>Total</strong></td><td><strong>$${total}</strong></td></tr>
    </table>
    <button class="normal">Proceed to Checkout</button>
  `;

  // Event delegation for remove buttons
  cartTable.addEventListener('click', (event) => {
    if (event.target.closest('.remove-item')) {
      const name = event.target.closest('.remove-item').getAttribute('data-name');
      removeItem(name);
    }
  });
}

// Update item quantity
function updateQuantity(name, quantity) {
  const item = cart.find((item) => item.name === name);
  if (item) {
    item.quantity = Number(quantity);
    saveCartToLocalStorage();
    updateCart();
  }
}

// Image switching functionality
const mainimg = document.getElementById('mainimg');
const smallimg = document.getElementsByClassName('small-img');

for (let i = 0; i < smallimg.length; i++) {
  smallimg[i].onclick = function() {
    mainimg.src = smallimg[i].src;
  }
}

// Navbar toggle functionality
const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');
const clos = document.getElementById('close');

if (bar) {
  bar.addEventListener('click', () => {
    nav.classList.add('active');
  });
}

if (clos) {
  clos.addEventListener('click', () => {
    nav.classList.remove('active');
  });
}
