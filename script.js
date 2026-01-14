const images = document.querySelectorAll('.carousel-img');
let current = 0;

function showNextImage() {
  images[current].classList.remove('active');
  current = (current + 1) % images.length;
  images[current].classList.add('active');
}

setInterval(showNextImage, 3000); // Cambia de imagen cada 3 segundos

  const carrusel = document.querySelector('.carrusel');

  // Duplicamos el contenido para crear un efecto de bucle sin cortes
  carrusel.innerHTML += carrusel.innerHTML;

  let desplazamiento = 0;
  const velocidad = 2; // 🔧 ajusta la velocidad (más alto = más rápido)

  function moverCarrusel() {
    desplazamiento -= velocidad;
    // Cuando ya se desplazó la mitad (contenido duplicado), reinicia sin salto
    if (Math.abs(desplazamiento) >= carrusel.scrollWidth / 2) {
      desplazamiento = 0;
    }
    carrusel.style.transform = `translateX(${desplazamiento}px)`;
    requestAnimationFrame(moverCarrusel); // movimiento continuo
  }

  moverCarrusel();


document.addEventListener("DOMContentLoaded", () => {
  const burgerBtn = document.getElementById("burgerBtn");
  const mainNav = document.getElementById("mainNav");
  const header = document.querySelector(".header");

  let isAnimating = false;

  function openMenu() {
    if (isAnimating) return;
    isAnimating = true;

    mainNav.classList.add("active");
    burgerBtn.classList.add("open");
    burgerBtn.setAttribute("aria-expanded", "true");

    // Animación de entrada suave
    mainNav.style.display = "flex";
    mainNav.style.opacity = "0";
    mainNav.style.transform = "translateY(-15px)";
    header.style.overflow = "hidden";

    requestAnimationFrame(() => {
      mainNav.style.transition = "opacity 0.35s ease, transform 0.35s ease";
      mainNav.style.opacity = "1";
      mainNav.style.transform = "translateY(0)";
    });

    setTimeout(() => (isAnimating = false), 350);
  }

  function closeMenu() {
    if (isAnimating) return;
    isAnimating = true;

    // Animación de salida fluida
    mainNav.style.transition = "opacity 0.35s ease, transform 0.35s ease";
    mainNav.style.opacity = "0";
    mainNav.style.transform = "translateY(-15px)";

    setTimeout(() => {
      mainNav.classList.remove("active");
      burgerBtn.classList.remove("open");
      burgerBtn.setAttribute("aria-expanded", "false");

      // Limpieza de estilos para estabilidad del header
      mainNav.style.display = "";
      mainNav.style.opacity = "";
      mainNav.style.transform = "";
      mainNav.style.transition = "";
      header.style.overflow = "";

      isAnimating = false;
    }, 350);
  }

  function toggleMenu() {
    if (mainNav.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // 🔹 Clic en el botón hamburguesa
  burgerBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // 🔹 Cerrar al hacer clic fuera del header/nav
  document.addEventListener("click", (e) => {
    if (
      mainNav.classList.contains("active") &&
      !mainNav.contains(e.target) &&
      !burgerBtn.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // 🔹 Cerrar con tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mainNav.classList.contains("active")) {
      closeMenu();
    }
  });
});

