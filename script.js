/* ============================================================
   KOMOREBI — Maqueta Infantil v1 — script.js
   Lee EVENT desde data/event.js y construye toda la invitación.
   No edites este archivo para personalizar una invitación.
   ============================================================ */

(function () {
  'use strict';

  // ── 1. TIPOGRAFÍAS Y COLORES (CSS variables) ────────────────
  function aplicarIdentidad() {
    const c = EVENT.colores;
    const t = EVENT.tipografias;
    const root = document.documentElement;

    root.style.setProperty('--color-primario',   c.primario);
    root.style.setProperty('--color-secundario', c.secundario);
    root.style.setProperty('--color-fondo',      c.fondo);
    root.style.setProperty('--color-texto',      c.texto);
    root.style.setProperty('--color-acento',     c.acento);
    root.style.setProperty('--font-display',     `'${t.display}', cursive`);
    root.style.setProperty('--font-cuerpo',      `'${t.cuerpo}', sans-serif`);

    // Inyectar Google Fonts
    const link = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(t.display)}:wght@400;700&family=${encodeURIComponent(t.cuerpo)}:wght@400;600;700&display=swap`;
    document.head.appendChild(link);

    // Título del tab
    document.getElementById('page-title').textContent = `¡Fiesta de ${EVENT.nombre}! 🎉`;
  }

  // ── 2. PORTADA ──────────────────────────────────────────────
  function iniciarPortada() {
    const portada = document.getElementById('portada');
    const main    = document.getElementById('main-content');
    const texto   = document.getElementById('portada-texto');

    texto.textContent = EVENT.portada.textoBoton;

    // Si hay foto de portada
    if (EVENT.portada.usarFoto) {
      portada.style.backgroundImage = "url('assets/photos/portada.jpg')";
    }

    portada.addEventListener('click', () => {
      portada.classList.add('fade-out');
      main.classList.remove('hidden');
      iniciarMusica();
      setTimeout(() => portada.remove(), 650);
    });
  }

  // ── 3. MÚSICA ───────────────────────────────────────────────
  function iniciarMusica() {
    const audio  = document.getElementById('audio-player');
    const btn    = document.getElementById('music-btn');
    const texto  = document.getElementById('music-texto');
    const icon   = btn.querySelector('.music-icon');

    audio.src = EVENT.musica.archivo;
    texto.textContent = EVENT.musica.textoPlayer;

    audio.play().then(() => { icon.textContent = '⏸'; })
               .catch(() => { icon.textContent = '▶'; });

    btn.addEventListener('click', () => {
      if (audio.paused) {
        audio.play();
        icon.textContent = '⏸';
      } else {
        audio.pause();
        icon.textContent = '▶';
      }
    });
  }

  // ── 4. HERO ─────────────────────────────────────────────────
  function construirHero() {
    document.getElementById('hero-nombre').textContent = EVENT.nombre;
    document.getElementById('hero-edad').textContent =
      `${EVENT.hero.subtitulo} ${EVENT.edad} ${EVENT.edadTexto} ${EVENT.hero.emoji}`;

    if (EVENT.hero.usarFondoFoto) {
      document.getElementById('hero-fondo').style.backgroundImage =
        "url('assets/photos/hero-fondo.jpg')";
      document.getElementById('hero-fondo').style.opacity = '0.35';
    }
  }

  // ── 5. COUNTDOWN ────────────────────────────────────────────
  function iniciarCountdown() {
    document.getElementById('countdown-fecha').textContent =
      `${EVENT.fechaTexto} · ${EVENT.horaTexto}`;

    const meta = new Date(EVENT.fechaISO).getTime();

    function actualizar() {
      const diff = meta - Date.now();
      if (diff <= 0) {
        document.getElementById('cd-dias').textContent  = '00';
        document.getElementById('cd-horas').textContent = '00';
        document.getElementById('cd-min').textContent   = '00';
        document.getElementById('cd-seg').textContent   = '00';
        return;
      }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000)  / 60000);
      const s = Math.floor((diff % 60000)    / 1000);

      document.getElementById('cd-dias').textContent  = String(d).padStart(2,'0');
      document.getElementById('cd-horas').textContent = String(h).padStart(2,'0');
      document.getElementById('cd-min').textContent   = String(m).padStart(2,'0');
      document.getElementById('cd-seg').textContent   = String(s).padStart(2,'0');
    }
    actualizar();
    setInterval(actualizar, 1000);
  }

  // ── 6. TEXTO DE INVITACIÓN ──────────────────────────────────
  function construirTexto() {
    document.getElementById('invitacion-texto').textContent = EVENT.textoInvitacion;
  }

  // ── 7. GALERÍA — polaroid apilada ───────────────────────────
  function construirGaleria() {
    const fotos    = EVENT.galeria;
    if (!fotos || fotos.length === 0) {
      document.getElementById('galeria-section').classList.add('hidden');
      return;
    }

    const stack    = document.getElementById('galeria-stack');
    const contador = document.getElementById('galeria-contador');
    let actual     = 0;

    // Crear tarjetas (todas, apiladas)
    fotos.forEach((foto, i) => {
      const card = document.createElement('div');
      card.className = 'galeria-card' + (i === 0 ? ' activa' : '');
      card.style.zIndex = fotos.length - i;

      const img = document.createElement('img');
      img.src = `assets/photos/${foto.archivo}`;
      img.alt = foto.alt;
      card.appendChild(img);
      stack.appendChild(card);
    });

    function actualizarContador() {
      contador.textContent = `${actual + 1} / ${fotos.length}`;
    }
    actualizarContador();

    function avanzar() {
      const cards  = stack.querySelectorAll('.galeria-card');
      const activa = stack.querySelector('.galeria-card.activa');

      // Animar salida de la activa
      activa.classList.add('saliendo');
      activa.classList.remove('activa');

      setTimeout(() => {
        activa.classList.remove('saliendo');
        // Moverla al fondo visualmente
        stack.appendChild(activa);
        // Actualizar z-indexes
        const todas = stack.querySelectorAll('.galeria-card');
        todas.forEach((c, i) => {
          c.style.zIndex = todas.length - i;
          c.classList.remove('activa');
        });
        todas[0].classList.add('activa');

        actual = (actual + 1) % fotos.length;
        actualizarContador();
      }, 250);
    }

    // Toque y clic
    stack.addEventListener('click', avanzar);

    // Swipe support (mobile)
    let startX = 0;
    stack.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    stack.addEventListener('touchend',   e => {
      if (Math.abs(e.changedTouches[0].clientX - startX) > 30) avanzar();
    });
  }

  // ── 8. UBICACIÓN ────────────────────────────────────────────
  function construirUbicacion() {
    const u = EVENT.ubicacion;

    if (u.modo === 'salon') {
      const div = document.getElementById('ubicacion-salon');
      div.classList.remove('hidden');
      document.getElementById('salon-nombre').textContent = u.nombreLugar;
      document.getElementById('btn-ubicacion-salon').href = u.linkUbicacion;
    } else {
      const div = document.getElementById('ubicacion-domicilio');
      div.classList.remove('hidden');
      document.getElementById('mapa-embed').innerHTML = u.embedMapa;
    }
  }

  // ── 9. SECCIONES CONDICIONALES ──────────────────────────────
  function construirPrograma() {
    if (!EVENT.programa || EVENT.programa.length === 0) return;
    const sec  = document.getElementById('programa-section');
    const list = document.getElementById('programa-lista');
    sec.classList.remove('hidden');
    EVENT.programa.forEach(item => {
      const el = document.createElement('div');
      el.className = 'programa-item';
      el.innerHTML = `<span class="programa-hora">${item.hora}</span>
                      <span class="programa-actividad">${item.actividad}</span>`;
      list.appendChild(el);
    });
  }

  function construirMenu() {
    if (!EVENT.menu || EVENT.menu.length === 0) return;
    const sec  = document.getElementById('menu-section');
    const list = document.getElementById('menu-lista');
    sec.classList.remove('hidden');
    EVENT.menu.forEach(item => {
      const el = document.createElement('div');
      el.className = 'menu-item';
      el.innerHTML = `<p class="menu-platillo">${item.platillo}</p>
                      ${item.descripcion ? `<p class="menu-desc">${item.descripcion}</p>` : ''}`;
      list.appendChild(el);
    });
  }

  function construirVestimenta() {
    if (!EVENT.vestimenta || !EVENT.vestimenta.texto) return;
    const sec = document.getElementById('vestimenta-section');
    sec.classList.remove('hidden');
    document.getElementById('vestimenta-emoji').textContent = EVENT.vestimenta.emoji;
    document.getElementById('vestimenta-texto').textContent = EVENT.vestimenta.texto;
  }

  function construirMesaRegalos() {
    if (!EVENT.mesaRegalos || !EVENT.mesaRegalos.enlace) return;
    const sec = document.getElementById('regalos-section');
    sec.classList.remove('hidden');
    document.getElementById('regalos-nombre').textContent = EVENT.nombre;
    const btn = document.getElementById('btn-regalos');
    btn.textContent = EVENT.mesaRegalos.textoBoton;
    btn.href        = EVENT.mesaRegalos.enlace;
  }

  // ── 10. CONFIRMACIÓN ────────────────────────────────────────
  function construirConfirmacion() {
    document.getElementById('confirmacion-contacto').textContent =
      EVENT.confirmacion.nombreContacto;
    const btn = document.getElementById('btn-confirmar');
    btn.textContent = EVENT.confirmacion.textoBoton;
    btn.href        = EVENT.confirmacion.enlace;
  }

  // ── 11. GUARDAR EN CALENDARIO ───────────────────────────────
  function construirCalendario() {
    const cal   = EVENT.calendario;
    const fecha = new Date(EVENT.fechaISO);
    // Formato ICS: YYYYMMDDTHHmmss
    const pad = n => String(n).padStart(2,'0');
    const f   = d => `${d.getFullYear()}${pad(d.getMonth()+1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
    const fin = new Date(fecha.getTime() + 4 * 3600000); // +4 horas por defecto

    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${f(fecha)}`,
      `DTEND:${f(fin)}`,
      `SUMMARY:${cal.titulo}`,
      `DESCRIPTION:${cal.descripcion}`,
      `LOCATION:${cal.lugar || EVENT.ubicacion.nombreLugar || ''}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar' });
    const url  = URL.createObjectURL(blob);
    document.getElementById('btn-calendario').href = url;
    document.getElementById('btn-calendario').download = `fiesta-${EVENT.nombre.toLowerCase()}.ics`;
  }

  // ── INIT ────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    aplicarIdentidad();
    iniciarPortada();
    construirHero();
    iniciarCountdown();
    construirTexto();
    construirGaleria();
    construirUbicacion();
    construirPrograma();
    construirMenu();
    construirVestimenta();
    construirMesaRegalos();
    construirConfirmacion();
    construirCalendario();
  });

})();
