/* ================================================
   CONFIGURACIÓN — edita aquí tus datos personales
================================================ */
const CONFIG = {
  // Nombre de la persona amada
  nombreAmada: "Mariana",

  // Nombre de quien lo hace (para la firma)
  nombreRemitente: "Manuel",

  // Fecha de noviazgo (la contraseña) — formato: YYYYMMDD
  fechaNoviazgo: new Date(2025, 9, 17), // 17 de octubre de 2025

  // Contraseña a ingresar: DDMMAAAA (ejemplo: 17102025)
  password: ["1","7","1","0","2","0","2","5"],

  // Fecha de nacimiento de tu pareja (para el contador "desde que naciste")
  fechaNacimiento: new Date(2006, 12, 17), // 17 de diciembre de 2006

  // Mensaje principal (hero)
  heroMsg: "Mi vida, este día especial es para celebrar el amor que compartimos. Esta sorpresa es para ti, porque eres mi mundo.",

  // Frase romántica destacada
  heroCita: '"Tú eres mi hogar, mi refugio, mi amor por siempre."',

  // Carta completa
  cartaTexto: "Mi amor, cada momento contigo es un tesoro. Desde el día que te conocí, supe que eras mi destino. Gracias por cada risa, cada abrazo, cada sueño compartido. Hoy celebramos nuestro amor, y prometo amarte siempre.",

  // Recuerdos especiales
  recuerdos: [
    {
      nombre: "El Primer Encuentro",
      fecha: "22 de Diciembre, 2025",
      desc: "Ese día, mi corazón supo que había encontrado a su otra mitad."
    },
    {
      nombre: "Nuestra Primer Beso",
      fecha: "22 de Diciembre, 2025",
      desc: "Cada nota me recuerda a ti y a nuestros momentos juntos."
    },
    {
      nombre: "Disfrutando de tu compañía",
      fecha: "2 de Enero, 2026",
      desc: "Cada instante a tu lado es un regalo que atesoro profundamente."
    }
  ],

  // Imágenes de galería (pon aquí URLs o rutas locales)
  // Si usas fotos propias, ponlas en la misma carpeta y escribe el nombre, ej: "foto1.jpg"
  fotos: [
    "img/foto1.jpeg",
    "img/foto2.jpeg",
    "img/foto3.jpeg"
  ]
};
/* ================================================ */


// ── Aplicar configuración al HTML ──────────────────
document.getElementById("nombre-amada").textContent = CONFIG.nombreAmada;
document.getElementById("hero-title").innerHTML =
  `Para Mi Amor, <span id="nombre-amada">${CONFIG.nombreAmada}</span>`;
document.getElementById("hero-msg").textContent = CONFIG.heroMsg;
document.getElementById("hero-quote").textContent = CONFIG.heroCita;
document.getElementById("carta-texto").textContent = CONFIG.cartaTexto;
document.getElementById("carta-firma").textContent = `Con todo mi amor, ${CONFIG.nombreRemitente}`;

// ── Canvas estrellas ───────────────────────────────
(function initStars() {
  const canvas = document.getElementById("stars-canvas");
  const ctx = canvas.getContext("2d");
  let stars = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    buildStars();
  }

  function buildStars() {
    stars = [];
    const count = Math.floor((canvas.width * canvas.height) / 3000);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4 + 0.2,
        alpha: Math.random(),
        speed: Math.random() * 0.008 + 0.002
      });
    }
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(s => {
      s.alpha += s.speed;
      if (s.alpha > 1 || s.alpha < 0) s.speed *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${s.alpha.toFixed(2)})`;
      ctx.fill();
    });
    requestAnimationFrame(drawStars);
  }

  window.addEventListener("resize", resize);
  resize();
  drawStars();
})();

// ── Partículas flotantes ───────────────────────────
(function initParticles() {
  const container = document.getElementById("particles");
  const symbols = ["💕","🌸","✦","✿","❀","·","♡"];
  setInterval(() => {
    const p = document.createElement("div");
    p.className = "particle";
    p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    p.style.left = Math.random() * 100 + "vw";
    p.style.fontSize = (10 + Math.random() * 14) + "px";
    p.style.animationDuration = (5 + Math.random() * 8) + "s";
    p.style.animationDelay = "0s";
    p.style.opacity = (0.2 + Math.random() * 0.4).toString();
    container.appendChild(p);
    setTimeout(() => p.remove(), 13000);
  }, 800);
})();

// ── PIN / CONTRASEÑA ───────────────────────────────
(function initPin() {
  const inputs = Array.from({ length: 8 }, (_, i) => document.getElementById(`p${i}`));

  inputs.forEach((inp, i) => {
    inp.addEventListener("input", () => {
      inp.value = inp.value.replace(/\D/, "");
      if (inp.value) {
        inp.classList.add("filled");
        if (i < 7) inputs[i + 1].focus();
      } else {
        inp.classList.remove("filled");
      }
      if (inputs.every(x => x.value.length === 1)) checkPin();
    });

    inp.addEventListener("keydown", e => {
      if (e.key === "Backspace" && !inp.value && i > 0) {
        inputs[i - 1].value = "";
        inputs[i - 1].classList.remove("filled");
        inputs[i - 1].focus();
      }
    });
  });

  function checkPin() {
    const entered = inputs.map(x => x.value);
    const correct = CONFIG.password;
    if (JSON.stringify(entered) === JSON.stringify(correct)) {
      document.getElementById("pin-error").textContent = "";
      launchMain();
    } else {
      const row = document.getElementById("pin-row");
      row.classList.remove("shake");
      void row.offsetWidth;
      row.classList.add("shake");
      document.getElementById("pin-error").textContent = "Esa no es la fecha… inténtalo de nuevo 💔";
      setTimeout(() => {
        inputs.forEach(x => { x.value = ""; x.classList.remove("filled"); });
        inputs[0].focus();
        document.getElementById("pin-error").textContent = "";
      }, 1300);
    }
  }

  inputs[0].focus();
})();

// ── Lanzar pantalla principal ──────────────────────
function launchMain() {
  const lockScreen = document.getElementById("lock-screen");
  const mainScreen = document.getElementById("main-screen");

  lockScreen.style.transition = "opacity 0.8s ease";
  lockScreen.style.opacity = "0";
  setTimeout(() => {
    lockScreen.classList.remove("active");
    mainScreen.classList.add("active");
    initAll();
  }, 800);
}

function initAll() {
  initGaleria();
  initRecuerdos();
  initCounters();
  initScrollAnimations();
  initAmorBar();
}

// ── GALERÍA ────────────────────────────────────────
function initGaleria() {
  const slides = document.querySelectorAll(".galeria-slide");
  const dotsContainer = document.getElementById("galeria-dots");
  let current = 0;

  // Aplicar fotos de CONFIG
  slides.forEach((slide, i) => {
    if (CONFIG.fotos[i]) {
      slide.innerHTML = `<img src="${CONFIG.fotos[i]}" alt="Foto ${i+1}" />`;
    }
  });

  // Crear dots
  slides.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = "dot" + (i === 0 ? " active" : "");
    dot.addEventListener("click", () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    slides[current].classList.remove("active");
    document.querySelectorAll(".dot")[current].classList.remove("active");
    current = (index + slides.length) % slides.length;
    slides[current].classList.add("active");
    document.querySelectorAll(".dot")[current].classList.add("active");
  }

  document.getElementById("prev-btn").addEventListener("click", () => goTo(current - 1));
  document.getElementById("next-btn").addEventListener("click", () => goTo(current + 1));

  // Auto-avance
  setInterval(() => goTo(current + 1), 4000);
}

// ── RECUERDOS ──────────────────────────────────────
function initRecuerdos() {
  const list = document.getElementById("recuerdos-list");
  CONFIG.recuerdos.forEach((r, i) => {
    const item = document.createElement("div");
    item.className = "recuerdo-item";
    item.style.transitionDelay = (i * 0.15) + "s";
    item.innerHTML = `
      <div class="recuerdo-nombre">${r.nombre}</div>
      <div class="recuerdo-fecha">${r.fecha}</div>
      <div class="recuerdo-desc">${r.desc}</div>
    `;
    list.appendChild(item);
  });
}

// ── CONTADORES ─────────────────────────────────────
function initCounters() {
  // Contador de noviazgo en tiempo real
  function updateNoviazgo() {
    const start = CONFIG.fechaNoviazgo;
    const now = new Date();

    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) { years--; months += 12; }

    const hours = now.getHours();
    const mins = now.getMinutes();
    const secs = now.getSeconds();

    document.getElementById("nv-y").textContent = years;
    document.getElementById("nv-m").textContent = months;
    document.getElementById("nv-d").textContent = days;
    document.getElementById("nv-h").textContent = String(hours).padStart(2, "0");
    document.getElementById("nv-min").textContent = String(mins).padStart(2, "0");
    document.getElementById("nv-seg").textContent = String(secs).padStart(2, "0");
  }

  // Contador desde nacimiento (estilo digital)
  function updateNacimiento() {
    const start = CONFIG.fechaNacimiento;
    const now = new Date();
    const diff = now - start;

    const totalSecs = Math.floor(diff / 1000);
    const secs = totalSecs % 60;
    const totalMins = Math.floor(totalSecs / 60);
    const mins = totalMins % 60;
    const totalHours = Math.floor(totalMins / 60);
    const hours = totalHours % 24;
    const totalDays = Math.floor(totalHours / 24);

    const pad = (n, l = 2) => String(n).padStart(l, "0");
    document.getElementById("nb-total").textContent =
      `${pad(totalDays, 4)}:${pad(hours)}:${pad(mins)}:${pad(secs)}`;
  }

  updateNoviazgo();
  updateNacimiento();
  setInterval(() => { updateNoviazgo(); updateNacimiento(); }, 1000);
}

// ── SCROLL ANIMATIONS ─────────────────────────────
function initScrollAnimations() {
  const items = document.querySelectorAll(".recuerdo-item, .hero-card, .quote-card, .carta-box, .futuro-card");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        entry.target.style.opacity = "1";
        entry.target.style.transform = "none";
      }
    });
  }, { threshold: 0.15 });

  items.forEach(el => observer.observe(el));
}

// ── BARRA DE AMOR ──────────────────────────────────
function initAmorBar() {
  const bar = document.getElementById("amor-bar");
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      setTimeout(() => { bar.style.width = "100%"; }, 300);
      observer.disconnect();
    }
  }, { threshold: 0.3 });
  observer.observe(bar);
}
