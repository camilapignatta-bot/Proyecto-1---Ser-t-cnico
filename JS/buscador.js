document.addEventListener("keyup", function(e) {
  if (e.target.id === "buscador") {
    const texto = e.target.value.toLowerCase();
    const productosCards = document.querySelectorAll(".card");

    productosCards.forEach(card => {
      const contenido = card.innerText.toLowerCase();
      card.style.display = contenido.includes(texto) ? "flex" : "none";
    });
  }
});