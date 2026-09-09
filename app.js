/* ==========================================================================
   PetiscoPet - Application Logic
   ========================================================================== */

// App State
const state = {
  products: [],
  filteredProducts: [],
  cart: [],
  selectedPet: 'todos',
  selectedCategory: 'todas',
  customerInfo: {
    name: '',
    phone: '',
    email: '',
    address: '',
    coords: null
  },
  whatsappNumber: '5511999212704'
};

// DOM Elements
const productsContainer = document.getElementById('productsContainer');
const petSwitcherBtns = document.querySelectorAll('.pet-switcher-btn');
const categoryChips = document.querySelectorAll('.chip-btn');
const cartCountBadge = document.getElementById('cartCountBadge');
const bottomTotalValue = document.getElementById('bottomTotalValue');

// Modals
const cartModal = document.getElementById('cartModal');
const checkoutModal = document.getElementById('checkoutModal');
const credentialsModal = document.getElementById('credentialsModal');
const paymentModal = document.getElementById('paymentModal');
const successModal = document.getElementById('successModal');

// Init Application
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

async function initApp() {
  loadCartFromLocalStorage();
  await fetchProducts();
  setupEventListeners();
  renderProducts();
  updateCartUI();
}

// Fetch JSON Data
async function fetchProducts() {
  try {
    const response = await fetch('products.json');
    if (!response.ok) throw new Error('Falha ao carregar produtos.');
    const data = await response.json();
    if (data.config && data.config.whatsapp) {
      state.whatsappNumber = data.config.whatsapp;
    }
    state.products = data.produtos || [];
    state.filteredProducts = [...state.products];
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    productsContainer.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--error);">Não foi possível carregar o cardápio. Tente recarregar a página.</p>`;
  }
}

// Filter Logic
function applyFilters() {
  state.filteredProducts = state.products.filter(product => {
    // Pet Filter
    const matchesPet = state.selectedPet === 'todos' || product.pet === state.selectedPet;

    // Category Filter
    let matchesCategory = true;
    if (state.selectedCategory === 'promocoes') {
      matchesCategory = product.emPromocao === true;
    } else if (state.selectedCategory !== 'todas') {
      matchesCategory = product.categoria === state.selectedCategory;
    }

    return matchesPet && matchesCategory;
  });

  renderProducts();
}

// Render Products Grid
function renderProducts() {
  if (!productsContainer) return;

  if (state.filteredProducts.length === 0) {
    productsContainer.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px 20px;">
        <span class="material-symbols-rounded" style="font-size: 48px; color: var(--outline);">search_off</span>
        <p style="margin-top: 12px; color: var(--text-muted);">Nenhum petisco encontrado para os filtros selecionados.</p>
      </div>
    `;
    return;
  }

  productsContainer.innerHTML = state.filteredProducts.map(product => {
    const currentPrice = product.precoPromocional ? product.precoPromocional : product.preco;
    const oldPriceHtml = product.precoPromocional
      ? `<span class="price-old">R$ ${product.preco.toFixed(2).replace('.', ',')}</span>`
      : '';
    const badgeHtml = product.badge
      ? `<span class="product-badge">${product.badge}</span>`
      : '';
    const promoTagHtml = product.emPromocao
      ? `<span class="product-promo-tag">OFERTA</span>`
      : '';

    return `
      <div class="product-card fade-in">
        <div class="card-media">
          <img src="${product.imagem}" alt="${product.nome}" loading="lazy">
          ${badgeHtml}
          ${promoTagHtml}
        </div>
        <div class="card-content">
          <h3 class="card-title">${product.nome}</h3>
          <p class="card-desc">${product.descricao}</p>
          <div class="card-footer">
            <div class="price-container">
              ${oldPriceHtml}
              <span class="price-current">R$ ${currentPrice.toFixed(2).replace('.', ',')}</span>
            </div>
            <button class="add-to-cart-btn" onclick="addToCart('${product.id}')" aria-label="Adicionar ${product.nome}">
              <span class="material-symbols-rounded">add</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Event Listeners Setup
function setupEventListeners() {
  // Pet Filter Toggle
  petSwitcherBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      petSwitcherBtns.forEach(b => b.classList.remove('active'));
      const target = e.currentTarget;
      target.classList.add('active');
      state.selectedPet = target.getAttribute('data-pet');
      applyFilters();
    });
  });

  // Category Chips Toggle
  categoryChips.forEach(btn => {
    btn.addEventListener('click', (e) => {
      categoryChips.forEach(b => b.classList.remove('active'));
      const target = e.currentTarget;
      target.classList.add('active');
      state.selectedCategory = target.getAttribute('data-category');
      applyFilters();
    });
  });

  // Open Cart Modal Buttons
  document.getElementById('openCartBtn')?.addEventListener('click', () => openModal(cartModal));
  document.getElementById('bottomCheckoutBtn')?.addEventListener('click', () => openModal(cartModal));

  // Modal Close Buttons
  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modalId = e.currentTarget.getAttribute('data-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) closeModal(targetModal);
    });
  });

  // Close modal when clicking on overlay
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal(overlay);
    });
  });

  // Proceed to Checkout
  document.getElementById('proceedToCheckoutBtn')?.addEventListener('click', () => {
    if (state.cart.length === 0) {
      alert('Seu carrinho está vazio! Adicione produtos para prosseguir.');
      return;
    }
    closeModal(cartModal);
    openModal(checkoutModal);
  });

  // Geolocation Button
  document.getElementById('getLocationBtn')?.addEventListener('click', handleGeolocation);

  // Form Checkout Submit
  document.getElementById('checkoutForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    state.customerInfo.name = document.getElementById('clientName').value;
    state.customerInfo.phone = document.getElementById('clientPhone').value;
    state.customerInfo.email = document.getElementById('clientEmail').value;
    state.customerInfo.address = document.getElementById('clientAddress').value;

    closeModal(checkoutModal);
    openModal(credentialsModal);
    triggerCredentialsVerification();
  });

  // Credentials Continue Button
  document.getElementById('proceedToPaymentBtn')?.addEventListener('click', () => {
    closeModal(credentialsModal);
    openModal(paymentModal);
  });

  // Payment Simulation Button
  document.getElementById('simulatePaymentSuccessBtn')?.addEventListener('click', () => {
    closeModal(paymentModal);
    generateWhatsappLink();
    openModal(successModal);
    clearCart();
  });
}

// Modal Helpers
function openModal(modal) {
  if (modal) modal.classList.add('active');
}

function closeModal(modal) {
  if (modal) modal.classList.remove('active');
}

/* ==========================================================================
   LocalStorage & Cart Logic
   ========================================================================== */

function loadCartFromLocalStorage() {
  try {
    const savedCart = localStorage.getItem('petiscopet_cart');
    if (savedCart) {
      state.cart = JSON.parse(savedCart);
    }
  } catch (err) {
    console.error('Erro ao ler do localStorage:', err);
  }
}

function saveCartToLocalStorage() {
  try {
    localStorage.setItem('petiscopet_cart', JSON.stringify(state.cart));
  } catch (err) {
    console.error('Erro ao salvar no localStorage:', err);
  }
}

window.addToCart = function(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = state.cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    state.cart.push({
      id: product.id,
      nome: product.nome,
      preco: product.precoPromocional ? product.precoPromocional : product.preco,
      imagem: product.imagem,
      quantity: 1
    });
  }

  saveCartToLocalStorage();
  updateCartUI();
};

window.updateQuantity = function(productId, delta) {
  const item = state.cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    state.cart = state.cart.filter(i => i.id !== productId);
  }

  saveCartToLocalStorage();
  updateCartUI();
};

function clearCart() {
  state.cart = [];
  saveCartToLocalStorage();
  updateCartUI();
}

function calculateTotals() {
  return state.cart.reduce((acc, item) => {
    acc.totalItems += item.quantity;
    acc.subtotal += item.preco * item.quantity;
    return acc;
  }, { totalItems: 0, subtotal: 0 });
}

function updateCartUI() {
  const { totalItems, subtotal } = calculateTotals();

  // Badges and values
  if (cartCountBadge) cartCountBadge.textContent = totalItems;
  const formattedSubtotal = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;

  if (bottomTotalValue) bottomTotalValue.textContent = formattedSubtotal;
  const cartSubtotalEl = document.getElementById('cartSubtotal');
  const cartTotalEl = document.getElementById('cartTotal');
  if (cartSubtotalEl) cartSubtotalEl.textContent = formattedSubtotal;
  if (cartTotalEl) cartTotalEl.textContent = formattedSubtotal;

  // Cart Modal Items List
  const cartItemsList = document.getElementById('cartItemsList');
  if (!cartItemsList) return;

  if (state.cart.length === 0) {
    cartItemsList.innerHTML = `
      <div style="text-align: center; padding: 30px 0;">
        <span class="material-symbols-rounded" style="font-size: 48px; color: var(--outline);">shopping_bag</span>
        <p style="margin-top: 8px; color: var(--text-muted);">Seu carrinho está vazio.</p>
      </div>
    `;
    return;
  }

  cartItemsList.innerHTML = state.cart.map(item => `
    <div class="cart-item">
      <img src="${item.imagem}" alt="${item.nome}" class="cart-item-img">
      <div class="cart-item-info">
        <h4 class="cart-item-title">${item.nome}</h4>
        <span class="cart-item-price">R$ ${(item.preco * item.quantity).toFixed(2).replace('.', ',')}</span>
      </div>
      <div class="quantity-controls">
        <button class="qty-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
        <span class="qty-val">${item.quantity}</span>
        <button class="qty-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   Geolocation Integration
   ========================================================================== */

function handleGeolocation() {
  const geoStatusBox = document.getElementById('geoStatusBox');
  const geoStatusText = document.getElementById('geoStatusText');

  if (!navigator.geolocation) {
    geoStatusBox.className = 'alert-box alert-warning';
    geoStatusText.textContent = 'Geolocalização não é suportada por este navegador. O cadastro prosseguirá com o endereço digitado.';
    return;
  }

  geoStatusText.textContent = 'Obtendo sua localização...';

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      state.customerInfo.coords = { latitude, longitude };
      geoStatusBox.className = 'alert-box alert-success';
      geoStatusText.textContent = `Localização capturada com sucesso! (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`;

      // Autocomplete address if empty
      const addressInput = document.getElementById('clientAddress');
      if (addressInput && !addressInput.value) {
        addressInput.value = `Lat: ${latitude.toFixed(5)}, Lon: ${longitude.toFixed(5)} (Obtido via GPS)`;
      }
    },
    (error) => {
      console.warn('Erro de geolocalização:', error.message);
      geoStatusBox.className = 'alert-box alert-warning';
      geoStatusText.textContent = 'Geolocalização negada ou indisponível. O cadastro prossegue normalmente usando o endereço digitado.';
    },
    { timeout: 10000, enableHighAccuracy: true }
  );
}

/* ==========================================================================
   Credentials API (navigator.credentials.get())
   ========================================================================== */

async function triggerCredentialsVerification() {
  const consoleLog = document.getElementById('credentialsConsoleLog');
  if (!consoleLog) return;

  consoleLog.innerHTML = `<span class="material-symbols-rounded">info</span> <span>Tentando navigator.credentials.get()...</span>`;

  if (!navigator.credentials || !navigator.credentials.get) {
    const msg = 'API CredentialsContainer não disponível neste navegador. Prosseguindo...';
    console.log('[PetiscoPet Security]', msg);
    consoleLog.innerHTML = `<span class="material-symbols-rounded">warning</span> <span>${msg}</span>`;
    return;
  }

  try {
    // Attempt credentials get
    const cred = await navigator.credentials.get({
      password: true,
      mediation: 'optional'
    });

    const resultMsg = cred
      ? `Credencial validada com sucesso: ${cred.id || 'Credencial Nível 1'}`
      : 'Credencial não retornada ou fluxo ignorado. Prosseguindo normalmente.';

    console.log('[PetiscoPet Security Credential Result]:', cred || 'Nenhuma credencial retornada');
    consoleLog.innerHTML = `<span class="material-symbols-rounded">check_circle</span> <span>${resultMsg}</span>`;
  } catch (err) {
    const errorMsg = `Aviso/Erro no Credentials: ${err.message || 'Tentativa cancelada'}`;
    console.log('[PetiscoPet Security Notice]:', errorMsg);
    consoleLog.innerHTML = `<span class="material-symbols-rounded">info</span> <span>Aviso: Autenticação cancelada ou não configurada. Prosseguindo para o pagamento...</span>`;
  }
}

/* ==========================================================================
   WhatsApp Order Message Generation
   ========================================================================== */

function generateWhatsappLink() {
  const { name, phone, email, address, coords } = state.customerInfo;
  const { subtotal } = calculateTotals();

  const itemsList = state.cart.map(item => `• ${item.nome} × ${item.quantity} (R$ ${(item.preco * item.quantity).toFixed(2).replace('.', ',')})`).join('\n');

  let geoFormatted = '';
  if (coords) {
    geoFormatted = `\n📍 Coordenadas GPS: https://maps.google.com/?q=${coords.latitude},${coords.longitude}`;
  }

  const messageText = `🐾 *NOVO PEDIDO - PETISCOPET* 🐾\n\n` +
    `👤 *Cliente:* ${name}\n` +
    `📞 *WhatsApp:* ${phone}\n` +
    `✉️ *E-mail:* ${email}\n` +
    `🏠 *Endereço:* ${address}${geoFormatted}\n\n` +
    `🛒 *ITENS DO PEDIDO:*\n${itemsList}\n\n` +
    `💰 *VALOR TOTAL:* R$ ${subtotal.toFixed(2).replace('.', ',')}\n\n` +
    `✅ *Pagamento Simulado Aprovado!*`;

  const summaryWhatsappPreview = document.getElementById('summaryWhatsappPreview');
  if (summaryWhatsappPreview) {
    summaryWhatsappPreview.textContent = messageText;
  }

  const encodedMsg = encodeURIComponent(messageText);
  const whatsappUrl = `https://wa.me/${state.whatsappNumber}?text=${encodedMsg}`;

  const whatsappLinkBtn = document.getElementById('whatsappLinkBtn');
  if (whatsappLinkBtn) {
    whatsappLinkBtn.href = whatsappUrl;
  }
}
