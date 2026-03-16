const productos = [
  { id: 1, nombre: "Vaso de Vidrio", categoria: "Vasos", precio: 12500, imagen: "../IMG/VASOS/VASOVIDRIO.JPG", badge: "Nuevo" },
  { id: 2, nombre: "Vaso Stanley Verde", categoria: "Vasos", precio: 28500, imagen: "../IMG/VASOS/VASOSTANLEYVERDE.JPG", badge: "Top" },
  { id: 3, nombre: "Vaso con Pajita", categoria: "Vasos", precio: 15900, imagen: "../IMG/VASOS/VASOCONPAJITA.JPG", badge: "Oferta" },
  { id: 4, nombre: "Vaso Vidrio Templado", categoria: "Vasos", precio: 18900, imagen: "../IMG/VASOS/VASOVIDRIOTEMPLADO.JPG", badge: "Nuevo" },
  { id: 5, nombre: "Vaso Cristal Dubai", categoria: "Vasos", precio: 22000, imagen: "../IMG/VASOS/VASOCRISTALDUBAI.JPG", badge: "Premium" },

  { id: 6, nombre: "Licuadora Philips", categoria: "Licuadoras", precio: 79000, imagen: "../IMG/LICUADORA/LICUADORAPHILIPS.JPG", badge: "Top" },
  { id: 7, nombre: "Licuadora Ultracomb", categoria: "Licuadoras", precio: 68000, imagen: "../IMG/LICUADORA/LICUADORAULTRACOMB.JPG", badge: "Oferta" },
  { id: 8, nombre: "Licuadora Liliana", categoria: "Licuadoras", precio: 73500, imagen: "../IMG/LICUADORA/LICUADORALILIANA.JPG", badge: "Nuevo" },

  { id: 9, nombre: "Yogurtera Winco", categoria: "Yogurteras", precio: 54000, imagen: "../IMG/YOGURTERA/YOGURTERAWINCO.JPG", badge: "Top" },
  { id: 10, nombre: "Yogurtera Yelmo", categoria: "Yogurteras", precio: 59000, imagen: "../IMG/YOGURTERA/YOGURTERAYELMO.JPG", badge: "Premium" },

  { id: 11, nombre: "Pava Eléctrica Codini", categoria: "Pavas Eléctricas", precio: 34500, imagen: "../IMG/PAVAELECTRICA/PAVAELECTRICACODINI.JPG", badge: "Oferta" },
  { id: 12, nombre: "Pava Eléctrica Atma", categoria: "Pavas Eléctricas", precio: 38900, imagen: "../IMG/PAVAELECTRICA/PAVAELECTRICAATMA.JPG", badge: "Nuevo" },
  { id: 13, nombre: "Pava Eléctrica Philco", categoria: "Pavas Eléctricas", precio: 42000, imagen: "../IMG/PAVAELECTRICA/PAVAELECTRICAPHILCO.JPG", badge: "Top" }
];

const mapaCategorias = {
  "vasos": "Vasos",
  "licuadoras": "Licuadoras",
  "yogurteras": "Yogurteras",
  "pavas-electricas": "Pavas Eléctricas"
};

let categoriaActual = "todas";

function activarReveal() {
  const elementos = document.querySelectorAll(".categoria-bloque, .card");
  elementos.forEach(el => el.classList.add("reveal"));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold: 0.12 });

  elementos.forEach(el => observer.observe(el));
}

function obtenerCategoriaDesdeURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("categoria");
}

function actualizarBotonesFiltro() {
  const botones = document.querySelectorAll(".filtro-btn");
  botones.forEach(boton => {
    boton.classList.remove("active");
    if (boton.dataset.categoria === categoriaActual) {
      boton.classList.add("active");
    }
  });
}

function renderizarProductos() {
  const contenedor = document.getElementById("productos");
  if (!contenedor) return;

  let productosFiltrados = productos;

  if (categoriaActual !== "todas") {
    const nombreCategoria = mapaCategorias[categoriaActual];
    productosFiltrados = productos.filter(p => p.categoria === nombreCategoria);
  }

  const categoriasAgrupadas = {};
  productosFiltrados.forEach(producto => {
    if (!categoriasAgrupadas[producto.categoria]) {
      categoriasAgrupadas[producto.categoria] = [];
    }
    categoriasAgrupadas[producto.categoria].push(producto);
  });

  contenedor.innerHTML = "";

  for (const categoria in categoriasAgrupadas) {
    contenedor.innerHTML += `
      <section class="categoria-bloque">
        <h2 class="categoria-titulo">${categoria}</h2>
        <div class="productos-grid">
          ${categoriasAgrupadas[categoria].map(producto => `
            <div class="card">
              <span class="card-badge">${producto.badge || "Nuevo"}</span>
              <img src="${producto.imagen}" alt="${producto.nombre}">
              <p class="categoria">${producto.categoria}</p>
              <h3>${producto.nombre}</h3>
              <p class="precio">$${producto.precio.toLocaleString("es-AR")}</p>
              <button onclick="agregarCarrito(${producto.id})">Agregar al carrito</button>
            </div>
          `).join("")}
        </div>
      </section>
    `;
  }

  if (productosFiltrados.length === 0) {
    contenedor.innerHTML = `<p>No se encontraron productos para esta categoría.</p>`;
  }

  actualizarBotonesFiltro();
  activarReveal();
}

function iniciarFiltros() {
  const categoriaURL = obtenerCategoriaDesdeURL();
  if (categoriaURL && mapaCategorias[categoriaURL]) {
    categoriaActual = categoriaURL;
  }

  const botones = document.querySelectorAll(".filtro-btn");
  botones.forEach(boton => {
    boton.addEventListener("click", () => {
      categoriaActual = boton.dataset.categoria;
      renderizarProductos();
    });
  });

  renderizarProductos();
}