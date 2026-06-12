const productsData = [
  {
    id: 'k1',
    name: 'Beras Kepala 5kg',
    desc: 'Beras kepala berkualitas tinggi, putih dan pulen.',
    price: 75000,
    category: 'kepala',
    image: 'assets/kepala5kg.jpg'
  },
  {
    id: 'k2',
    name: 'Beras Kepala 10kg',
    desc: 'Beras kepala kemasan 10kg, lebih hemat untuk keluarga.',
    price: 150000,
    category: 'kepala',
    image: 'assets/kepala10kg.jpg'
  },
  {
    id: 'k3',
    name: 'Beras Kepala 25kg',
    desc: 'Beras kepala kemasan 25kg, lebih hemat untuk keluarga.',
    price: 365000,
    category: 'kepala',
    image: 'assets/bramo25kgb.jpg'
  },
  {
    id: 'k4',
    name: 'Beras Kepala 50kg',
    desc: 'Beras kepala kemasan 50g, cocok untuk usaha..',
    price: 700000,
    category: 'kepala',
    image: 'assets/beras50kgputih.PNG'
  },
  
  {
    id: 'b1',
    name: 'Beras Bramo 5kg',
    desc: 'Beras Bramo pilihan, wangi dan lezat.',
    price: 75000,
    category: 'bramo',
    image: 'assets/bramo5kg.jpg'
  },
  {
    id: 'b2',
    name: 'Beras Bramo 10kg',
    desc: 'Beras Bramo pilihan kemasan 10kg.',
    price: 150000,
    category: 'bramo',
    image: 'assets/bramo10kg.jpg'
  },
  {
    id: 'b3',
    name: 'Beras Bramo 25kg Biru',
    desc: 'Beras Bramo karung biru 25kg, lebih hemat untuk keluarga.',
    price: 365000,
    category: 'bramo',
    image: 'assets/bramo25kgb.jpg'
  },
  {
    id: 'b4',
    name: 'Beras Bramo 50kg Merah',
    desc: 'Beras Bramo karung merah 50kg, cocok untuk usaha.',
    price: 700000,
    category: 'bramo',
    image: 'assets/beras50kgputih.PNG'
  },
  {
    id: 's1',
    name: 'Beras SuperWin 5kg',
    desc: 'Beras SuperWin 5kg pulen dan mekar.',
    price: 80000,
    category: 'superwin',
    image: 'assets/superWin5kg.jpg'
  },
  {
    id: 's2',
    name: 'Beras Superwin 10kg',
    desc: 'Beras Superwin 10kg pulen dan mekar.',
    price: 160000,
    category: 'superwin',
    image: 'assets/superWin10kg.jpg'
  },
  {
    id: 's3',
    name: 'Beras Superwin 25kg',
    desc: 'Beras Superwin 25kg pulen dan mekar.',
    price: 380000,
    category: 'superwin',
    image: 'assets/bramo25kgm.jpg'
  },
  {
    id: 's4',
    name: 'Beras Superwin 50kg',
    desc: 'Beras Superwin 50kg pulen dan mekar.',
    price: 750000,
    category: 'superwin',
    image: 'assets/beras50kgkuning.PNG'
  },
  {
    id: 'c1',
    name: 'Beras Cinta Nur 5kg',
    desc: 'Beras Cinta Nur wangi pandan alami 5kg.',
    price: 85000,
    category: 'cintanur',
    image: 'assets/cintaNur5kg.jpg'
  },
  {
    id: 'c2',
    name: 'Beras Cinta Nur 10kg',
    desc: 'Beras Cinta Nur wangi pandan alami 10kg.',
    price: 170000,
    category: 'cintanur',
    image: 'assets/cintaNur10kg.jpg'
  },
  {
    id: 'c3',
    name: 'Beras Cinta Nur 25kg',
    desc: 'Beras Cinta Nur wangi pandan alami 25kg.',
    price: 400000,
    category: 'cintanur',
    image: 'assets/bramo25kgm.jpg'
  },
  {
    id: 'c4',
    name: 'Beras Cinta Nur 50kg',
    desc: 'Beras Cinta Nur wangi pandan alami 50kg.',
    price: 800000,
    category: 'cintanur',
    image: 'assets/beras50kgkuning.PNG'
  },
  {
    id: 'p1',
    name: 'Beras Sania 5kg',
    desc: 'Beras Premium Sania 5kg berkualitas tinggi.',
    price: 85000,
    category: 'premium',
    image: 'assets/sania5kg.jpg'
  },
  {
    id: 'p2',
    name: 'Beras Sania 10kg',
    desc: 'Beras Premium Sania 10kg berkualitas tinggi.',
    price: 170000,
    category: 'premium',
    image: 'assets/sania10kg.jpg'
  },
  {
    id: 'p3',
    name: 'Beras Fortune 5kg',
    desc: 'Beras Premium Fortune 5kg.',
    price: 85000,
    category: 'premium',
    image: 'assets/fortune5kg.jpg'
  },
  {
    id: 'p4',
    name: 'Beras Fortune 10kg',
    desc: 'Beras Premium Fortune 10kg.',
    price: 170000,
    category: 'premium',
    image: 'assets/fortune10kg.jpg'
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