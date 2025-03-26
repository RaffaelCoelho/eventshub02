// Dados iniciais (simulando um banco de dados)
const stores = {
  buffet: [
    { 
      id: 1, 
      name: "Buffet Sabor & Arte", 
      products: [
        { 
          id: 1, 
          name: "Buffet Completo", 
          description: "Comida, bebidas e sobremesas para 50 pessoas", 
          price: 5000,
          image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        },
        { 
          id: 2, 
          name: "Buffet Vegetariano", 
          description: "Opções vegetarianas e veganas para 50 pessoas", 
          price: 4500,
          image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        }
      ]
    },
    { 
      id: 2, 
      name: "Delícias da Festa", 
      products: [
        { 
          id: 3, 
          name: "Buffet Infantil", 
          description: "Comidas temáticas para crianças (30 pessoas)", 
          price: 3000,
          image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        }
      ]
    }
  ],
  espacos: [
    { 
      id: 3, 
      name: "Salão Elegante", 
      products: [
        { 
          id: 4, 
          name: "Salão para 100 pessoas", 
          description: "Espaço climatizado com decoração básica", 
          price: 3000,
          image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        }
      ]
    },
    { 
      id: 4, 
      name: "Espaço Verde", 
      products: [
        { 
          id: 5, 
          name: "Área aberta para eventos", 
          description: "Capacidade para 200 pessoas com área verde", 
          price: 5000,
          image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        }
      ]
    }
  ],
  equipamentos: [
    { 
      id: 5, 
      name: "Som & Cia", 
      products: [
        { 
          id: 6, 
          name: "Kit de Som Completo", 
          description: "Microfones, caixas de som e mixer para 200 pessoas", 
          price: 1000,
          image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        }
      ]
    }
  ],
  decoracao: [
    { 
      id: 6, 
      name: "Decoração Mágica", 
      products: [
        { 
          id: 7, 
          name: "Arranjos de Flores", 
          description: "Decoração floral para mesas e ambientes", 
          price: 800,
          image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        }
      ]
    }
  ],
  servicos: [
    { 
      id: 7, 
      name: "Fotografia Profissional", 
      products: [
        { 
          id: 8, 
          name: "Pacote de Fotografia", 
          description: "Cobertura completa do evento (8 horas)", 
          price: 2000,
          image: "https://images.unsplash.com/photo-1520390138845-fd2d229dd553?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        }
      ]
    }
  ]
};

// Elementos da interface
const authScreen = document.getElementById("auth-screen");
const homeScreen = document.getElementById("home-screen");
const storesScreen = document.getElementById("stores-screen");
const productsScreen = document.getElementById("products-screen");
const cartScreen = document.getElementById("cart-screen");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const addressInput = document.getElementById("address");
const paymentMethodSelect = document.getElementById("payment-method");
const productStore = document.getElementById("product-store");
const categoriesContainer = document.getElementById("categories");
const cartTotal = document.getElementById("cart-total");
const storeList = document.getElementById("store-list");
const storeCategory = document.getElementById("store-category");

// Variáveis globais
let currentStore = null;
let currentCategory = null;

// Funções principais
function showScreen(screen) {
  authScreen.classList.add("hidden");
  homeScreen.classList.add("hidden");
  storesScreen.classList.add("hidden");
  productsScreen.classList.add("hidden");
  cartScreen.classList.add("hidden");
  screen.classList.remove("hidden");
}

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

function renderCategories() {
  categoriesContainer.innerHTML = Object.keys(stores).map(category => {
    const categoryData = stores[category][0];
    const product = categoryData.products[0];
    return `
      <div class="category" onclick="showStores('${category}')">
        <img src="${product.image}" alt="${category}" class="category-img">
        <button>${formatCategoryName(category)}</button>
      </div>
    `;
  }).join("");
}

function formatCategoryName(category) {
  const names = {
    buffet: "Buffet",
    espacos: "Espaços para Eventos",
    equipamentos: "Equipamentos",
    decoracao: "Decoração",
    servicos: "Serviços"
  };
  return names[category] || category;
}

function showStores(category) {
  currentCategory = category;
  storeCategory.textContent = formatCategoryName(category);
  
  storeList.innerHTML = stores[category].map(store => `
    <div class="store" onclick="showStoreProducts(${store.id})">
      <h3>${store.name}</h3>
      <p>${store.products.length} ${store.products.length === 1 ? 'produto' : 'produtos'} disponíveis</p>
    </div>
  `).join("");
  
  showScreen(storesScreen);
}

function showStoreProducts(storeId) {
  const categoryStores = stores[currentCategory];
  currentStore = categoryStores.find(store => store.id === storeId);
  productStore.textContent = currentStore.name;
  
  productList.innerHTML = currentStore.products.map(product => `
    <div class="product">
      <img src="${product.image}" alt="${product.name}" class="product-img">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p><strong>R$ ${product.price.toFixed(2)}</strong></p>
      </div>
      <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
    </div>
  `).join("");
  
  showScreen(productsScreen);
}

function addToCart(productId) {
  const product = currentStore.products.find(p => p.id === productId);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }
  
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} foi adicionado ao carrinho!`);
}

function showCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <p>R$ ${item.price.toFixed(2)}</p>
        <div class="cart-item-actions">
          <div class="quantity-control">
            <button onclick="updateQuantity(${item.id}, -1)">-</button>
            <span>${item.quantity || 1}</span>
            <button onclick="updateQuantity(${item.id}, 1)">+</button>
          </div>
          <button onclick="removeFromCart(${item.id})">Remover</button>
        </div>
      </div>
    </div>
  `).join("");
  
  updateCartTotal();
  showScreen(cartScreen);
}

function updateQuantity(productId, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find(item => item.id === productId);
  
  if (item) {
    item.quantity = (item.quantity || 1) + change;
    
    if (item.quantity < 1) {
      cart = cart.filter(item => item.id !== productId);
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    showCart();
  }
}

function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  showCart();
}

function updateCartTotal() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  cartTotal.innerHTML = `Total: R$ ${total.toFixed(2)}`;
}

function goBack() {
  if (productsScreen.classList.contains("hidden")) {
    if (storesScreen.classList.contains("hidden")) {
      showScreen(homeScreen);
    } else {
      showScreen(homeScreen);
    }
  } else {
    showScreen(storesScreen);
  }
}

function checkout() {
  const address = addressInput.value;
  const paymentMethod = paymentMethodSelect.value;
  
  if (!address || !paymentMethod) {
    alert("Por favor, preencha o endereço e a forma de pagamento.");
    return;
  }
  
  alert("Pedido finalizado com sucesso!");
  localStorage.removeItem("cart");
  showScreen(homeScreen);
}

// Event Listeners
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
  
  if (!validateEmail(email)) {
    alert("Por favor, insira um e-mail válido.");
    return;
  }
  
  if (!validatePassword(password)) {
    alert("A senha deve ter pelo menos 6 caracteres.");
    return;
  }
  
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.email === email && user.password === password) {
    renderCategories();
    showScreen(homeScreen);
  } else {
    alert("E-mail ou senha incorretos!");
  }
});

registerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
  
  if (!validateEmail(email)) {
    alert("Por favor, insira um e-mail válido.");
    return;
  }
  
  if (!validatePassword(password)) {
    alert("A senha deve ter pelo menos 6 caracteres.");
    return;
  }
  
  const user = { email, password };
  localStorage.setItem("user", JSON.stringify(user));
  alert("Cadastro realizado com sucesso!");
});

// Inicialização
showScreen(authScreen);
