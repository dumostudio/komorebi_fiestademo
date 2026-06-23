// ============================================================
//  KOMOREBI — Maqueta Infantil v1
//  EDITA SOLO ESTE ARCHIVO para personalizar cada invitación.
//  No toques index.html, style.css ni script.js.
// ============================================================

const EVENT = {

  // ----------------------------------------------------------
  //  DATOS GENERALES
  // ----------------------------------------------------------
  nombre: "Rebeca",                          // Nombre que aparece en portada y hero
  nombreCompleto: "Rebeca García",           // Nombre completo (pie de página, etc.)
  edad: "3",                                 // Número de años que cumple
  edadTexto: "añitos",                       // "años", "añitos", "primaveras"
  fechaISO: "2026-05-23T12:00:00",           // Para el countdown (ISO 8601)
  fechaTexto: "Sábado 23 de mayo de 2026",   // Texto legible de la fecha
  horaTexto: "12:00 PM",
  tematica: "Haditas del bosque",            // Temática del evento (uso interno/visual)

  // ----------------------------------------------------------
  //  PALETA DE COLORES
  //  Cambia estos 5 valores y cambia toda la invitación.
  //  Son placeholders — sustituye con la paleta del cliente.
  // ----------------------------------------------------------
  colores: {
    primario:    "#E91E8C",   // Color principal (botones, acentos fuertes)
    secundario:  "#F48FB1",   // Color de apoyo (fondos suaves, bordes)
    fondo:       "#FFF0F6",   // Color de fondo general de la página
    texto:       "#4A1942",   // Color del texto principal
    acento:      "#FFD700",   // Color de detalles decorativos
  },

  // ----------------------------------------------------------
  //  TIPOGRAFÍAS (nombres exactos de Google Fonts)
  // ----------------------------------------------------------
  tipografias: {
    display: "Dancing Script",   // Para el nombre y títulos principales
    cuerpo:  "Nunito",           // Para textos de lectura
  },

  // ----------------------------------------------------------
  //  PORTADA (pantalla de entrada con clic para música)
  // ----------------------------------------------------------
  portada: {
    // La imagen de portada va en assets/photos/portada.jpg
    // Si no hay foto, usa solo el color de fondo
    usarFoto: true,
    textoBoton: "¡Toca para abrir tu invitación! 🎉",
  },

  // ----------------------------------------------------------
  //  HERO
  // ----------------------------------------------------------
  hero: {
    // Foto circular del/la festejado/a: assets/photos/hero.jpg
    // Fondo opcional del hero (foto del salón/lugar): assets/photos/hero-fondo.jpg
    usarFondoFoto: false,       // true = foto de salón, false = solo color
    subtitulo: "cumple",        // "cumple", "festeja", "celebra"
    emoji: "🎂",
  },

  // ----------------------------------------------------------
  //  TEXTO DE INVITACIÓN (sección debajo del countdown)
  // ----------------------------------------------------------
  textoInvitacion: "Con muchísimo amor queremos que seas parte de este día tan especial. ¡Ven a celebrar con nosotros y hagamos juntos un recuerdo que dure para siempre! 🌸",

  // ----------------------------------------------------------
  //  GALERÍA (estilo polaroid apilada, navegable con toque)
  //  Fotos en assets/photos/gallery-1.jpg hasta gallery-N.jpg
  //  Agrega o quita entradas de esta lista según las fotos que tengas.
  // ----------------------------------------------------------
  galeria: [
    { archivo: "gallery-1.jpg", alt: "Foto 1 de Rebeca" },
    { archivo: "gallery-2.jpg", alt: "Foto 2 de Rebeca" },
    { archivo: "gallery-3.jpg", alt: "Foto 3 de Rebeca" },
    { archivo: "gallery-4.jpg", alt: "Foto 4 de Rebeca" },
  ],

  // ----------------------------------------------------------
  //  UBICACIÓN
  //  Dos modos:
  //    "salon" → muestra foto del lugar + botón de ubicación
  //    "domicilio" → muestra mapa embed de Google Maps directamente
  // ----------------------------------------------------------
  ubicacion: {
    modo: "domicilio",              // "salon" o "domicilio"
    nombreLugar: "",                // Solo si modo = "salon"
    // Foto del lugar: assets/photos/lugar.jpg (solo si modo = "salon")
    linkUbicacion: "https://maps.app.goo.gl/XXXXXXX",  // Botón "Ver ubicación"
    embedMapa: `<iframe src="https://www.google.com/maps/embed?pb=!1m18..." width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`,
    // Solo se usa el embed cuando modo = "domicilio"
  },

  // ----------------------------------------------------------
  //  PROGRAMA DEL DÍA
  //  Si la lista está vacía [], la sección NO se muestra.
  // ----------------------------------------------------------
  programa: [
    // { hora: "12:00", actividad: "Llegada de invitados" },
    // { hora: "12:30", actividad: "Dinámica de juegos" },
    // { hora: "14:00", actividad: "Comida" },
    // { hora: "15:00", actividad: "Pastel y festejo" },
  ],

  // ----------------------------------------------------------
  //  MENÚ
  //  Si la lista está vacía [], la sección NO se muestra.
  // ----------------------------------------------------------
  menu: [
    // { platillo: "Hot dogs", descripcion: "Con papitas y refresco" },
    // { platillo: "Pastel de vainilla", descripcion: "Decorado con el tema" },
    // { platillo: "Agua fresca", descripcion: "Jamaica y horchata" },
  ],

  // ----------------------------------------------------------
  //  CÓDIGO DE VESTIMENTA
  //  Si texto está vacío "", la sección NO se muestra.
  //  Ejemplos:
  //    "Quinta con alberca: traje de baño y bloqueador 🩱☀️"
  //    "Salón con brincolines: calcetines antiderrapantes 🧦"
  // ----------------------------------------------------------
  vestimenta: {
    texto: "",
    emoji: "👗",
  },

  // ----------------------------------------------------------
  //  MESA DE REGALOS
  //  Si enlace está vacío "", la sección NO se muestra.
  //  Solo enlace a tienda comercial (Amazon, Liverpool, etc.)
  //  Sin mención de sobres ni transferencias.
  // ----------------------------------------------------------
  mesaRegalos: {
    enlace: "",
    nombreTienda: "Amazon",   // "Amazon", "Liverpool", "El Palacio de Hierro"
    textoBoton: "Ver lista de regalos 🎁",
  },

  // ----------------------------------------------------------
  //  CONFIRMACIÓN DE ASISTENCIA
  //  Acepta cualquier tipo de enlace: WhatsApp, Confirmalia, form, etc.
  // ----------------------------------------------------------
  confirmacion: {
    enlace: "https://wa.me/528110314514?text=¡Hola! Confirmo mi asistencia a la fiesta de Rebeca 🎉",
    textoBoton: "Confirmar asistencia",
    nombreContacto: "mamá Cira",
  },

  // ----------------------------------------------------------
  //  GUARDAR EN CALENDARIO
  // ----------------------------------------------------------
  calendario: {
    titulo: "Fiesta de Rebeca 🎂",
    descripcion: "¡La fiesta de Rebeca! No faltes 🎉",
    lugar: "",   // Se llena con la dirección del evento
  },

  // ----------------------------------------------------------
  //  MÚSICA
  //  Archivo en assets/music/cancion.mp3
  // ----------------------------------------------------------
  musica: {
    archivo: "assets/music/cancion.mp3",
    textoPlayer: "🎵 Toca play para la música de la fiesta",
  },

};
