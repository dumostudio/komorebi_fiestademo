const EVENT = {

  nombre: "Sofía",
  nombreCompleto: "Sofía Ramírez",
  edad: "7",
  edadTexto: "años",
  fechaISO: "2026-08-01T13:00:00",
  fechaTexto: "Sábado 1 de agosto de 2026",
  horaTexto: "1:00 PM",
  tematica: "K-Pop Stars",

  colores: {
    primario:    "#C026D3",
    secundario:  "#E879F9",
    fondo:       "#FAF0FF",
    texto:       "#3B0764",
    acento:      "#FDE047",
  },

  tipografias: {
    display: "Dancing Script",
    cuerpo:  "Nunito",
  },

  portada: {
    usarFoto: true,
  },

  hero: {
    usarFondoFoto: true,
    // Frase que aparece debajo del nombre — edita aquí para cada cliente
    fraseEdad: "¡Te invito a mi fiesta, cumplo 7 años! ⭐",
  },

  textoInvitacion: "¡Quiero que seas parte de mi día más especial! Ven a celebrar conmigo, a bailar, reír y hacer recuerdos que nunca vamos a olvidar. 💜",

  galeria: [
    { archivo: "gallery-5.png", alt: "Sofía en el Roller" },
    { archivo: "gallery-1.png", alt: "Sofía en los brincolines" },
    { archivo: "gallery-2.png", alt: "Sofía posando" },
    { archivo: "gallery-3.png", alt: "Sofía en el resbaladero" },
    { archivo: "gallery-4.png", alt: "Sofía en Lingo Hospital" },
    { archivo: "gallery-6.png", alt: "Sofía en el escenario" },
  ],

  ubicacion: {
    modo: "domicilio",           // "salon" = foto + botón | "domicilio" = mapa embed + botón
    nombreLugar: "Lingo Lingo Party",
    linkUbicacion: "https://maps.app.goo.gl/56RdqiTPRM6SdNnb9",
    embedMapa: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d470.0!2d-100.2432293!3d25.6805236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8662eb0c76f4c985%3A0x10e940e1f88a4667!2sLingo%20Lingo%20Party!5e0!3m2!1ses!2smx!4v1" width="100%" height="280" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
  },

  programa: [],
  menu: [],
  vestimenta: { texto: "", emoji: "👗" },
  mesaRegalos: { enlace: "", nombreTienda: "Amazon", textoBoton: "Ver lista de regalos 🎁" },

  confirmacion: {
    enlace: "https://wa.me/528110314514?text=¡Hola! Confirmo mi asistencia a la fiesta de Sofía 🎉",
    textoBoton: "Confirmar asistencia 🎉",
    nombreContacto: "mamá",
  },

  calendario: {
    titulo: "Fiesta de Sofía ⭐",
    descripcion: "¡La fiesta de Sofía! No faltes 🎉",
    lugar: "Lingo Lingo Party, Guadalupe, N.L.",
  },

  musica: {
    archivo: "assets/music/cancion.m4a",
  },

};
