const EVENT = {

  nombre: "Sofía",
  fechaISO: "2026-08-01T13:00:00",
  fechaTexto: "Sábado 1 de agosto de 2026",
  horaTexto: "1:00 PM",

  colores: {
    fondo:       "#F5EEFF",
    caja:        "#EDE0FF",
    cajaAlt:     "#E8D5FF",
    primario:    "#7B2D8B",
    accion:      "#E8006A",
    accionHover: "#FF1A7A",
    detalle:     "#00C2B5",
    dorado:      "#D4A520",
    texto:       "#2A1A3E",
    textoSuave:  "#6B5080",
  },

  tipografias: {
    display: "Dancing Script",
    cuerpo:  "Nunito",
  },

  portada: { usarFoto: true },

  hero: {
    usarFondoFoto: true,
    fraseEdad: "¡Cumplo 7 años y quiero festejar contigo!",
  },

  textoInvitacion: "¡Quiero que seas parte de mi día más especial! Ven a celebrar conmigo, a bailar, reír y crear recuerdos que durarán para siempre.",

  galeria: [
    { archivo: "gallery-5.png", alt: "Sofía en el Roller" },
    { archivo: "gallery-1.png", alt: "Sofía en los brincolines" },
    { archivo: "gallery-2.png", alt: "Sofía posando" },
    { archivo: "gallery-3.png", alt: "Sofía en el resbaladero" },
    { archivo: "gallery-4.png", alt: "Sofía en Lingo Hospital" },
    { archivo: "gallery-6.png", alt: "Sofía en el escenario" },
  ],

  ubicacion: {
    modo: "domicilio",
    nombreLugar: "Lingo Lingo Party",
    linkUbicacion: "https://maps.app.goo.gl/56RdqiTPRM6SdNnb9",
    embedMapa: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d470.0!2d-100.2432293!3d25.6805236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8662eb0c76f4c985%3A0x10e940e1f88a4667!2sLingo%20Lingo%20Party!5e0!3m2!1ses!2smx!4v1" width="100%" height="240" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
  },

  programa:    [],
  menu:        [],
  vestimenta:  { texto: "", emoji: "" },
  mesaRegalos: { enlace: "", textoBoton: "Ver lista de regalos" },

  confirmacion: {
    enlace: "https://wa.me/528110314514?text=¡Hola! Confirmo mi asistencia a la fiesta de Sofía",
    textoAcompanamiento: "Confírmale a mi mamá para que te tengamos bien contemplado.",
    nombreContacto: "mamá",
  },

  calendario: {
    titulo:      "Fiesta de Sofía",
    descripcion: "La fiesta de Sofía en Lingo Lingo Party",
    lugar:       "Lingo Lingo Party, Guadalupe, N.L.",
  },

  musica: { archivo: "assets/music/cancion.m4a" },

};
