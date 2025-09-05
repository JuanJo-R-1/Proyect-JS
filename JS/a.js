<<<<<<< HEAD
/*
Propósito: Lógica principal del marketplace. Maneja la carga y renderizado de productos, filtrado, búsqueda, orden, gestión del carrito, animaciones y navegación entre páginas. Utiliza localStorage para persistencia y configuración global.
*/
let carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
let productosGlobal = [];

function actualizarCarrito() {
  carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
  const cart = document.querySelector('.cart span');
  const totalCantidad = carrito.reduce((acc, p) => acc + (p.cantidad || 1), 0);
  cart.textContent = `Kart (${totalCantidad})`;
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

document.addEventListener('DOMContentLoaded', () => {
  cargarProductos();
  actualizarCarrito();
  document.getElementById('category').addEventListener('change', filtrarYRenderizar);
  document.getElementById('order').addEventListener('change', filtrarYRenderizar);
  document.getElementById('search').addEventListener('input', filtrarYRenderizar);
});

async function cargarProductos() {
  console.log('cargarProductos called');
  const grid = document.getElementById('grid');
  grid.innerHTML = '<div class="loading">Cargando productos...</div>';
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    if (!res.ok) throw new Error('API no disponible');
    productosGlobal = await res.json();
    console.log('productosGlobal after fetch:', productosGlobal);
    filtrarYRenderizar();
  } catch (err) {
    // Productos locales de ejemplo
    productosGlobal = [
      {
        id: 1,
        title: 'Camiseta básica',
        price: 19.99,
        image: 'https://via.placeholder.com/120x120?text=Camiseta',
        category: "men's clothing",
        description: 'Camiseta de algodón para uso diario.'
      },
      {
        id: 2,
        title: 'Collar elegante',
        price: 49.99,
        image: 'https://via.placeholder.com/120x120?text=Collar',
        category: 'jewelery',
        description: 'Collar de plata con diseño moderno.'
      },
      {
        id: 3,
        title: 'Smartphone',
        price: 299.99,
        image: 'https://via.placeholder.com/120x120?text=Smartphone',
        category: 'electronics',
        description: 'Teléfono inteligente de última generación.'
      },
      {
        id: 4,
        title: 'Vestido de verano',
        price: 39.99,
        image: 'https://via.placeholder.com/120x120?text=Vestido',
        category: "women's clothing",
        description: 'Vestido fresco y cómodo para el verano.'
      }
    ];
    grid.innerHTML = '<div class="error">No se pudo conectar a la API. Mostrando productos de ejemplo.</div>';
    filtrarYRenderizar();
  }
}

function filtrarYRenderizar() {
  console.log('filtrarYRenderizar called', productosGlobal);
  const grid = document.getElementById('grid');
  let productos = [...productosGlobal];
  const categoria = document.getElementById('category').value;
  const orden = document.getElementById('order').value;
  const busqueda = document.getElementById('search').value.toLowerCase();
  if (categoria !== 'all') {
    productos = productos.filter(p => p.category === categoria);
  }
  if (busqueda) {
    productos = productos.filter(p => p.title.toLowerCase().includes(busqueda) || p.description.toLowerCase().includes(busqueda));
  }
  if (orden === 'price-asc') {
    productos.sort((a, b) => a.price - b.price);
  } else if (orden === 'price-desc') {
    productos.sort((a, b) => b.price - a.price);
  } else if (orden === 'name-asc') {
    productos.sort((a, b) => a.title.localeCompare(b.title));
  } else if (orden === 'name-desc') {
    productos.sort((a, b) => b.title.localeCompare(a.title));
  }
  if (productos.length === 0) {
    grid.innerHTML = `<div class="card">
      <img src="https://via.placeholder.com/120x120?text=Test" alt="Test" style="height:160px;object-fit:contain;width:100%;border-radius:10px;background:#fff;" />
      <div class="place">Producto de prueba</div>
      <div class="meta">test</div>
      <div style="font-weight:700;font-size:18px;color:#4f8cff;">$0.00</div>
      <div style="margin-top:8px;"><button>Agregar al carrito</button></div>
    </div>`;
    return;
  }
  grid.innerHTML = productos.map(producto => `
    <div class="card" onclick="verProducto(${producto.id})">
      <img src="${producto.image}" alt="${producto.title}" style="height:160px;object-fit:contain;width:100%;border-radius:10px;background:#fff;" />
      <div class="place">${producto.title}</div>
      <div class="meta">${producto.category}</div>
      <div style="font-weight:700;font-size:18px;color:#4f8cff;">$${producto.price}</div>
      <div style="margin-top:8px;">
        <button onclick="agregarAlCarrito(event, ${producto.id})">Agregar al carrito</button>
      </div>
    </div>
  `).join('');
}

window.agregarAlCarrito = function(event, id) {
  event.stopPropagation();
  const producto = productosGlobal.find(p => p.id === id);
  let carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
  const idx = carrito.findIndex(item => item.id === id);
  if (idx !== -1) {
    carrito[idx].cantidad = (carrito[idx].cantidad || 1) + 1;
    carrito[idx].title = producto.title;
    carrito[idx].price = producto.price;
    carrito[idx].image = producto.image;
    carrito[idx].category = producto.category;
  } else {
    carrito.push({
      id: producto.id,
      title: producto.title,
      price: producto.price,
      image: producto.image,
      category: producto.category,
      cantidad: 1
    });
  }
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();
  // Animación pulse en el botón
  if(event.target && event.target.classList) {
    event.target.classList.add('pulse');
    setTimeout(() => event.target.classList.remove('pulse'), 400);
  }
}

window.agregarAlCarritoDetalle = function(id, title, price) {
  const producto = JSON.parse(localStorage.getItem('productoDetalle'));
  let carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
  const idx = carrito.findIndex(item => item.id === id);
  if (idx !== -1) {
    carrito[idx].cantidad += 1;
  } else {
    carrito.push({
      id: producto.id,
      title: producto.title,
      price: producto.price,
      image: producto.image,
      category: producto.category,
      cantidad: 1
    });
  }
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();
}

window.verProducto = function(id) {
  localStorage.setItem('productoDetalle', JSON.stringify(productosGlobal.find(p => p.id === id)));
  window.location.href = 'detalle.html';
}
=======
let carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
let productosGlobal = [];

function actualizarCarrito() {
  carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
  const cart = document.querySelector('.cart span');
  const totalCantidad = carrito.reduce((acc, p) => acc + (p.cantidad || 1), 0);
  cart.textContent = `Kart (${totalCantidad})`;
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

document.addEventListener('DOMContentLoaded', () => {
  cargarProductos();
  actualizarCarrito();
  document.getElementById('category').addEventListener('change', filtrarYRenderizar);
  document.getElementById('order').addEventListener('change', filtrarYRenderizar);
  document.getElementById('search').addEventListener('input', filtrarYRenderizar);
});

async function cargarProductos() {
  console.log('cargarProductos called');
  const grid = document.getElementById('grid');
  grid.innerHTML = '<div class="loading">Cargando productos...</div>';
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    if (!res.ok) throw new Error('API no disponible');
    productosGlobal = await res.json();
    console.log('productosGlobal after fetch:', productosGlobal);
    filtrarYRenderizar();
  } catch (err) {
    // Productos locales de ejemplo
    productosGlobal = [
      {
        id: 1,
        title: 'Camiseta básica',
        price: 19.99,
        image: 'https://via.placeholder.com/120x120?text=Camiseta',
        category: "men's clothing",
        description: 'Camiseta de algodón para uso diario.'
      },
      {
        id: 2,
        title: 'Collar elegante',
        price: 49.99,
        image: 'https://via.placeholder.com/120x120?text=Collar',
        category: 'jewelery',
        description: 'Collar de plata con diseño moderno.'
      },
      {
        id: 3,
        title: 'Smartphone',
        price: 299.99,
        image: 'https://via.placeholder.com/120x120?text=Smartphone',
        category: 'electronics',
        description: 'Teléfono inteligente de última generación.'
      },
      {
        id: 4,
        title: 'Vestido de verano',
        price: 39.99,
        image: 'https://via.placeholder.com/120x120?text=Vestido',
        category: "women's clothing",
        description: 'Vestido fresco y cómodo para el verano.'
      }
    ];
    grid.innerHTML = '<div class="error">No se pudo conectar a la API. Mostrando productos de ejemplo.</div>';
    filtrarYRenderizar();
  }
}

function filtrarYRenderizar() {
  console.log('filtrarYRenderizar called', productosGlobal);
  const grid = document.getElementById('grid');
  let productos = [...productosGlobal];
  const categoria = document.getElementById('category').value;
  const orden = document.getElementById('order').value;
  const busqueda = document.getElementById('search').value.toLowerCase();
  if (categoria !== 'all') {
    productos = productos.filter(p => p.category === categoria);
  }
  if (busqueda) {
    productos = productos.filter(p => p.title.toLowerCase().includes(busqueda) || p.description.toLowerCase().includes(busqueda));
  }
  if (orden === 'price-asc') {
    productos.sort((a, b) => a.price - b.price);
  } else if (orden === 'price-desc') {
    productos.sort((a, b) => b.price - a.price);
  } else if (orden === 'name-asc') {
    productos.sort((a, b) => a.title.localeCompare(b.title));
  } else if (orden === 'name-desc') {
    productos.sort((a, b) => b.title.localeCompare(a.title));
  }
  if (productos.length === 0) {
    grid.innerHTML = `<div class="card">
      <img src="https://via.placeholder.com/120x120?text=Test" alt="Test" style="height:160px;object-fit:contain;width:100%;border-radius:10px;background:#fff;" />
      <div class="place">Producto de prueba</div>
      <div class="meta">test</div>
      <div style="font-weight:700;font-size:18px;color:#4f8cff;">$0.00</div>
      <div style="margin-top:8px;"><button>Agregar al carrito</button></div>
    </div>`;
    return;
  }
  grid.innerHTML = productos.map(producto => `
    <div class="card" onclick="verProducto(${producto.id})">
      <img src="${producto.image}" alt="${producto.title}" style="height:160px;object-fit:contain;width:100%;border-radius:10px;background:#fff;" />
      <div class="place">${producto.title}</div>
      <div class="meta">${producto.category}</div>
      <div style="font-weight:700;font-size:18px;color:#4f8cff;">$${producto.price}</div>
      <div style="margin-top:8px;">
        <button onclick="agregarAlCarrito(event, ${producto.id})">Agregar al carrito</button>
      </div>
    </div>
  `).join('');
}

window.agregarAlCarrito = function(event, id) {
  console.log('agregarAlCarrito called', event, id);
  event.stopPropagation();
  const producto = productosGlobal.find(p => p.id === id);
  console.log('producto encontrado:', producto);
  let carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
  const idx = carrito.findIndex(item => item.id === id);
  if (idx !== -1) {
    carrito[idx].cantidad = (carrito[idx].cantidad || 1) + 1;
    carrito[idx].title = producto.title;
    carrito[idx].price = producto.price;
    carrito[idx].image = producto.image;
    carrito[idx].category = producto.category;
  } else {
    carrito.push({
      id: producto.id,
      title: producto.title,
      price: producto.price,
      image: producto.image,
      category: producto.category,
      cantidad: 1
    });
  }
  localStorage.setItem('carrito', JSON.stringify(carrito));
  carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
  actualizarCarrito();
}

window.agregarAlCarritoDetalle = function(id, title, price) {
  const producto = JSON.parse(localStorage.getItem('productoDetalle'));
  let carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
  const idx = carrito.findIndex(item => item.id === id);
  if (idx !== -1) {
    carrito[idx].cantidad += 1;
  } else {
    carrito.push({
      id: producto.id,
      title: producto.title,
      price: producto.price,
      image: producto.image,
      category: producto.category,
      cantidad: 1
    });
  }
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarCarrito();
}

window.verProducto = function(id) {
  localStorage.setItem('productoDetalle', JSON.stringify(productosGlobal.find(p => p.id === id)));
  window.location.href = 'detalle.html';
}
>>>>>>> 178764ac937563fe0cf915010092dde7895a8f81
