// ============================================================
//  KOMOREBI — Maqueta Infantil v1 — Instancia: Sofía / Huntrix
//  EDITA SOLO ESTE ARCHIVO para personalizar cada invitación.
// ============================================================

const EVENT = {

  // ----------------------------------------------------------
  //  DATOS GENERALES
  // ----------------------------------------------------------
  nombre: "Sofía",
  nombreCompleto: "Sofía Ramírez",
  edad: "7",
  edadTexto: "años",
  fechaISO: "2026-08-01T13:00:00",
  fechaTexto: "Sábado 1 de agosto de 2026",
  horaTexto: "1:00 PM",

  // ----------------------------------------------------------
  //  PALETA — 7 colores con roles fijos
  //  Variable por instancia: cambia según el personaje/temática.
  //  No cambiar los nombres de las propiedades.
  // ----------------------------------------------------------
  colores: {
    fondo:       "#F5EEFF",   // fondo base de la mayoría de secciones
    fondoAlt:    "#EDE0FF",   // secciones alternas (programa, vestimenta, footer)
    primario:    "#7B2D8B",   // títulos, borde del círculo, acentos
    accion:      "#E8006A",   // botones, countdown, botón música
    detalle:     "#00C2B5",   // detalles secundarios
    dorado:      "#D4A520",   // acentos mínimos
    texto:       "#2A1A3E",   // cuerpo sobre fondo claro
    textoSuave:  "#6B5080",   // secundario, etiquetas
  },

  // ----------------------------------------------------------
  //  TIPOGRAFÍAS — nombres exactos de Google Fonts
  //  Variable por instancia solo para display (nombre festejada).
  //  Nunito siempre fijo para el resto.
  // ----------------------------------------------------------
  tipografias: {
    display: "Dancing Script",   // nombre de la festejada
    cuerpo:  "Nunito",           // todo lo demás — no cambiar
  },

  // ----------------------------------------------------------
  //  PORTADA
  //  Imagen: assets/photos/portada.jpg
  // ----------------------------------------------------------
  portada: {
    usarFoto: true,
  },

  // ----------------------------------------------------------
  //  HERO
  //  Imagen de fondo 9:16: assets/photos/hero-fondo.jpg
  //  Foto círculo: assets/photos/hero.jpg
  // ----------------------------------------------------------
  hero: {
    usarFondoFoto: true,
    fraseEdad: "¡Te invito a mi fiesta, cumplo 7 años!",
  },

  // ----------------------------------------------------------
  //  TEXTO DE INVITACIÓN
  // ----------------------------------------------------------
  textoInvitacion: "¡Quiero que seas parte de mi día más especial! Ven a celebrar conmigo, a bailar, reír y hacer recuerdos que nunca vamos a olvidar.",

  // ----------------------------------------------------------
  //  GALERÍA
  //  Fotos en assets/photos/ con los nombres exactos de esta lista.
  //  El orden aquí es el orden de navegación. La primera es la que abre.
  // ----------------------------------------------------------
  galeria: [
    { archivo: "gallery-5.png", alt: "Sofía en el Roller" },
    { archivo: "gallery-1.png", alt: "Sofía en los brincolines" },
    { archivo: "gallery-2.png", alt: "Sofía posando" },
    { archivo: "gallery-3.png", alt: "Sofía en el resbaladero" },
    { archivo: "gallery-4.png", alt: "Sofía en Lingo Hospital" },
    { archivo: "gallery-6.png", alt: "Sofía en el escenario" },
  ],

  // ----------------------------------------------------------
  //  UBICACIÓN
  //  modo "salon"    → foto del lugar + nombre + botón Maps
  //  modo "domicilio"→ nombre del lugar + mapa embed + botón Maps
  // ----------------------------------------------------------
  ubicacion: {
    modo: "domicilio",
    nombreLugar: "Lingo Lingo Party",
    linkUbicacion: "https://maps.app.goo.gl/56RdqiTPRM6SdNnb9",
    embedMapa: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d470.0!2d-100.2432293!3d25.6805236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8662eb0c76f4c985%3A0x10e940e1f88a4667!2sLingo%20Lingo%20Party!5e0!3m2!1ses!2smx!4v1" width="100%" height="280" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
  },

  // ----------------------------------------------------------
  //  SECCIONES OPCIONALES
  //  Lista vacía [] o texto "" = sección no visible
  // ----------------------------------------------------------
  programa:   [],
  menu:       [],
  vestimenta: { texto: "", emoji: "" },
  mesaRegalos: {
    enlace:       "",
    textoBoton:   "Ver lista de regalos",
  },

  // ----------------------------------------------------------
  //  CONFIRMACIÓN
  // ----------------------------------------------------------
  confirmacion: {
    enlace:         "https://wa.me/528110314514?text=¡Hola! Confirmo mi asistencia a la fiesta de Sofía",
    textoBoton:     "Confirmar asistencia",
    nombreContacto: "mamá",
  },

  // ----------------------------------------------------------
  //  CALENDARIO
  // ----------------------------------------------------------
  calendario: {
    titulo:      "Fiesta de Sofía",
    descripcion: "La fiesta de Sofía en Lingo Lingo Party",
    lugar:       "Lingo Lingo Party, Guadalupe, N.L.",
  },

  // ----------------------------------------------------------
  //  MÚSICA
  //  Soporta .mp3 y .m4a
  // ----------------------------------------------------------
  musica: {
    archivo: "assets/music/cancion.m4a",
  },

};
