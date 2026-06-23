(function () {
  'use strict';

  function aplicarIdentidad() {
    const c = EVENT.colores, t = EVENT.tipografias;
    const r = document.documentElement;
    r.style.setProperty('--color-primario',   c.primario);
    r.style.setProperty('--color-secundario', c.secundario);
    r.style.setProperty('--color-fondo',      c.fondo);
    r.style.setProperty('--color-texto',      c.texto);
    r.style.setProperty('--color-acento',     c.acento);
    r.style.setProperty('--font-display',     `'${t.display}', cursive`);
    r.style.setProperty('--font-cuerpo',      `'${t.cuerpo}', sans-serif`);
    const link = document.createElement('link');
    link.rel  = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(t.display)}:wght@400;700&family=${encodeURIComponent(t.cuerpo)}:wght@400;600;700&display=swap`;
    document.head.appendChild(link);
    document.getElementById('page-title').textContent = `¡Fiesta de ${EVENT.nombre}! 🎉`;
  }

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
    portada.addEventListener('touchend', function(e) { e.preventDefault(); abrir(); }, { once: true });
  }

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

  function construirHero() {
    document.getElementById('hero-nombre').textContent = EVENT.nombre;
    // Frase de edad — viene directamente de event.js, editable por cliente
    document.getElementById('hero-edad').textContent = EVENT.hero.fraseEdad;
    if (EVENT.hero.usarFondoFoto) {
      document.getElementById('hero-fondo').style.backgroundImage = "url('assets/photos/hero-fondo.jpg')";
    }
  }

  function iniciarCountdown() {
    document.getElementById('countdown-fecha').textContent = `${EVENT.fechaTexto} · ${EVENT.horaTexto}`;
    const meta = new Date(EVENT.fechaISO).getTime();
    const pad  = n => String(n).padStart(2, '0');
    function tick() {
      const diff = meta - Date.now();
      if (diff <= 0) { ['cd-dias','cd-horas','cd-min','cd-seg'].forEach(id => document.getElementById(id).textContent = '00'); return; }
      document.getElementById('cd-dias').textContent  = pad(Math.floor(diff / 86400000));
      document.getElementById('cd-horas').textContent = pad(Math.floor((diff % 86400000) / 3600000));
      document.getElementById('cd-min').textContent   = pad(Math.floor((diff % 3600000) / 60000));
      document.getElementById('cd-seg').textContent   = pad(Math.floor((diff % 60000) / 1000));
    }
    tick(); setInterval(tick, 1000);
  }

  function construirTexto() {
    document.getElementById('invitacion-texto').textContent = EVENT.textoInvitacion;
  }

  function construirGaleria() {
    const fotos = EVENT.galeria;
    if (!fotos || fotos.length === 0) { document.getElementById('galeria-section').classList.add('hidden'); return; }
    const stack = document.getElementById('galeria-stack');
    const contador = document.getElementById('galeria-contador');
    let actual = 0;
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
    function actualizarContador() { contador.textContent = `${actual + 1} / ${fotos.length}`; }
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

  function construirUbicacion() {
    const u = EVENT.ubicacion;
    // Título de la sección
    document.getElementById('ubicacion-titulo').textContent = `¿Dónde nos vemos?`;

    if (u.modo === 'salon') {
      document.getElementById('ubicacion-salon').classList.remove('hidden');
      document.getElementById('salon-nombre').textContent = u.nombreLugar;
      document.getElementById('btn-ubicacion-salon').href = u.linkUbicacion;
    } else {
      document.getElementById('ubicacion-domicilio').classList.remove('hidden');
      // Nombre del lugar sobre el mapa
      const nombreEl = document.getElementById('salon-nombre-mapa');
      if (u.nombreLugar) nombreEl.textContent = u.nombreLugar;
      document.getElementById('mapa-embed').innerHTML = u.embedMapa;
      const btnMaps = document.getElementById('btn-ubicacion-maps');
      btnMaps.href = u.linkUbicacion;
    }
  }

  function construirPrograma() {
    if (!EVENT.programa || EVENT.programa.length === 0) return;
    document.getElementById('programa-section').classList.remove('hidden');
    const list = document.getElementById('programa-lista');
    EVENT.programa.forEach(item => {
      const el = document.createElement('div'); el.className = 'programa-item';
      el.innerHTML = `<span class="programa-hora">${item.hora}</span><span>${item.actividad}</span>`;
      list.appendChild(el);
    });
  }

  function construirMenu() {
    if (!EVENT.menu || EVENT.menu.length === 0) return;
    document.getElementById('menu-section').classList.remove('hidden');
    const list = document.getElementById('menu-lista');
    EVENT.menu.forEach(item => {
      const el = document.createElement('div'); el.className = 'menu-item';
      el.innerHTML = `<p class="menu-platillo">${item.platillo}</p>${item.descripcion ? `<p class="menu-desc">${item.descripcion}</p>` : ''}`;
      list.appendChild(el);
    });
  }

  function construirVestimenta() {
    if (!EVENT.vestimenta || !EVENT.vestimenta.texto) return;
    document.getElementById('vestimenta-section').classList.remove('hidden');
    document.getElementById('vestimenta-emoji').textContent = EVENT.vestimenta.emoji;
    document.getElementById('vestimenta-texto').textContent = EVENT.vestimenta.texto;
  }

  function construirMesaRegalos() {
    if (!EVENT.mesaRegalos || !EVENT.mesaRegalos.enlace) return;
    document.getElementById('regalos-section').classList.remove('hidden');
    document.getElementById('regalos-nombre').textContent = EVENT.nombre;
    const btn = document.getElementById('btn-regalos');
    btn.textContent = EVENT.mesaRegalos.textoBoton; btn.href = EVENT.mesaRegalos.enlace;
  }

  function construirConfirmacion() {
    document.getElementById('confirmacion-contacto').textContent = EVENT.confirmacion.nombreContacto;
    const btn = document.getElementById('btn-confirmar');
    btn.textContent = EVENT.confirmacion.textoBoton; btn.href = EVENT.confirmacion.enlace;
  }

  function construirCalendario() {
    const cal = EVENT.calendario;
    const f   = new Date(EVENT.fechaISO);
    const fin = new Date(f.getTime() + 4 * 3600000);
    const fmt = d => `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}T${String(d.getHours()).padStart(2,'0')}${String(d.getMinutes()).padStart(2,'0')}00`;
    const ics = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nBEGIN:VEVENT\r\nDTSTART:${fmt(f)}\r\nDTEND:${fmt(fin)}\r\nSUMMARY:${cal.titulo}\r\nDESCRIPTION:${cal.descripcion}\r\nLOCATION:${cal.lugar}\r\nEND:VEVENT\r\nEND:VCALENDAR`;
    const btn = document.getElementById('btn-calendario');
    btn.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
    btn.download = `fiesta-${EVENT.nombre.toLowerCase()}.ics`;
  }

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
