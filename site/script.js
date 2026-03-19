const buttons = document.querySelectorAll(".add-to-cart");
const cartList = document.getElementById("cart-items");
const cart = document.getElementById("cart-count");
const total = document.getElementById("total-price");

let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

function updateCart() {
  cartList.innerHTML = "";
  let totalPrice = 0;

  cartItems.forEach((item, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
            ${item.name} - ${item.price} грн
            <button class="remove-btn">❌</button>
        `;

    li.querySelector(".remove-btn").addEventListener("click", () => {
      cartItems.splice(index, 1);
      saveCart();
    });

    cartList.appendChild(li);

    totalPrice += item.price || 0;
  });

  cart.textContent = "Корзина: " + cartItems.length;
  total.textContent = "Сума: " + totalPrice + " грн";
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cartItems));
  updateCart();
}

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const card = e.target.closest(".card");

    const name = card.querySelector("h3").textContent;
    const priceEl = card.querySelector(".price");

    if (!priceEl) {
      alert("Ошибка: нет цены");
      return;
    }

    const price = parseInt(priceEl.textContent);

    cartItems.push({ name, price });
    saveCart();
  });
});

updateCart();

const checkoutBtn = document.getElementById("checkout-btn");

checkoutBtn.addEventListener("click", () => {
  if (cartItems.length === 0) {
    alert("Корзина пуста ❌");
    return;
  }

  alert("Замовлення оформлено ✅");

  cartItems = [];
  saveCart();
});
