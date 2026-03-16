let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
  const contadores = document.querySelectorAll("#contador-carrito");
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  contadores.forEach(contador => {
    contador.textContent = totalItems;
  });
}

function mostrarToast(mensaje) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = mensaje;
  toast.classList.add("mostrar");

  setTimeout(() => {
    toast.classList.remove("mostrar");
  }, 2200);
}

function agregarCarrito(id) {
  const producto = productos.find(p => p.id === id);
  if (!producto) return;

  const existente = carrito.find(item => item.id === id);

  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarrito();
  mostrarToast("Producto agregado al carrito");
  renderizarCarrito();
}

function aumentarCantidad(id) {
  const producto = carrito.find(item => item.id === id);
  if (!producto) return;

  producto.cantidad += 1;
  guardarCarrito();
  renderizarCarrito();
}

function disminuirCantidad(id) {
  const producto = carrito.find(item => item.id === id);
  if (!producto) return;

  if (producto.cantidad > 1) {
    producto.cantidad -= 1;
  } else {
    carrito = carrito.filter(item => item.id !== id);
  }

  guardarCarrito();
  renderizarCarrito();
}

function eliminarProducto(id) {
  carrito = carrito.filter(item => item.id !== id);
  guardarCarrito();
  renderizarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  guardarCarrito();
  renderizarCarrito();
}

function renderizarCarrito() {
  const contenedor = document.getElementById("carrito");
  if (!contenedor) {
    actualizarContadorCarrito();
    return;
  }

  if (carrito.length === 0) {
    contenedor.innerHTML = `
      <div class="carrito-vacio">
        <p>Tu carrito está vacío.</p>
        <a class="btn-principal" href="../PRODUCTOS/productos.html">Explorar productos</a>
      </div>
    `;
    actualizarContadorCarrito();
    return;
  }

  let html = "";
  let total = 0;

  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    html += `
      <div class="card-carrito">
        <img src="${item.imagen}" alt="${item.nombre}">

        <div class="carrito-info">
          <h3>${item.nombre}</h3>
          <p><strong>Categoría:</strong> ${item.categoria}</p>
          <p><strong>Precio unitario:</strong> $${item.precio.toLocaleString("es-AR")}</p>
          <p><strong>Subtotal:</strong> $${subtotal.toLocaleString("es-AR")}</p>
        </div>

        <div class="carrito-acciones-item">
          <div class="cantidad-control">
            <button type="button" onclick="disminuirCantidad(${item.id})">−</button>
            <span>${item.cantidad}</span>
            <button type="button" onclick="aumentarCantidad(${item.id})">+</button>
          </div>

          <button class="btn-eliminar" onclick="eliminarProducto(${item.id})">
            Eliminar
          </button>
        </div>
      </div>
    `;
  });

  html += `
    <div class="resumen-carrito">
      <h3>Total: $${total.toLocaleString("es-AR")}</h3>

      <div class="acciones-carrito">
        <a class="btn-principal" href="../PRODUCTOS/productos.html">Seguir comprando</a>
        <a class="btn-principal" href="../CHECKOUT/checkout.html">Ir a checkout</a>
        <button class="btn-eliminar btn-vaciar" onclick="vaciarCarrito()">Vaciar carrito</button>
      </div>
    </div>
  `;

  contenedor.innerHTML = html;
  actualizarContadorCarrito();
}

document.addEventListener("DOMContentLoaded", () => {
  renderizarCarrito();
  actualizarContadorCarrito();
});