const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  origin: "bottom",
  distance: "50px",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".header__content p", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".header__btns", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".destination__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".showcase__image img", {
  ...scrollRevealOption,
  origin: "left",
});
ScrollReveal().reveal(".showcase__content h4", {
  ...scrollRevealOption,
  delay: 500,
});
ScrollReveal().reveal(".showcase__content p", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".showcase__btn", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".banner__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".discover__card", {
  ...scrollRevealOption,
  interval: 500,
});

const swiper = new Swiper(".swiper", {
  slidesPerView: 3,
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 1000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true, // <- ISSO faz pausar quando o mouse está em cima
  },
});

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll('.counter');

  // Para cada contador, vamos guardar seu estado
  counters.forEach(counter => {
    counter.isAnimated = false;
    counter.intervalId = null;
    counter.originalText = counter.innerText;
    counter.hasAnimatedOnce = false; // NOVO: Flag para saber se já animou uma vez
  });

  const runCountingAnimation = (counter) => {
    const targetText = counter.originalText;
    const targetNumber = parseInt(targetText.replace('+', ''), 10);
    const duration = 2000; // A animação de contagem em si dura 2 segundos
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    const increment = targetNumber / totalSteps;
    let currentCount = 0;
    counter.innerText = '0'; // Começa do zero

    counter.intervalId = setInterval(() => {
      currentCount += increment;
      if (currentCount >= targetNumber) {
        clearInterval(counter.intervalId);
        counter.innerText = targetText;
        counter.classList.add('counted');
        setTimeout(() => {
          counter.style.transform = 'scale(1)';
        }, 300);
      } else {
        counter.innerText = Math.ceil(currentCount);
      }
    }, stepTime);
  };

  const startAnimation = (entry) => {
    const counter = entry.target;
    if (counter.isAnimated) return;
    counter.isAnimated = true;

    // LÓGICA ATUALIZADA AQUI
    if (counter.hasAnimatedOnce) {
      // Se JÁ animou antes, mostra o valor final primeiro
      counter.innerText = counter.originalText;
      counter.classList.add('counted'); // Aplica o estilo de "pronto"

      // Espera 2 segundos e SÓ ENTÃO reinicia a contagem
      setTimeout(() => {
        counter.classList.remove('counted');
        counter.style.transform = 'scale(1)';
        runCountingAnimation(counter);
      }, 2000); // A PAUSA DE 2 SEGUNDOS QUE FALTAVA

    } else {
      // Se for a PRIMEIRA vez, anima na hora
      runCountingAnimation(counter);
      counter.hasAnimatedOnce = true;
    }
  };

  const resetAnimation = (entry) => {
    const counter = entry.target;
    clearInterval(counter.intervalId);
    counter.isAnimated = false;
    counter.innerText = '0';
    counter.classList.remove('counted');
    counter.style.transform = 'scale(1)';
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startAnimation(entry);
      } else {
        resetAnimation(entry);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => {
    observer.observe(counter);
  });
});