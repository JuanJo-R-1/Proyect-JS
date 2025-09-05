let carrito = [];

function actualizarCarrito() {
  const cart = document.querySelector('.cart span');
  cart.textContent = `Carrito (${carrito.length})`;
}

document.addEventListener('DOMContentLoaded', () => {
  cargarProductos();
  actualizarCarrito();
});

async function cargarProductos() {
  const grid = document.getElementById('grid');
  grid.innerHTML = '<div class="loading">Cargando productos...</div>';
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    const productos = await res.json();
    grid.innerHTML = productos.map(producto => `
      <div class="card">
        <img src="${producto.image}" alt="${producto.title}" style="height:160px;object-fit:contain;width:100%;border-radius:10px;background:#fff;" />
        <div class="place">${producto.title}</div>
        <div class="meta">${producto.category}</div>
        <div style="font-weight:700;font-size:18px;color:#4f8cff;">$${producto.price}</div>
        <div style="margin-top:8px;">
          <button onclick="agregarAlCarrito(${producto.id}, '${producto.title}', ${producto.price})">Agregar al carrito</button>
        </div>
      </div>
    `).join('');
  } catch (err) {
    grid.innerHTML = '<div class="error">Error al cargar productos</div>';
  }
}

window.agregarAlCarrito = function(id, title, price) {
  carrito.push({id, title, price});
  actualizarCarrito();
}
