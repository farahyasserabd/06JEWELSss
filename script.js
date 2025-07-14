let cartItems = [];
let total = 0;

function addToCart(name, price) {
  const existingItem = cartItems.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({ name: name, price: price, quantity: 1 });
  }
  total += price;
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartDiv = document.getElementById('cart-items');
  cartDiv.innerHTML = '';
  cartItems.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      ${item.name} x${item.quantity} - $${item.price * item.quantity}
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartDiv.appendChild(div);
  });
  document.getElementById('cart-total').textContent = total;
}

function removeFromCart(index) {
  const item = cartItems[index];
  total -= item.price * item.quantity;
  cartItems.splice(index, 1);
  updateCartDisplay();
}

function checkout() {
  if (cartItems.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  // Save cart data to localStorage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  localStorage.setItem('cartTotal', total);

  // Redirect to invoice page
  window.location.href = 'invoice.html';
}