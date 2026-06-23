(function () {
  'use strict';

  // ── 1. IDENTIDAD ─────────────────────────────────────────
  function aplicarIdentidad() {
    const c = EVENT.colores, t = EVENT.tipografias;
    const r = document.documentElement;
    r.style.setProperty('--color-fondo',        c.fondo);
    r.style.setProperty('--color-caja',         c.caja);
    r.style.setProperty('--color-caja-alt',     c.cajaAlt);
    r.style.setProperty('--color-primario',     c.primario);
    r.style.setProperty('--color-accion',       c.accion);
    r.style.setProperty('--color-accion-hover', c.accionHover || '#FF1A7A');
    r.style.setProperty('--color-detalle',      c.detalle);
    r.style.setProperty('--color-dorado',       c.dorado);
    r.style.setProperty('--color-texto',        c.texto);
    r.style.setProperty('--color-texto-suave',  c.textoSuave);
    r.style.setProperty('--font-display', `'${t.display}', cursive`);
    r.style.setProperty('--font-cuerpo',  `'${t.cuerpo}', sans-serif`);

    const link = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(t.display)}:wght@700&family=${encodeURIComponent(t.cuerpo)}:wght@300;400;700;800&display=swap`;
    document.head.appendChild(link);

    document.getElementById('page-title').textContent = `Fiesta de ${EVENT.nombre}`;
  }

  // ── 2. CENTELLAS ─────────────────────────────────────────
  function crearCentellas() {
    const contenedor = document.getElementById('centellas');
    const cantidad   = Math.floor(Math.random() * 8) + 18; // 18-25
    for (let i = 0; i < cantidad; i++) {
      const el = document.createElement('div');
      el.className = 'centella';
      const size     = Math.random() * 3 + 3;          // 3-6px
      const left     = Math.random() * 100;             // % horizontal
      const delay    = Math.random() * 12;              // s offset
      const duration = Math.random() * 6 + 6;          // 6-12s
      const drift    = (Math.random() - 0.5) * 40 + 'px'; // oscilación lateral
      const opacity  = (Math.random() * 0.3 + 0.3).toFixed(2); // 0.3-0.6

      el.style.cssText = `
        width: ${size}px; height: ${size}px;
        left: ${left}%;
        top: -10px;
        opacity: ${opacity};
        animation-duration: ${duration}s;
        animation-delay: -${delay}s;
        --drift: ${drift};
      `;
      contenedor.appendChild(el);
    }
  }

  // ── 3. PORTADA ───────────────────────────────────────────
  function iniciarPortada() {
    const portada = document.getElementById('portada');
    const main    = document.getElementById('main-content');
    if (EVENT.portada.usarFoto) {
      portada.style.backgroundImage = "url('assets/photos/portada.jpg')";
    }
    function abrir() {
      portada.classList.add('fade-out');
      main.classList.remove('hidden');
      iniciarMusica();
      setTimeout(() => portada.remove(), 750);
    }
    portada.addEventListener('click', abrir);
    portada.addEventListener('touchend', function(e) {
      e.preventDefault(); abrir();
    }, { once: true });
  }

  // ── 4. MÚSICA ────────────────────────────────────────────
  function iniciarMusica() {
    const audio = document.getElementById('audio-player');
    const btn   = document.getElementById('music-btn');
    const icon  = btn.querySelector('.music-icon');
    audio.src = EVENT.musica.archivo;
    audio.play().then(() => { icon.textContent = '⏸'; }).catch(() => { icon.textContent = '▶'; });
    btn.addEventListener('click', () => {
      if (audio.paused) { audio.play(); icon.textContent = '⏸'; }
      else              { audio.pause(); icon.textContent = '▶'; }
    });
  }

  // ── 5. HERO ──────────────────────────────────────────────
  function construirHero() {
    document.getElementById('hero-nombre').textContent = EVENT.nombre;
    document.getElementById('hero-frase').textContent  = EVENT.hero.fraseEdad;
    document.getElementById('hero-fecha').textContent  = `${EVENT.fechaTexto} · ${EVENT.horaTexto}`;
  }

  // ── 6. COUNTDOWN ─────────────────────────────────────────
  function iniciarCountdown() {
    const meta = new Date(EVENT.fechaISO).getTime();
    const pad  = n => String(n).padStart(2, '0');
    function tick() {
      const diff = Math.max(0, meta - Date.now());
      document.getElementById('cd-dias').textContent  = pad(Math.floor(diff / 86400000));
      document.getElementById('cd-horas').textContent = pad(Math.floor((diff % 86400000) / 3600000));
      document.getElementById('cd-min').textContent   = pad(Math.floor((diff % 3600000) / 60000));
      document.getElementById('cd-seg').textContent   = pad(Math.floor((diff % 60000) / 1000));
    }
    tick(); setInterval(tick, 1000);
  }

  // ── 7. MENSAJE PERSONAL ──────────────────────────────────
  function construirMensaje() {
    document.getElementById('mensaje-texto').textContent = EVENT.textoInvitacion;
  }

  // ── 8. GALERÍA ───────────────────────────────────────────
  function construirGaleria() {
    const fotos = EVENT.galeria;
    if (!fotos || fotos.length === 0) {
      document.getElementById('galeria-section').classList.add('hidden'); return;
    }
    const stack    = document.getElementById('galeria-stack');
    const contador = document.getElementById('galeria-contador');
    let actual = 0;

    fotos.forEach((foto, i) => {
      const card = document.createElement('div');
      card.className = 'galeria-card' + (i === 0 ? ' activa' : '');
      card.style.zIndex = fotos.length - i;
      const img = document.createElement('img');
      img.src = `assets/photos/${foto.archivo}`; img.alt = foto.alt;
      card.appendChild(img); stack.appendChild(card);
    });

    const actualizarContador = () => { contador.textContent = `${actual + 1} / ${fotos.length}`; };
    actualizarContador();

    function avanzar() {
      const activa = stack.querySelector('.galeria-card.activa');
      activa.classList.add('saliendo'); activa.classList.remove('activa');
      setTimeout(() => {
        activa.classList.remove('saliendo'); stack.appendChild(activa);
        const todas = stack.querySelectorAll('.galeria-card');
        todas.forEach((c, i) => { c.style.zIndex = todas.length - i; c.classList.remove('activa'); });
        todas[0].classList.add('activa');
        actual = (actual + 1) % fotos.length; actualizarContador();
      }, 250);
    }
    stack.addEventListener('click', avanzar);
    let startX = 0;
    stack.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    stack.addEventListener('touchend',   e => { if (Math.abs(e.changedTouches[0].clientX - startX) > 30) avanzar(); });
  }

  // ── 9. UBICACIÓN ─────────────────────────────────────────
  function construirUbicacion() {
    const u = EVENT.ubicacion;
    if (u.modo === 'salon') {
      document.getElementById('ubicacion-salon').classList.remove('hidden');
      const el = document.getElementById('salon-nombre-overlay');
      if (el) el.textContent = u.nombreLugar;
      document.getElementById('btn-ubicacion-salon').href = u.linkUbicacion;
    } else {
      document.getElementById('ubicacion-domicilio').classList.remove('hidden');
      const el = document.getElementById('salon-nombre-mapa');
      if (el && u.nombreLugar) el.textContent = u.nombreLugar;
      document.getElementById('mapa-embed').innerHTML = u.embedMapa;
      document.getElementById('btn-ubicacion-maps').href = u.linkUbicacion;
    }
  }

  // ── 10. SECCIONES OPCIONALES ─────────────────────────────
  function construirPrograma() {
    if (!EVENT.programa || !EVENT.programa.length) return;
    document.getElementById('programa-section').classList.remove('hidden');
    const list = document.getElementById('programa-lista');
    EVENT.programa.forEach(item => {
      const el = document.createElement('div'); el.className = 'programa-item';
      el.innerHTML = `<span class="programa-hora">${item.hora}</span><span>${item.actividad}</span>`;
      list.appendChild(el);
    });
  }

  function construirMenu() {
    if (!EVENT.menu || !EVENT.menu.length) return;
    document.getElementById('menu-section').classList.remove('hidden');
    const list = document.getElementById('menu-lista');
    EVENT.menu.forEach(item => {
      const el = document.createElement('div'); el.className = 'menu-item';
      el.innerHTML = `<p class="menu-platillo">${item.platillo}</p>${item.descripcion ? `<p class="menu-desc">${item.descripcion}</p>` : ''}`;
      list.appendChild(el);
    });
  }

  function construirVestimenta() {
    if (!EVENT.vestimenta?.texto) return;
    document.getElementById('vestimenta-section').classList.remove('hidden');
    document.getElementById('vestimenta-emoji').textContent = EVENT.vestimenta.emoji || '';
    document.getElementById('vestimenta-texto').textContent = EVENT.vestimenta.texto;
  }

  function construirMesaRegalos() {
    if (!EVENT.mesaRegalos?.enlace) return;
    document.getElementById('regalos-section').classList.remove('hidden');
    document.getElementById('regalos-nombre').textContent = EVENT.nombre;
    const btn = document.getElementById('btn-regalos');
    btn.textContent = EVENT.mesaRegalos.textoBoton; btn.href = EVENT.mesaRegalos.enlace;
  }

  // ── 11. CONFIRMACIÓN ─────────────────────────────────────
  function construirConfirmacion() {
    document.getElementById('confirmacion-copy').textContent = EVENT.confirmacion.textoAcompanamiento ||
      `Avísale a ${EVENT.confirmacion.nombreContacto} para que nadie se quede sin lugar.`;
    const btn = document.getElementById('btn-confirmar');
    btn.href = EVENT.confirmacion.enlace;
  }

  // ── 12. CALENDARIO Y COMPARTIR ───────────────────────────
  function construirCalendario() {
    const cal = EVENT.calendario;
    const f   = new Date(EVENT.fechaISO);
    const fin = new Date(f.getTime() + 4 * 3600000);
    const fmt = d => `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}T${String(d.getHours()).padStart(2,'0')}${String(d.getMinutes()).padStart(2,'0')}00`;
    const ics = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nBEGIN:VEVENT\r\nDTSTART:${fmt(f)}\r\nDTEND:${fmt(fin)}\r\nSUMMARY:${cal.titulo}\r\nDESCRIPTION:${cal.descripcion}\r\nLOCATION:${cal.lugar}\r\nEND:VEVENT\r\nEND:VCALENDAR`;
    const btn = document.getElementById('btn-calendario');
    btn.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
    btn.download = `fiesta-${EVENT.nombre.toLowerCase()}.ics`;

    // Íconos de compartir
    const url   = encodeURIComponent(window.location.href);
    const texto = encodeURIComponent(`¡Te invito a la fiesta de ${EVENT.nombre}! 🎉`);
    document.getElementById('compartir-wa').href =
      `https://api.whatsapp.com/send?text=${texto}%20${url}`;
    document.getElementById('compartir-fb').href =
      `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    // Instagram no tiene API de compartir URL — el link ya apunta a la app
  }

  // ── INIT ─────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    aplicarIdentidad();
    crearCentellas();
    iniciarPortada();
    construirHero();
    iniciarCountdown();
    construirMensaje();
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
