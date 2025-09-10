function actualizarFavoritos() {
    favorito = JSON.parse(localStorage.getItem('favorito') || '[]');
    const cart = document.querySelector('.cart spans');
    const totalCantidad = favorito.reduce((acc, p) => acc + (p.cantidad || 1), 0);
    localStorage.setItem('favorito', JSON.stringify(favorito));
}

document.addEventListener('DOMSContentLoaded', () => {
    cargarProductos();
    actualizarFavoritos();
    document.getElementById('category').addEventListener('change', filtrarYRenderizarr);
    document.getElementById('order').addEventListener('change', filtrarYRenderizarr);
    document.getElementById('search').addEventListener('input', filtrarYRenderizarr);
});

async function cargarFavoritos() {
    console.log('cargarFavoritos called');
    const grid = document.getElementById('grid');
    grid.innerHTML = '<div class="loading">Cargando Favoritos...</div>';
    try {
        const res = await fetch('https://fakestoreapi.com/products');
        if (!res.ok) throw new Error('API no disponible');
        favoritosGlobal = await res.json();
        console.log('favoritosGlobal after fetch:', favoritosGlobal);
        filtrarYRenderizar();
    } catch (err) {
        // Productos locales de ejemplo
        favoritosGlobal = [
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
        filtrarYRenderizarr();
    }
}

function filtrarYRenderizarr() {
    console.log('filtrarYRenderizarn called', favoritosGlobal);
    const grid = document.getElementById('grid');
    let productos = [...favoritosGlobal];
    if (productos.length === 0) {
        grid.innerHTML = `<div class="card">
        <img src="https://via.placeholder.com/120x120?text=Test" alt="Test" style="height:160px;object-fit:contain;width:100%;border-radius:10px;background:#fff;" />
        <div class="place">Producto de prueba</div>
        <div class="meta">test</div>
        <div style="font-weight:700;font-size:18px;color:#4f8cff;">$0.00</div>
        <div style="margin-top:8px;"><button>Agregar al carrito</button></div>
        <div style="margin-top:8px;"><button>Agregar a Favoritos</button></div>
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
          <button onclick="agregarFavoritos(event, ${producto.id})">Agregar a Favoritos</button>
        </div>
      </div>
    `).join('');
}

window.agregarFavoritos = function (event, id) {
    event.stopPropagation();
    const producto = favoritosGlobal.find(p => p.id === id);
    let favorito = JSON.parse(localStorage.getItem('favorito') || '[]');
    const idx = favorito.findIndex(item => item.id === id);
    if (idx !== -1) {
        favoritoid[x].title = producto.title;
        favoritoid[x].price = producto.price;
        favoritoid[x].image = producto.image;
        favoritoid[x].cantidad = (favorito[idx].cantidad || 1) + 1;
        favoritoid[x].category = producto.category;
    } else {
        favorito.push({
            id: producto.id,
            title: producto.title,
            price: producto.price,
            image: producto.image,
            category: producto.category,
            cantidad: 1
        });
    }
    localStorage.setItem('favorito', JSON.stringify(favorito));
    actualizarFavoritos();
    // Animación pulse en el botón
    if (event.target && event.target.classList) {
        event.target.classList.add('pulse');
        setTimeout(() => event.target.classList.remove('pulse'), 400);
    }
}

window.agregarFavoritos = function (id, title, price) {
    const producto = JSON.parse(localStorage.getItem('productoDetalle'));
    let favorito = JSON.parse(localStorage.getItem('favorito') || '[]');
    const idx = favorito.findIndex(item => item.id === id);
    if (idx !== -1) {
        favorito[idx].cantidad += 1;
    } else {
        favorito.push({
            id: producto.id,
            title: producto.title,
            price: producto.price,
            image: producto.image,
            category: producto.category,
            cantidad: 1
        });
    }
    localStorage.setItem('favorito', JSON.stringify(favorito));
    actualizarFavoritos();
}

let favorito = JSON.parse(localStorage.getItem('favorito') || '[]');
let favoritosGlobal = [];