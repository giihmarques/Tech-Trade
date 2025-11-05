
// ========== DADOS DO SISTEMA ==========

// Produtos disponíveis no marketplace
const marketplaceProducts = [
    {
        id: 1,
        name: "iPhone 14 Pro Max 256GB",
        price: 7999.99,
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "smartphone",
        brand: "apple",
        condition: "new",
        rating: 4.8,
        seller: "TechStore Oficial"
    },
    {
        id: 2,
        name: "Samsung Galaxy S23 Ultra 512GB",
        price: 6499.99,
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "smartphone",
        brand: "samsung",
        condition: "new",
        rating: 4.7,
        seller: "EletroTech"
    },
    {
        id: 3,
        name: "Xiaomi Redmi Note 12 128GB",
        price: 1499.99,
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "smartphone",
        brand: "xiaomi",
        condition: "new",
        rating: 4.5,
        seller: "China Import"
    },
    {
        id: 4,
        name: "iPad Pro 12.9'' 128GB",
        price: 8999.99,
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "tablet",
        brand: "apple",
        condition: "new",
        rating: 4.9,
        seller: "TechStore Oficial"
    },
    {
        id: 5,
        name: "MacBook Air M2 256GB",
        price: 11999.99,
        image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "notebook",
        brand: "apple",
        condition: "new",
        rating: 4.8,
        seller: "Apple Premium"
    },
    {
        id: 6,
        name: "Samsung Galaxy Tab S8 128GB",
        price: 3999.99,
        image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "tablet",
        brand: "samsung",
        condition: "new",
        rating: 4.6,
        seller: "EletroTech"
    },
    {
        id: 7,
        name: "AirPods Pro 2ª Geração",
        price: 1999.99,
        image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "headphone",
        brand: "apple",
        condition: "new",
        rating: 4.7,
        seller: "TechStore Oficial"
    },
    {
        id: 8,
        name: "Apple Watch Series 8",
        price: 3499.99,
        image: "https://images.unsplash.com/photo-1579586337278-3f4364269b5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "smartwatch",
        brand: "apple",
        condition: "new",
        rating: 4.6,
        seller: "Apple Premium"
    }
];

// Produtos do vendedor logado
let sellerProducts = [
    {
        id: 101,
        name: "iPhone 14 Pro Max 256GB",
        price: 7999.99,
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "smartphone",
        stock: 15,
        status: "active",
        sales: 42,
        rating: 4.8
    },
    {
        id: 102,
        name: "Samsung Galaxy S23 Ultra",
        price: 6499.99,
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "smartphone",
        stock: 8,
        status: "active",
        sales: 28,
        rating: 4.7
    },
    {
        id: 103,
        name: "AirPods Pro 2ª Geração",
        price: 1999.99,
        image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        category: "headphone",
        stock: 0,
        status: "inactive",
        sales: 56,
        rating: 4.7
    }
];

const sellerOrders = [
    {
        id: "ORD-001",
        customer: "João Silva",
        product: "iPhone 14 Pro Max",
        date: "15/11/2023",
        amount: 7999.99,
        status: "pending"
    },
    {
        id: "ORD-002",
        customer: "Maria Santos",
        product: "Samsung Galaxy S23 Ultra",
        date: "14/11/2023",
        amount: 6499.99,
        status: "shipped"
    },
    {
        id: "ORD-003",
        customer: "Pedro Oliveira",
        product: "AirPods Pro",
        date: "13/11/2023",
        amount: 1999.99,
        status: "delivered"
    }
];

// Carrinho de compras
let cart = [];
let currentEditingProductId = null;

// ========== ELEMENTOS DOM ==========
const elements = {
    // Modo
    modeSwitcher: document.getElementById('mode-switcher'),
    dashboardHeader: document.getElementById('dashboard-header'),
    heroSection: document.getElementById('hero-section'),

    // Navegação
    mainNav: document.getElementById('main-nav'),
    navLinks: document.querySelectorAll('.nav-link'),
    menuLinks: document.querySelectorAll('.menu-link'),

    // Sidebars
    filtersSidebar: document.getElementById('filters-sidebar'),
    sellerSidebar: document.getElementById('seller-sidebar'),

    // Seções de conteúdo
    contentSections: document.querySelectorAll('.content-section'),
    productsMain: document.getElementById('products-main'),

    // Produtos
    productGrid: document.getElementById('product-grid'),
    sellerProductGrid: document.getElementById('seller-product-grid'),

    // Pedidos
    ordersTableBody: document.getElementById('orders-table-body'),

    // Carrinho
    cartBtn: document.getElementById('cart-btn'),
    cartCount: document.getElementById('cart-count'),
    cartModal: document.getElementById('cart-modal'),
    cartItems: document.getElementById('cart-items'),
    cartSubtotal: document.getElementById('cart-subtotal'),
    cartShipping: document.getElementById('cart-shipping'),
    cartTotal: document.getElementById('cart-total'),
    checkoutBtn: document.getElementById('checkout-btn'),

    // Pagamento
    paymentModal: document.getElementById('payment-modal'),
    paymentMethods: document.querySelectorAll('.payment-method'),
    paymentForms: document.querySelectorAll('.payment-form'),
    confirmPaymentBtn: document.getElementById('confirm-payment'),
    cardInstallments: document.getElementById('card-installments'),
    generateBoleto: document.getElementById('generate-boleto'),

    // Produtos do vendedor
    addProductModal: document.getElementById('add-product-modal'),
    addProductBtn: document.getElementById('add-product-btn'),
    addProductForm: document.getElementById('add-product-form'),
    productModalTitle: document.getElementById('product-modal-title'),
    submitProductBtn: document.getElementById('submit-product-btn'),

    // Filtros e busca
    searchInput: document.getElementById('search-input'),
    searchBtn: document.getElementById('search-btn'),
    applyFilters: document.getElementById('apply-filters'),
    sortOptions: document.getElementById('sort-options'),
    categoryFilters: document.querySelectorAll('#category-filters input'),
    brandFilters: document.querySelectorAll('#brand-filters input'),
    priceRange: document.getElementById('price-range'),
    minPrice: document.getElementById('min-price'),
    maxPrice: document.getElementById('max-price'),

    // Modais
    closeModalBtns: document.querySelectorAll('.close-modal'),

    // Estatísticas
    totalProducts: document.getElementById('total-products'),
    totalOrders: document.getElementById('total-orders'),
    totalRevenue: document.getElementById('total-revenue'),
    rating: document.getElementById('rating')
};

// ========== ESTADO DO SISTEMA ==========
const state = {
    currentMode: 'buyer',
    currentSection: 'marketplace',
    filteredProducts: [...marketplaceProducts],
    currentFilters: {
        categories: ['smartphone', 'tablet', 'notebook', 'headphone', 'smartwatch'],
        brands: ['apple', 'samsung', 'xiaomi', 'motorola', 'sony'],
        minPrice: 0,
        maxPrice: 10000
    }
};

// ========== INICIALIZAÇÃO ==========
function init() {
    renderMarketplaceProducts();
    renderSellerProducts();
    renderOrders();
    setupEventListeners();
    updateUIForMode();
}

// ========== RENDERIZAÇÃO ==========
function renderMarketplaceProducts() {
    elements.productGrid.innerHTML = '';

    state.filteredProducts.forEach(product => {
        const productCard = createProductCard(product, 'buyer');
        elements.productGrid.appendChild(productCard);
    });
}

function renderSellerProducts() {
    elements.sellerProductGrid.innerHTML = '';

    sellerProducts.forEach(product => {
        const productCard = createProductCard(product, 'seller');
        elements.sellerProductGrid.appendChild(productCard);
    });

    // Atualizar estatísticas
    elements.totalProducts.textContent = sellerProducts.length;
}

function renderOrders() {
    elements.ordersTableBody.innerHTML = '';

    sellerOrders.forEach(order => {
        const orderRow = document.createElement('tr');
        orderRow.innerHTML = `
                                    <td>${order.id}</td>
                                    <td>${order.customer}</td>
                                    <td>${order.product}</td>
                                    <td>${order.date}</td>
                                    <td>R$ ${order.amount.toFixed(2).replace('.', ',')}</td>
                                    <td>
                                        <span class="order-status status-${order.status}">
                                            ${order.status === 'pending' ? 'Pendente' :
                order.status === 'shipped' ? 'Enviado' : 'Entregue'}
                                        </span>
                                    </td>
                                    <td>
                                        <button class="action-btn edit-btn" data-id="${order.id}">Detalhes</button>
                                    </td>
                                `;
        elements.ordersTableBody.appendChild(orderRow);
    });
}

function createProductCard(product, mode) {
    const card = document.createElement('div');
    card.className = 'product-card';

    if (mode === 'buyer') {
        card.innerHTML = `
                                    <div class="product-image">
                                        <img src="${product.image}" alt="${product.name}" onerror="this.src='https://images.unsplash.com/photo-1565849904461-04a58ad377e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'">
                                    </div>
                                    <div class="product-info">
                                        <div class="product-title">${product.name}</div>
                                        <div class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</div>
                                        <div style="font-size: 0.8rem; color: #666; margin-bottom: 0.5rem;">Vendido por: ${product.seller}</div>
                                        <div class="product-rating">
                                            ${'★'.repeat(Math.floor(product.rating))}${product.rating % 1 >= 0.5 ? '½' : ''}
                                            <span>${product.rating}</span>
                                        </div>
                                        <button class="add-to-cart" data-id="${product.id}">Adicionar ao Carrinho</button>
                                    </div>
                                `;
    } else {
        card.innerHTML = `
                                    <div class="product-image">
                                        <img src="${product.image}" alt="${product.name}" onerror="this.src='https://images.unsplash.com/photo-1565849904461-04a58ad377e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'">
                                    </div>
                                    <div class="product-info">
                                        <div class="product-title">${product.name}</div>
                                        <div class="product-price">R$ ${product.price.toFixed(2).replace('.', ',')}</div>
                                        <div style="font-size: 0.9rem; color: #666; margin-bottom: 0.5rem;">
                                            Estoque: ${product.stock} | Vendidos: ${product.sales}
                                        </div>
                                        <div class="product-status ${product.status === 'active' ? 'status-active' : 'status-inactive'}">
                                            ${product.status === 'active' ? 'Ativo' : 'Inativo'}
                                        </div>
                                        <div class="product-actions">
                                            <button class="action-btn edit-btn" data-id="${product.id}">Editar</button>
                                            <button class="action-btn delete-btn" data-id="${product.id}">Excluir</button>
                                        </div>
                                    </div>
                                `;
    }

    return card;
}

// ========== EVENT LISTENERS ==========
function setupEventListeners() {
    // Alternância de modo
    elements.modeSwitcher.addEventListener('click', toggleMode);

    // Navegação
    elements.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.target.getAttribute('data-section');
            showSection(section);
            setActiveNavLink(e.target);
        });
    });

    elements.menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.target.getAttribute('data-section');
            showSection(section);
            setActiveMenuLink(e.target);
        });
    });

    // Carrinho
    elements.cartBtn.addEventListener('click', (e) => {
        e.preventDefault();
        updateCartDisplay();
        elements.cartModal.style.display = 'flex';
    });

    elements.checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }
        elements.cartModal.style.display = 'none';
        elements.paymentModal.style.display = 'flex';
    });

    // Pagamento
    elements.paymentMethods.forEach(method => {
        method.addEventListener('click', (e) => {
            const methodType = e.currentTarget.getAttribute('data-method');
            selectPaymentMethod(methodType);
        });
    });

    elements.confirmPaymentBtn.addEventListener('click', processPayment);
    elements.generateBoleto.addEventListener('click', generateBoleto);

    // Produtos do vendedor
    elements.addProductBtn.addEventListener('click', () => {
        openAddProductModal();
    });

    elements.addProductForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (currentEditingProductId) {
            updateProduct(currentEditingProductId);
        } else {
            addNewProduct();
        }
    });

    // Filtros e busca
    elements.searchBtn.addEventListener('click', performSearch);
    elements.searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });

    elements.applyFilters.addEventListener('click', applyProductFilters);
    elements.sortOptions.addEventListener('change', sortProducts);

    // Atualização de preço
    elements.priceRange.addEventListener('input', updatePriceInputs);
    elements.minPrice.addEventListener('change', updatePriceRange);
    elements.maxPrice.addEventListener('change', updatePriceRange);

    // Fechar modais
    elements.closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            elements.cartModal.style.display = 'none';
            elements.paymentModal.style.display = 'none';
            elements.addProductModal.style.display = 'none';
        });
    });

    // Fechar modais ao clicar fora
    window.addEventListener('click', (e) => {
        if (e.target === elements.cartModal) elements.cartModal.style.display = 'none';
        if (e.target === elements.paymentModal) elements.paymentModal.style.display = 'none';
        if (e.target === elements.addProductModal) elements.addProductModal.style.display = 'none';
    });
}

// ========== FUNCIONALIDADES PRINCIPAIS ==========

// Alternância entre modos
function toggleMode() {
    state.currentMode = state.currentMode === 'buyer' ? 'seller' : 'buyer';
    updateUIForMode();
}

function updateUIForMode() {
    if (state.currentMode === 'seller') {
        // Modo vendedor
        elements.modeSwitcher.innerHTML = '<span>🛒 Modo Comprador</span>';
        elements.modeSwitcher.classList.remove('buyer');
        elements.dashboardHeader.classList.remove('buyer');
        elements.heroSection.style.display = 'none';
        elements.dashboardHeader.style.display = 'block';
        elements.filtersSidebar.style.display = 'none';
        elements.sellerSidebar.style.display = 'block';
        elements.mainNav.style.display = 'block';
        showSection('products');
    } else {
        // Modo comprador
        elements.modeSwitcher.innerHTML = '<span>🔧 Modo Vendedor</span>';
        elements.modeSwitcher.classList.add('buyer');
        elements.dashboardHeader.classList.add('buyer');
        elements.heroSection.style.display = 'block';
        elements.dashboardHeader.style.display = 'none';
        elements.filtersSidebar.style.display = 'block';
        elements.sellerSidebar.style.display = 'none';
        elements.mainNav.style.display = 'block';
        showSection('marketplace');
    }
}

// Navegação entre seções
function showSection(section) {
    state.currentSection = section;
    elements.contentSections.forEach(sec => {
        sec.classList.remove('active');
    });
    document.getElementById(`${section}-section`).classList.add('active');
}

function setActiveNavLink(activeLink) {
    elements.navLinks.forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

function setActiveMenuLink(activeLink) {
    elements.menuLinks.forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// Sistema de carrinho
function addToCart(productId) {
    const product = marketplaceProducts.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    updateCartDisplay();
    alert(`${product.name} adicionado ao carrinho!`);
}

function updateCartDisplay() {
    // Atualizar contador
    elements.cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);

    // Atualizar itens
    elements.cartItems.innerHTML = '';

    if (cart.length === 0) {
        elements.cartItems.innerHTML = '<p style="text-align: center;">Seu carrinho está vazio.</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                                        <div class="cart-item-image">
                                            <img src="${item.image}" alt="${item.name}">
                                        </div>
                                        <div class="cart-item-info">
                                            <div class="cart-item-title">${item.name}</div>
                                            <div class="cart-item-price">R$ ${item.price.toFixed(2).replace('.', ',')}</div>
                                        </div>
                                        <div class="cart-item-actions">
                                            <div class="quantity-control">
                                                <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, 'decrease')">-</button>
                                                <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                                                <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, 'increase')">+</button>
                                            </div>
                                            <button class="remove-item" onclick="removeFromCart(${item.id})">Remover</button>
                                        </div>
                                    `;
            elements.cartItems.appendChild(cartItem);
        });
    }

    updateCartTotals();
}

function updateCartQuantity(productId, action) {
    const item = cart.find(item => item.id === productId);

    if (item) {
        if (action === 'increase') {
            item.quantity += 1;
        } else if (action === 'decrease' && item.quantity > 1) {
            item.quantity -= 1;
        }

        updateCartDisplay();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

function updateCartTotals() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 15.00 : 0;
    const total = subtotal + shipping;

    elements.cartSubtotal.textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    elements.cartShipping.textContent = `R$ ${shipping.toFixed(2).replace('.', ',')}`;
    elements.cartTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;

    updateInstallmentOptions(total);
}

function updateInstallmentOptions(total) {
    elements.cardInstallments.innerHTML = '';

    for (let i = 1; i <= 12; i++) {
        const installmentValue = total / i;
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i}x de R$ ${installmentValue.toFixed(2).replace('.', ',')} ${i <= 3 ? 'sem juros' : 'com juros'}`;
        elements.cardInstallments.appendChild(option);
    }
}

// Sistema de pagamento
function selectPaymentMethod(methodType) {
    elements.paymentMethods.forEach(m => m.classList.remove('selected'));
    event.currentTarget.classList.add('selected');

    elements.paymentForms.forEach(form => form.classList.remove('active'));
    document.getElementById(`${methodType}-form`).classList.add('active');

    elements.confirmPaymentBtn.style.display = 'block';
}

function processPayment() {
    alert('Compra realizada com sucesso! Obrigado por comprar na TechTrade.');
    cart = [];
    updateCartDisplay();
    elements.paymentModal.style.display = 'none';
}

function generateBoleto() {
    alert('Boleto gerado com sucesso! Verifique seu email.');
    elements.paymentModal.style.display = 'none';
}

// Sistema de produtos do vendedor
function openAddProductModal(productId = null) {
    currentEditingProductId = productId;

    if (productId) {
        elements.productModalTitle.textContent = 'Editar Produto';
        elements.submitProductBtn.textContent = 'Atualizar Produto';
        fillProductForm(productId);
    } else {
        elements.productModalTitle.textContent = 'Adicionar Novo Produto';
        elements.submitProductBtn.textContent = 'Adicionar Produto';
        elements.addProductForm.reset();
    }

    elements.addProductModal.style.display = 'flex';
}

function fillProductForm(productId) {
    const product = sellerProducts.find(p => p.id === productId);
    if (product) {
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-category').value = product.category;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-stock').value = product.stock;
        document.getElementById('product-description').value = product.description || '';
        document.getElementById('product-image').value = product.image;
        document.getElementById('product-status').value = product.status;
    }
}

function addNewProduct() {
    const formData = getProductFormData();
    const newProduct = {
        id: Date.now(),
        ...formData,
        sales: 0,
        rating: 0
    };

    sellerProducts.push(newProduct);
    renderSellerProducts();
    elements.addProductModal.style.display = 'none';
    alert('Produto adicionado com sucesso!');
}

function updateProduct(productId) {
    const productIndex = sellerProducts.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
        const formData = getProductFormData();
        sellerProducts[productIndex] = {
            ...sellerProducts[productIndex],
            ...formData
        };

        renderSellerProducts();
        elements.addProductModal.style.display = 'none';
        currentEditingProductId = null;
        alert('Produto atualizado com sucesso!');
    }
}

function getProductFormData() {
    return {
        name: document.getElementById('product-name').value,
        category: document.getElementById('product-category').value,
        price: parseFloat(document.getElementById('product-price').value),
        stock: parseInt(document.getElementById('product-stock').value),
        description: document.getElementById('product-description').value,
        image: document.getElementById('product-image').value || 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
        status: document.getElementById('product-status').value
    };
}

function deleteProduct(productId) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
        sellerProducts = sellerProducts.filter(p => p.id !== productId);
        renderSellerProducts();
        alert('Produto excluído com sucesso!');
    }
}

// Sistema de busca e filtros
function performSearch() {
    const searchTerm = elements.searchInput.value.toLowerCase().trim();

    if (searchTerm) {
        state.filteredProducts = marketplaceProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.brand.toLowerCase().includes(searchTerm)
        );
        renderMarketplaceProducts();
        alert(`Mostrando resultados para: "${searchTerm}"`);
    }
}

function applyProductFilters() {
    const selectedCategories = Array.from(elements.categoryFilters)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    const selectedBrands = Array.from(elements.brandFilters)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);

    const minPrice = parseFloat(elements.minPrice.value) || 0;
    const maxPrice = parseFloat(elements.maxPrice.value) || 10000;

    state.filteredProducts = marketplaceProducts.filter(product =>
        selectedCategories.includes(product.category) &&
        selectedBrands.includes(product.brand) &&
        product.price >= minPrice &&
        product.price <= maxPrice
    );

    renderMarketplaceProducts();
    alert('Filtros aplicados com sucesso!');
}

function sortProducts() {
    const sortBy = elements.sortOptions.value;

    switch (sortBy) {
        case 'price-low':
            state.filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            state.filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            state.filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        default:
            state.filteredProducts = [...marketplaceProducts];
    }

    renderMarketplaceProducts();
}

function updatePriceInputs() {
    elements.minPrice.value = elements.priceRange.value;
}

function updatePriceRange() {
    elements.priceRange.value = elements.maxPrice.value;
}

// ========== EVENT DELEGATION ==========
document.addEventListener('click', function (e) {
    // Adicionar ao carrinho
    if (e.target.classList.contains('add-to-cart')) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        addToCart(productId);
    }

    // Editar produto (vendedor)
    if (e.target.classList.contains('edit-btn') && e.target.getAttribute('data-id')) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        if (state.currentMode === 'seller') {
            openAddProductModal(productId);
        }
    }

    // Excluir produto (vendedor)
    if (e.target.classList.contains('delete-btn') && e.target.getAttribute('data-id')) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        if (state.currentMode === 'seller') {
            deleteProduct(productId);
        }
    }
});

// ========== INICIALIZAÇÃO FINAL ==========
document.addEventListener('DOMContentLoaded', init);

// ========== FUNÇÕES GLOBAIS PARA HTML ==========
window.updateCartQuantity = updateCartQuantity;
window.removeFromCart = removeFromCart;
