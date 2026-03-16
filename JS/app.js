document.addEventListener("DOMContentLoaded", () => {
  if (typeof iniciarFiltros === "function") {
    const contenedor = document.getElementById("productos");
    if (contenedor) {
      iniciarFiltros();
    }
  }

  const elementos = document.querySelectorAll(
    ".hero, .valor-marca, .categorias-home, .quienes-imagen, .quienes-texto, .pagina-secundaria, .barra-superior, .filtros-categorias, .newsletter, .beneficio-item, .categoria-box"
  );

  elementos.forEach(el => el.classList.add("reveal"));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.08 });

  elementos.forEach(el => observer.observe(el));

  setTimeout(() => {
    elementos.forEach(el => el.classList.add("visible"));
  }, 500);

  const slides = document.querySelectorAll(".hero-slide");
  if (slides.length > 0) {
    let actual = 0;
    setInterval(() => {
      slides[actual].classList.remove("active");
      actual = (actual + 1) % slides.length;
      slides[actual].classList.add("active");
    }, 4000);
  }

  const formsNewsletter = document.querySelectorAll(".newsletter-form");
  formsNewsletter.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const toast = document.getElementById("toast");
      if (toast) {
        toast.textContent = "¡Gracias por sumarte a Texas!";
        toast.classList.add("mostrar");
        setTimeout(() => toast.classList.remove("mostrar"), 2200);
      }
      form.reset();
    });
  });

  const glow = document.querySelector(".cursor-glow");
  if (glow) {
    window.addEventListener("mousemove", (e) => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    });
  }
});