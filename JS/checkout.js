function renderizarResumenCheckout() {
  const contenedor = document.getElementById("resumen-checkout");
  if (!contenedor) return;

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (carrito.length === 0) {
    contenedor.innerHTML = `<p>No hay productos en el carrito.</p>`;
    return;
  }

  let total = 0;
  let html = "";

  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    html += `
      <div class="checkout-item">
        <img src="${item.imagen}" alt="${item.nombre}">
        <div>
          <h4>${item.nombre}</h4>
          <p>Cantidad: ${item.cantidad}</p>
          <p>$${subtotal.toLocaleString("es-AR")}</p>
        </div>
      </div>
    `;
  });

  html += `<div class="checkout-total">Total: $${total.toLocaleString("es-AR")}</div>`;
  contenedor.innerHTML = html;
}

function ocultarBloquesPago() {
  const bloques = document.querySelectorAll(".bloque-pago");
  bloques.forEach(bloque => bloque.classList.add("oculto"));
}

function actualizarBloquePago() {
  const metodo = document.getElementById("pago")?.value;

  const bloqueTarjeta = document.getElementById("bloque-tarjeta");
  const bloqueTransferencia = document.getElementById("bloque-transferencia");
  const bloqueMP = document.getElementById("bloque-mp");
  const bloqueEfectivo = document.getElementById("bloque-efectivo");

  ocultarBloquesPago();

  if (metodo === "tarjeta" && bloqueTarjeta) {
    bloqueTarjeta.classList.remove("oculto");
  }

  if (metodo === "transferencia" && bloqueTransferencia) {
    bloqueTransferencia.classList.remove("oculto");
  }

  if (metodo === "mercado-pago" && bloqueMP) {
    bloqueMP.classList.remove("oculto");
  }

  if (metodo === "efectivo" && bloqueEfectivo) {
    bloqueEfectivo.classList.remove("oculto");
  }
}

function validarPago() {
  const metodo = document.getElementById("pago")?.value;

  if (metodo === "tarjeta") {
    const titular = document.getElementById("titular")?.value.trim();
    const numero = document.getElementById("numero-tarjeta")?.value.trim();
    const vencimiento = document.getElementById("vencimiento")?.value.trim();
    const cvv = document.getElementById("cvv")?.value.trim();

    if (!titular || !numero || !vencimiento || !cvv) {
      return "Completá todos los datos de la tarjeta.";
    }
  }

  if (metodo === "transferencia") {
    const comprobante = document.getElementById("comprobante")?.files.length;

    if (!comprobante) {
      return "Adjuntá el comprobante de transferencia para continuar.";
    }
  }

  if (metodo === "mercado-pago") {
    return "Continuá el pago vinculando tu cuenta de Mercado Pago.";
  }

  return "";
}

document.addEventListener("DOMContentLoaded", () => {
  renderizarResumenCheckout();

  const form = document.getElementById("form-checkout");
  const toast = document.getElementById("toast");
  const selectPago = document.getElementById("pago");
  const btnMP = document.getElementById("btn-mp-link");

  if (selectPago) {
    selectPago.addEventListener("change", actualizarBloquePago);
  }

  if (btnMP) {
    btnMP.addEventListener("click", (e) => {
      e.preventDefault();

      if (toast) {
        toast.textContent = "Redirigiendo a Mercado Pago...";
        toast.classList.add("mostrar");
        setTimeout(() => toast.classList.remove("mostrar"), 2200);
      }
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const errorPago = validarPago();

      if (errorPago) {
        if (toast) {
          toast.textContent = errorPago;
          toast.classList.add("mostrar");
          setTimeout(() => toast.classList.remove("mostrar"), 2600);
        }
        return;
      }

      if (toast) {
        toast.textContent = "Compra confirmada correctamente";
        toast.classList.add("mostrar");
        setTimeout(() => toast.classList.remove("mostrar"), 2200);
      }

      localStorage.removeItem("carrito");

      setTimeout(() => {
        window.location.href = "../TIENDA/index.html";
      }, 1800);
    });
  }
});