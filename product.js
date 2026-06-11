const productsData = [
  {
    id: 'k1',
    name: 'Beras Kepala 5kg',
    desc: 'Beras kepala berkualitas tinggi, putih dan pulen.',
    price: 65000,
    category: 'kepala',
    image: 'asets/kepala5kg.jpg'
  },
  {
    id: 'k2',
    name: 'Beras Kepala 10kg',
    desc: 'Beras kepala kemasan 10kg, lebih hemat untuk keluarga.',
    price: 125000,
    category: 'kepala',
    image: 'asets/kepala10kg.jpg'
  },
  {
    id: 'b1',
    name: 'Beras Bramo 5kg',
    desc: 'Beras Bramo pilihan, wangi dan lezat.',
    price: 68000,
    category: 'bramo',
    image: 'asets/bramo5kg.jpg'
  },
  {
    id: 'b2',
    name: 'Beras Bramo 10kg',
    desc: 'Beras Bramo pilihan kemasan 10kg.',
    price: 130000,
    category: 'bramo',
    image: 'asets/bramo10kg.jpg'
  },
  {
    id: 'b3',
    name: 'Beras Bramo 25kg Biru',
    desc: 'Beras Bramo karung biru 25kg, cocok untuk usaha.',
    price: 320000,
    category: 'bramo',
    image: 'asets/bramo25kgb.jpg'
  },
  {
    id: 'b4',
    name: 'Beras Bramo 25kg Merah',
    desc: 'Beras Bramo karung merah 25kg, kualitas premium.',
    price: 325000,
    category: 'bramo',
    image: 'asets/bramo25kgm.jpg'
  },
  {
    id: 's1',
    name: 'Beras Superwin 5kg',
    desc: 'Beras Superwin 5kg pulen dan mekar.',
    price: 63000,
    category: 'superwin',
    image: 'asets/superWin5kg.jpg'
  },
  {
    id: 's2',
    name: 'Beras Superwin 10kg',
    desc: 'Beras Superwin 10kg pulen dan mekar.',
    price: 120000,
    category: 'superwin',
    image: 'asets/superWin10kg.jpg'
  },
  {
    id: 'c1',
    name: 'Beras Cinta Nur 5kg',
    desc: 'Beras Cinta Nur wangi pandan alami 5kg.',
    price: 70000,
    category: 'cintanur',
    image: 'asets/cintaNur5kg.jpg'
  },
  {
    id: 'c2',
    name: 'Beras Cinta Nur 10kg',
    desc: 'Beras Cinta Nur wangi pandan alami 10kg.',
    price: 135000,
    category: 'cintanur',
    image: 'asets/cintaNur10kg.jpg'
  },
  {
    id: 'p1',
    name: 'Beras Sania 5kg',
    desc: 'Beras Premium Sania 5kg berkualitas tinggi.',
    price: 75000,
    category: 'premium',
    image: 'asets/sania5kg.jpg'
  },
  {
    id: 'p2',
    name: 'Beras Sania 10kg',
    desc: 'Beras Premium Sania 10kg berkualitas tinggi.',
    price: 145000,
    category: 'premium',
    image: 'asets/sania10kg.jpg'
  },
  {
    id: 'p3',
    name: 'Beras Fortune 5kg',
    desc: 'Beras Premium Fortune 5kg.',
    price: 73000,
    category: 'premium',
    image: 'asets/fortune5kg.jpg'
  },
  {
    id: 'p4',
    name: 'Beras Fortune 10kg',
    desc: 'Beras Premium Fortune 10kg.',
    price: 140000,
    category: 'premium',
    image: 'asets/fortune10kg.jpg'
  }
];

let cart = [];
let currentModalItem = null;

document.addEventListener('DOMContentLoaded', initProducts);

function initProducts() {
  if (!document.getElementById('sectionProducts')) return;

  renderProducts();
  updateCartUI();
}

function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number);
}

function renderProducts() {
  const grids = {
    kepala: document.getElementById('gridKepala'),
    bramo: document.getElementById('gridBramo'),
    superwin: document.getElementById('gridSuperwin'),
    cintanur: document.getElementById('gridCintanur'),
    premium: document.getElementById('gridPremium')
  };

  Object.values(grids).forEach(grid => {
    if (grid) grid.innerHTML = '';
  });

  productsData.forEach(product => {
    const grid = grids[product.category];
    if (!grid) return;

    grid.insertAdjacentHTML('beforeend', createProductCard(product));
  });
}

function createProductCard(product) {
  return `
    <div class="product-card">
      <div class="card-img-wrapper" onclick="openModal('${product.id}')">
        <img src="${product.image}" alt="${product.name}" class="card-img" />
      </div>
      <div class="card-body">
        <h3 class="card-title">${product.name}</h3>
        <p class="card-desc">${product.desc}</p>
        <div class="card-footer">
          <span class="card-price">${formatRupiah(product.price)}</span>
        </div>
      </div>
    </div>
  `;
}

function filterCategory(cat) {
  document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.innerText.toLowerCase().includes(cat === 'semua' ? 'semua' : cat)) {
      btn.classList.add('active');
    }
  });

  document.querySelectorAll('.products-section').forEach(section => {
    section.style.display = cat === 'semua' || section.dataset.category === cat ? 'block' : 'none';
  });
}

function quickAdd(id) {
  const product = findProduct(id);
  if (!product) return;

  addToCart(product, 1);
  showToast(`${product.name} ditambahkan ke keranjang`);
}

function addToCart(product, qty) {
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.qty += qty;
  } else {
    cart.push({ ...product, qty });
  }

  updateCartUI();
}

function updateCartUI() {
  const cartItems = document.getElementById('cartItems');
  const cartFooter = document.getElementById('cartFooter');
  const cartTotal = document.getElementById('cartTotal');
  if (!cartItems || !cartFooter || !cartTotal) return;

  cartItems.innerHTML = '';

  if (cart.length === 0) {
    cartItems.innerHTML = '<div class="empty-state"><p>Keranjang masih kosong</p></div>';
    cartFooter.style.display = 'none';
    return;
  }

  let totalPrice = 0;
  cartFooter.style.display = 'block';

  cart.forEach(item => {
    totalPrice += item.price * item.qty;
    cartItems.insertAdjacentHTML('beforeend', createCartItem(item));
  });

  cartTotal.textContent = formatRupiah(totalPrice);
}

function createCartItem(item) {
  return `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
      <div class="cart-item-info">
        <h4 class="cart-item-title">${item.name}</h4>
        <p class="cart-item-price">${formatRupiah(item.price)}</p>
        <div class="cart-item-qty">
          <button onclick="updateCartItemQty('${item.id}', -1)">&minus;</button>
          <span>${item.qty}</span>
          <button onclick="updateCartItemQty('${item.id}', 1)">+</button>
        </div>
      </div>
    </div>
  `;
}

function updateCartItemQty(id, delta) {
  const itemIndex = cart.findIndex(item => item.id === id);
  if (itemIndex === -1) return;

  cart[itemIndex].qty += delta;
  if (cart[itemIndex].qty <= 0) {
    cart.splice(itemIndex, 1);
  }

  updateCartUI();
}

function toggleCart() {
  const sidebar = document.getElementById('cartSidebar');
  const overlay = document.getElementById('cartOverlay');
  if (!sidebar || !overlay) return;

  sidebar.classList.toggle('open');
  overlay.classList.toggle('show');
}

function openModal(id) {
  const product = findProduct(id);
  if (!product) return;

  currentModalItem = { ...product, tempQty: 1 };

  document.getElementById('modalImg').src = product.image;
  document.getElementById('modalName').textContent = product.name;
  document.getElementById('modalDesc').textContent = product.desc;
  document.getElementById('modalPrice').textContent = formatRupiah(product.price);
  document.getElementById('modalQty').textContent = '1';

  document.getElementById('modalOverlay').classList.add('show');
  document.getElementById('itemModal').classList.add('show');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('show');
  document.getElementById('itemModal').classList.remove('show');
  currentModalItem = null;
}

function changeModalQty(delta) {
  if (!currentModalItem) return;

  currentModalItem.tempQty += delta;
  if (currentModalItem.tempQty < 1) currentModalItem.tempQty = 1;

  document.getElementById('modalQty').textContent = currentModalItem.tempQty;
}

function addFromModal() {
  if (!currentModalItem) return;

  addToCart(currentModalItem, currentModalItem.tempQty);
  showToast(`${currentModalItem.tempQty}x ${currentModalItem.name} ditambahkan`);
  closeModal();
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

function checkout() {
  if (cart.length === 0) return;

  const note = document.getElementById('orderNote').value;
  let message = 'Halo TOKO MUJUR, saya ingin memesan:\n\n';
  let total = 0;

  cart.forEach((item, index) => {
    message += `${index + 1}. ${item.name} (${item.qty}x) - ${formatRupiah(item.price * item.qty)}\n`;
    total += item.price * item.qty;
  });

  message += `\n*Total: ${formatRupiah(total)}*`;

  if (note) {
    message += `\n\nCatatan: ${note}`;
  }

  window.open(`https://wa.me/6282194311111?text=${encodeURIComponent(message)}`, '_blank');
}

function findProduct(id) {
  return productsData.find(product => product.id === id);
}
