(function () {
  'use strict';

  // 1. COLORES Y TIPOGRAFÍAS
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

  // 2. PORTADA — toda la pantalla activa la música
  function iniciarPortada() {
    const portada = document.getElementById('portada');
    const main    = document.getElementById('main-content');

    // Foto de portada
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
      e.preventDefault();
      abrir();
    }, { once: true });
  }

  // 3. MÚSICA — arranca sola al abrir portada
  function iniciarMusica() {
    const audio = document.getElementById('audio-player');
    const btn   = document.getElementById('music-btn');
    const texto = document.getElementById('music-texto');
    const icon  = btn.querySelector('.music-icon');

    audio.src = EVENT.musica.archivo;
    texto.textContent = EVENT.musica.textoPlayer;

    audio.play()
      .then(() => { icon.textContent = '⏸'; })
      .catch(() => { icon.textContent = '▶'; });

    btn.addEventListener('click', () => {
      if (audio.paused) { audio.play(); icon.textContent = '⏸'; }
      else              { audio.pause(); icon.textContent = '▶'; }
    });
  }

  // 4. HERO
  function construirHero() {
    document.getElementById('hero-nombre').textContent = EVENT.nombre;
    document.getElementById('hero-edad').textContent =
      `${EVENT.hero.subtitulo} ${EVENT.edad} ${EVENT.edadTexto} ${EVENT.hero.emoji}`;

    if (EVENT.hero.usarFondoFoto) {
      const fondo = document.getElementById('hero-fondo');
      fondo.style.backgroundImage = "url('assets/photos/hero-fondo.jpg')";
    }
  }

  // 5. COUNTDOWN
  function iniciarCountdown() {
    document.getElementById('countdown-fecha').textContent =
      `${EVENT.fechaTexto} · ${EVENT.horaTexto}`;
    const meta = new Date(EVENT.fechaISO).getTime();
    const pad  = n => String(n).padStart(2, '0');

    function tick() {
      const diff = meta - Date.now();
      if (diff <= 0) {
        ['cd-dias','cd-horas','cd-min','cd-seg'].forEach(id =>
          document.getElementById(id).textContent = '00');
        return;
      }
      document.getElementById('cd-dias').textContent  = pad(Math.floor(diff / 86400000));
      document.getElementById('cd-horas').textContent = pad(Math.floor((diff % 86400000) / 3600000));
      document.getElementById('cd-min').textContent   = pad(Math.floor((diff % 3600000) / 60000));
      document.getElementById('cd-seg').textContent   = pad(Math.floor((diff % 60000) / 1000));
    }
    tick();
    setInterval(tick, 1000);
  }

  // 6. TEXTO
  function construirTexto() {
    document.getElementById('invitacion-texto').textContent = EVENT.textoInvitacion;
  }

  // 7. GALERÍA — polaroid apilada
  function construirGaleria() {
    const fotos = EVENT.galeria;
    if (!fotos || fotos.length === 0) {
      document.getElementById('galeria-section').classList.add('hidden');
      return;
    }
    const stack    = document.getElementById('galeria-stack');
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

    function actualizarContador() {
      contador.textContent = `${actual + 1} / ${fotos.length}`;
    }
    actualizarContador();

    function avanzar() {
      const activa = stack.querySelector('.galeria-card.activa');
      activa.classList.add('saliendo');
      activa.classList.remove('activa');
      setTimeout(() => {
        activa.classList.remove('saliendo');
        stack.appendChild(activa);
        const todas = stack.querySelectorAll('.galeria-card');
        todas.forEach((c, i) => { c.style.zIndex = todas.length - i; c.classList.remove('activa'); });
        todas[0].classList.add('activa');
        actual = (actual + 1) % fotos.length;
        actualizarContador();
      }, 250);
    }

    stack.addEventListener('click', avanzar);
    let startX = 0;
    stack.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    stack.addEventListener('touchend',   e => { if (Math.abs(e.changedTouches[0].clientX - startX) > 30) avanzar(); });
  }

  // 8. UBICACIÓN
  function construirUbicacion() {
    const u = EVENT.ubicacion;
    if (u.modo === 'salon') {
      document.getElementById('ubicacion-salon').classList.remove('hidden');
      document.getElementById('salon-nombre').textContent = u.nombreLugar;
      document.getElementById('btn-ubicacion-salon').href = u.linkUbicacion;
    } else {
      document.getElementById('ubicacion-domicilio').classList.remove('hidden');
      document.getElementById('mapa-embed').innerHTML = u.embedMapa;
    }
  }

  // 9. SECCIONES CONDICIONALES
  function construirPrograma() {
    if (!EVENT.programa || EVENT.programa.length === 0) return;
    const sec = document.getElementById('programa-section');
    const list = document.getElementById('programa-lista');
    sec.classList.remove('hidden');
    EVENT.programa.forEach(item => {
      const el = document.createElement('div');
      el.className = 'programa-item';
      el.innerHTML = `<span class="programa-hora">${item.hora}</span><span>${item.actividad}</span>`;
      list.appendChild(el);
    });
  }

  function construirMenu() {
    if (!EVENT.menu || EVENT.menu.length === 0) return;
    const sec = document.getElementById('menu-section');
    const list = document.getElementById('menu-lista');
    sec.classList.remove('hidden');
    EVENT.menu.forEach(item => {
      const el = document.createElement('div');
      el.className = 'menu-item';
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
    btn.textContent = EVENT.mesaRegalos.textoBoton;
    btn.href        = EVENT.mesaRegalos.enlace;
  }

  // 10. CONFIRMACIÓN
  function construirConfirmacion() {
    document.getElementById('confirmacion-contacto').textContent = EVENT.confirmacion.nombreContacto;
    const btn = document.getElementById('btn-confirmar');
    btn.textContent = EVENT.confirmacion.textoBoton;
    btn.href        = EVENT.confirmacion.enlace;
  }

  // 11. CALENDARIO (.ics)
  function construirCalendario() {
    const cal  = EVENT.calendario;
    const f    = new Date(EVENT.fechaISO);
    const fin  = new Date(f.getTime() + 4 * 3600000);
    const fmt  = d => `${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}T${String(d.getHours()).padStart(2,'0')}${String(d.getMinutes()).padStart(2,'0')}00`;
    const ics  = `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nBEGIN:VEVENT\r\nDTSTART:${fmt(f)}\r\nDTEND:${fmt(fin)}\r\nSUMMARY:${cal.titulo}\r\nDESCRIPTION:${cal.descripcion}\r\nLOCATION:${cal.lugar}\r\nEND:VEVENT\r\nEND:VCALENDAR`;
    const blob = new Blob([ics], { type: 'text/calendar' });
    const btn  = document.getElementById('btn-calendario');
    btn.href     = URL.createObjectURL(blob);
    btn.download = `fiesta-${EVENT.nombre.toLowerCase()}.ics`;
  }

  // INIT
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
