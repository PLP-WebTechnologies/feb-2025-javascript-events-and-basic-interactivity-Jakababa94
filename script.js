// Tabs
function showTab(tabId) {
  const tabs = document.querySelectorAll('.tabs-content');
  tabs.forEach(tab => tab.classList.remove('active'));
  document.getElementById(tabId).classList.add('active');
}

// Button Click Changes Text/Color
document.getElementById('colorButton').addEventListener('click', () => {
  const btn = document.getElementById('colorButton');
  btn.textContent = 'Thanks!';
  btn.style.backgroundColor = '#4caf50';
});

document.getElementById('colorButton').addEventListener('click', function () {
  const colors = ['red', 'blue', 'green', 'purple', 'orange'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  this.style.backgroundColor = randomColor;

  const secretMessage = document.getElementById('secretMessage');
  secretMessage.style.display = 'block';
});

// Keypress Detection
document.addEventListener('keypress', (e) => {
  if (e.key === 'p' || e.key === 'P') {
    alert('P is for Pastry!');
  }
});

// Double-click Secret
document.getElementById('colorButton').addEventListener('dblclick', () => {
  const secret = document.getElementById('secretMessage');
  secret.style.display = 'block';
  secret.classList.add('animated');
});

// Form Validation
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailFeedback = document.getElementById('emailFeedback');
const passwordFeedback = document.getElementById('passwordFeedback');

emailInput.addEventListener('input', () => {
  const email = emailInput.value;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  emailFeedback.textContent = regex.test(email) ? '' : 'Invalid email format';
});

passwordInput.addEventListener('input', () => {
  const pwd = passwordInput.value;
  passwordFeedback.textContent = pwd.length >= 8 ? '' : 'Password must be at least 8 characters';
});

document.getElementById('subscribeForm').addEventListener('submit', (e) => {
  e.preventDefault();
  if (!emailInput.value || !passwordInput.value) {
    alert('Please fill out all fields');
  } else {
    alert('Subscribed successfully!');
  }
});

document.getElementById('subscribeForm').addEventListener('input', function (e) {
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const emailFeedback = document.getElementById('emailFeedback');
  const passwordFeedback = document.getElementById('passwordFeedback');

  if (!email.value.includes('@')) {
    emailFeedback.textContent = 'Please enter a valid email address.';
  } else {
    emailFeedback.textContent = '';
  }

  if (password.value.length < 6) {
    passwordFeedback.textContent = 'Password must be at least 6 characters long.';
  } else {
    passwordFeedback.textContent = '';
  }
});

const cart = [];
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const checkoutButton = document.getElementById('checkout-button');

// Add event listeners to "Add to Cart" buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', event => {
    const card = event.target.closest('.gallery-card');
    const itemName = card.querySelector('h3').textContent;
    const itemPrice = parseFloat(card.querySelector('.price').textContent.replace('$', ''));

    addToCart(itemName, itemPrice);
  });
});

// Function to add items to the cart
function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  updateCart();
}

// Function to update the cart display
function updateCart() {
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    cartTotalElement.textContent = 'Total: $0.00';
    checkoutButton.disabled = true;
    return;
  }

  let total = 0;

  cart.forEach(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <p>${item.name} - $${item.price.toFixed(2)} x ${item.quantity} = $${itemTotal.toFixed(2)}</p>
      <button class="btn remove-item" data-name="${item.name}">Remove</button>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
  checkoutButton.disabled = false;

  // Add event listeners to "Remove" buttons
  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', event => {
      const itemName = event.target.getAttribute('data-name');
      removeFromCart(itemName);
    });
  });
}

// Function to remove items from the cart
function removeFromCart(name) {
  const itemIndex = cart.findIndex(item => item.name === name);

  if (itemIndex !== -1) {
    cart[itemIndex].quantity -= 1;

    if (cart[itemIndex].quantity === 0) {
      cart.splice(itemIndex, 1);
    }
  }

  updateCart();
}

// Search bar functionality
document.getElementById('search-bar').addEventListener('input', function (e) {
  const query = e.target.value.toLowerCase();
  document.querySelectorAll('.gallery-card').forEach(card => {
    const itemName = card.querySelector('h3').textContent.toLowerCase();
    card.style.display = itemName.includes(query) ? 'block' : 'none';
  });
});

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  backToTopButton.style.display = window.scrollY > 200 ? 'block' : 'none';
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

setTimeout(() => {
  alert('Subscribe to our newsletter for exclusive offers!');
}, 1000);