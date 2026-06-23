(function () {
  'use strict';

  // ── PARTÍCULAS ───────────────────────────────────────────
  function crearParticulas() {
    const contenedor = document.createElement('div');
    contenedor.style.cssText = `
      position: fixed; top: 0; left: 0;
      width: 100vw; height: 100vh;
      pointer-events: none; z-index: 0; overflow: hidden;
    `;
    document.body.insertBefore(contenedor, document.body.firstChild);

    const cantidad = Math.floor(Math.random() * 6) + 20; // 20-25
    for (let i = 0; i < cantidad; i++) {
      const p    = document.createElement('div');
      const size = (Math.random() * 3 + 3).toFixed(1);           // 3-6px
      const left = (Math.random() * 100).toFixed(1);              // 0-100vw
      const dur  = (Math.random() * 6 + 7).toFixed(1);           // 7-13s
      const del  = -(Math.random() * 13).toFixed(1);              // offset negativo = ya en pantalla
      const op   = (Math.random() * 0.3 + 0.25).toFixed(2);      // 0.25-0.55
      const dx   = ((Math.random() - 0.5) * 50).toFixed(0) + 'px'; // oscilación

      p.style.cssText = `
        position: absolute;
        width: ${size}px; height: ${size}px;
        border-radius: 50%;
        background: #D4A520;
        opacity: ${op};
        left: ${left}vw;
        top: -8px;
        animation: caerParticula ${dur}s ${del}s linear infinite;
        --dx: ${dx};
      `;
      contenedor.appendChild(p);
    }

    // Keyframes inyectados dinámicamente
    const style = document.createElement('style');
    style.textContent = `
      @keyframes caerParticula {
        0%   { transform: translateY(0) translateX(0); opacity: 0; }
        8%   { opacity: 1; }
        92%  { opacity: 0.4; }
        100% { transform: translateY(105vh) translateX(var(--dx)); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  // ── PORTADA ──────────────────────────────────────────────
  function iniciarPortada() {
    const portada = document.getElementById('portada');
    const main    = document.getElementById('main-content');
    if (typeof EVENT !== 'undefined' && EVENT.portada?.usarFoto) {
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

  // ── MÚSICA ───────────────────────────────────────────────
  function iniciarMusica() {
    if (typeof EVENT === 'undefined') return;
    const audio = document.getElementById('audio-player');
    const btn   = document.getElementById('music-btn');
    const icon  = btn.querySelector('.music-icon');
    audio.src = EVENT.musica?.archivo || '';
    audio.play().then(() => { icon.textContent = '⏸'; }).catch(() => { icon.textContent = '▶'; });
    btn.addEventListener('click', () => {
      if (audio.paused) { audio.play(); icon.textContent = '⏸'; }
      else              { audio.pause(); icon.textContent = '▶'; }
    });
  }

  // ── HERO ─────────────────────────────────────────────────
  function construirHero() {
    if (typeof EVENT === 'undefined') return;
    if (EVENT.hero?.usarFondoFoto) {
      document.getElementById('hero-fondo').style.backgroundImage =
        "url('assets/photos/hero-fondo.jpg')";
    }
    document.getElementById('hero-nombre').textContent = EVENT.nombre || '';
    document.getElementById('hero-edad').textContent   = EVENT.hero?.fraseEdad || '';
    document.getElementById('countdown-fecha').textContent =
      `${EVENT.fechaTexto || ''} · ${EVENT.horaTexto || ''}`;
  }

  // ── COUNTDOWN ────────────────────────────────────────────
  function iniciarCountdown() {
    if (typeof EVENT === 'undefined') return;
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

  // ── TEXTO INVITACIÓN ─────────────────────────────────────
  function construirTexto() {
    if (typeof EVENT === 'undefined') return;
    document.getElementById('invitacion-texto').textContent = EVENT.textoInvitacion || '';
  }

  // ── GALERÍA ──────────────────────────────────────────────
  function construirGaleria() {
    if (typeof EVENT === 'undefined') return;
    const fotos = EVENT.galeria;
    if (!fotos || !fotos.length) {
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
      img.src = `assets/photos/${foto.archivo}`; img.alt = foto.alt || '';
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

  // ── UBICACIÓN ────────────────────────────────────────────
  function construirUbicacion() {
    if (typeof EVENT === 'undefined') return;
    const u = EVENT.ubicacion;
    const titulo = document.getElementById('ubicacion-titulo');
    if (titulo) titulo.textContent = 'Dónde nos vemos';

    if (u.modo === 'salon') {
      document.getElementById('ubicacion-salon').classList.remove('hidden');
      const sn = document.getElementById('salon-nombre');
      if (sn) sn.textContent = u.nombreLugar || '';
      document.getElementById('btn-ubicacion-salon').href = u.linkUbicacion;
    } else {
      document.getElementById('ubicacion-domicilio').classList.remove('hidden');
      const snm = document.getElementById('salon-nombre-mapa');
      if (snm && u.nombreLugar) snm.textContent = u.nombreLugar;
      document.getElementById('mapa-embed').innerHTML = u.embedMapa || '';
      document.getElementById('btn-ubicacion-maps').href = u.linkUbicacion;
    }
  }

  // ── SECCIONES OPCIONALES ─────────────────────────────────
  function construirPrograma() {
    if (!EVENT?.programa?.length) return;
    document.getElementById('programa-section').classList.remove('hidden');
    const list = document.getElementById('programa-lista');
    EVENT.programa.forEach(item => {
      const el = document.createElement('div'); el.className = 'programa-item';
      el.innerHTML = `<span class="programa-hora">${item.hora}</span><span>${item.actividad}</span>`;
      list.appendChild(el);
    });
  }

  function construirMenu() {
    if (!EVENT?.menu?.length) return;
    document.getElementById('menu-section').classList.remove('hidden');
    const list = document.getElementById('menu-lista');
    EVENT.menu.forEach(item => {
      const el = document.createElement('div');
      el.innerHTML = `<p class="menu-platillo">${item.platillo}</p>${item.descripcion ? `<p class="menu-desc">${item.descripcion}</p>` : ''}`;
      list.appendChild(el);
    });
  }

  function construirVestimenta() {
    if (!EVENT?.vestimenta?.texto) return;
    document.getElementById('vestimenta-section').classList.remove('hidden');
    document.getElementById('vestimenta-emoji').textContent = EVENT.vestimenta.emoji || '';
    document.getElementById('vestimenta-texto').textContent = EVENT.vestimenta.texto;
  }

  function construirMesaRegalos() {
    if (!EVENT?.mesaRegalos?.enlace) return;
    document.getElementById('regalos-section').classList.remove('hidden');
    document.getElementById('regalos-nombre').textContent = EVENT.nombre || '';
    const btn = document.getElementById('btn-regalos');
    btn.textContent = EVENT.mesaRegalos.textoBoton || 'Ver lista de regalos';
    btn.href = EVENT.mesaRegalos.enlace;
  }

  // ── CONFIRMACIÓN ─────────────────────────────────────────
  function construirConfirmacion() {
    if (typeof EVENT === 'undefined') return;
    const contacto = document.getElementById('confirmacion-contacto');
    if (contacto) contacto.textContent = EVENT.confirmacion?.nombreContacto || '';
    const btn = document.getElementById('btn-confirmar');
    btn.href = EVENT.confirmacion?.enlace || '#';
  }

  // ── CALENDARIO Y COMPARTIR ───────────────────────────────
  function construirCalendario() {
    if (typeof EVENT === 'undefined') return;
    const cal = EVENT.calendario || {};
    const f   = new Date(EVENT.fechaISO);
    const fin = new Date(f.getTime() + 4 * 3600000);
    const fmt = d => `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}T${String(d.getHours()).padStart(2,'0')}${String(d.getMinutes()).padStart(2,'0')}00`;
    const ics = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nBEGIN:VEVENT\r\nDTSTART:${fmt(f)}\r\nDTEND:${fmt(fin)}\r\nSUMMARY:${cal.titulo||''}\r\nDESCRIPTION:${cal.descripcion||''}\r\nLOCATION:${cal.lugar||''}\r\nEND:VEVENT\r\nEND:VCALENDAR`;
    const btn = document.getElementById('btn-calendario');
    btn.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
    btn.download = `fiesta-${(EVENT.nombre || 'evento').toLowerCase()}.ics`;

    // Compartir
    const url   = encodeURIComponent(window.location.href);
    const texto = encodeURIComponent(`¡Te invito a la fiesta de ${EVENT.nombre || ''}! 🎉`);
    const fbEl  = document.getElementById('compartir-fb');
    if (waEl) waEl.href = `https://api.whatsapp.com/send?text=${texto}%20${url}`;
    if (fbEl) fbEl.href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  }

  // ── INIT ─────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    crearParticulas();
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
