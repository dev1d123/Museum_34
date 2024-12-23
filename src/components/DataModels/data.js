import models from '../../models/index.js';

const modelData = [
  {
    id: 1,
    title: "Cañón del Colca - Arequipa",
    description: "Cañón del Colca, uno de los más profundos del mundo, es un impresionante destino natural ubicado en la región de Arequipa. Este lugar combina paisajes espectaculares, terrazas agrícolas milenarias y la majestuosidad del vuelo del cóndor andino. Con una profundidad que supera los 4,000 metros, el cañón es un testimonio de la belleza y la fuerza de la naturaleza.",
    path: models.colcaR,
  },
  {
    id: 2,
    title: "Plaza de Armas de Arequipa 1",
    description: "La Plaza de Armas de Arequipa, considerada una de las más bellas de Sudamérica, es el corazón de la Ciudad Blanca. Este modelo 3D captura la arquitectura icónica de la plaza, rodeada por el majestuoso Portal de Flores, el Portal de San Agustín, y la impresionante Catedral. Este espacio histórico ha sido testigo de importantes eventos culturales y sociales a lo largo de los siglos.",
    path: models.plazaR,
  },
  {
    id: 3,
    title: "Campiña de Arequipa 1",
    description: "La Campiña de Arequipa es un paisaje emblemático que combina naturaleza, tradición y cultura. Con sus verdes campos, terrazas agrícolas y caminos serpenteantes, este modelo captura la esencia de un lugar donde el tiempo parece detenerse. Los volcanes Misti, Chachani y Pichu Pichu enmarcan este paisaje idílico, mientras los antiguos sistemas de irrigación y los canales de piedra hablan de la armoniosa convivencia entre los habitantes y la tierra.",
    path: models.valleR,
  },
  {
    id: 4,
    title: "Plaza de Armas de Arequipa 2",
    description: "Este modelo 3D ofrece una nueva perspectiva de la Plaza de Armas de Arequipa, resaltando detalles únicos de su diseño colonial. La vista también incluye la vegetación cuidadosamente mantenida de los jardines centrales, donde destaca una imponente fuente de bronce que es punto de encuentro para locales y visitantes. Este enfoque captura la vibrante atmósfera de un lugar lleno de historia y vida cotidiana.",
    path: models.plaza2R,
  },
  {
    id: 5,
    title: "Mirador de Yanahuara",
    description: "El Mirador de Yanahuara es uno de los lugares más icónicos de Arequipa, conocido por sus arcos de sillar tallados con frases de célebres personajes y vistas panorámicas de la ciudad. Desde este punto, se puede admirar el imponente volcán Misti y la belleza de la campiña arequipeña. Este modelo 3D captura los detalles arquitectónicos de los arcos y la tranquilidad del entorno, que invitan a la reflexión y al disfrute del paisaje.",
    path: models.miradorR,
    },
  {
    id: 6,
    title: "Volcán Misti Imagen",
    description: "El Volcán Misti es el símbolo más reconocido de Arequipa, con su forma cónica perfecta y su imponente presencia. El volcán, aún considerado activo, ha sido parte fundamental de la historia y cultura de la región, siendo fuente de inspiración para mitos, leyendas y obras artísticas. Esta representación captura su majestuosidad y su conexión íntima con el paisaje arequipeño.",
    path: models.volcanR,
  },
  {
    id: 7,
    title: "Catedral de Arequipa en la Tarde",
    description: "La Catedral de Arequipa, iluminada por la cálida luz del atardecer, revela la belleza de su arquitectura neoclásica construida en sillar blanco. Este modelo 3D destaca los detalles de sus altas torres, su imponente fachada y los matices dorados que adquiere bajo la luz vespertina. Ubicada en la Plaza de Armas, esta catedral es un símbolo de la rica historia religiosa y cultural de la ciudad.",
    path: models.catedralR,
  },
  {
    id: 8,
    title: "Campiña de Arequipa con el Misti",
    description: "Esta imagen captura la serenidad de la campiña de Arequipa con el imponente Volcán Misti como telón de fondo. Los campos verdes, las terrazas agrícolas y los canales de irrigación tradicionales contrastan con la majestuosidad del volcán, creando una escena que combina la riqueza natural y cultural de la región. Es una representación que evoca la armonía entre el trabajo del hombre y la naturaleza.",
    path: models.volcan2R,
  },
  {
    id: 9,
    title: "Canteras del Sillar Imagen",
    description: "La imagen de las canteras del sillar muestra el lugar donde se extrae el icónico material volcánico que ha dado a Arequipa el nombre de 'Ciudad Blanca'. Estas canteras, situadas en las afueras de la ciudad, destacan por sus impresionantes paredes talladas a mano por generaciones de artesanos. En la fotografía, se aprecian los contrastes entre las texturas del sillar y el cielo despejado.",
    path: models.sillarR,
  },
  {
    id: 10,
    title: "Rocoto Relleno Imagen",
    description: "El Rocoto Relleno es un plato típico de la gastronomía peruana, especialmente popular en la región de Arequipa. Consiste en un rocoto (un tipo de pimiento picante) relleno de carne molida, cebolla, aceitunas, pasas y especias, coronado con queso y gratinado al horno. Se sirve tradicionalmente acompañado de pastel de papa.",
    path: models.rocotoR,
  },
  {
    id: 11,
    title: "Escultura de sillar en la cantera",
    description: "Esta escultura de sillar es una representación artística elaborada en las canteras de Arequipa, Perú. El sillar, una piedra volcánica blanca característica de la región, es un material emblemático en la arquitectura y el arte arequipeño. Estas esculturas destacan por su detallado trabajo artesanal y su conexión con la rica herencia cultural de la ciudad, conocida como la 'Ciudad Blanca'.",
    path: models.sillar2R,
  },
  {
    id: 12,
    title: "Canteras del Sillar Paisaje",
    description: "El paisaje de las canteras de sillar en Arequipa, Perú, ofrece una vista impresionante de formaciones de piedra volcánica blanca, talladas tanto por la naturaleza como por la mano del hombre. Estas canteras son una fuente histórica del sillar utilizado en la construcción de la ciudad, reflejando su rica tradición arquitectónica y cultural. El entorno combina belleza natural con la historia viva de la región.",
    path: models.sillar3R,
  },
  {
    id: 13,
    title: "Modelo 3D de la Catedral de Arequipa",
    description: "Este modelo 3D representa la majestuosa Catedral de Arequipa, uno de los principales símbolos de la ciudad y un ejemplo destacado de la arquitectura neoclásica en el Perú. Construida principalmente con sillar, piedra volcánica característica de la región, la catedral se encuentra ubicada en la Plaza de Armas de Arequipa.",
    path: models.catedral,
  },
  {
    id: 14,
    title: "Modelo 3D del águila",
    description: "Un impresionante modelo 3D que representa un águila tallada en sillar, el material volcánico característico de la región. El modelo destaca por la precisión en los detalles, como las texturas realistas de las plumas, las garras afiladas y la expresión majestuosa del ave, reflejando el arte tradicional andino en su máxima expresión.",
    path: models.eagle_sillar_polycam,
  },
  {
    id: 15,
    title: "Modelo 3D del burro",
    description: "Este modelo 3D recrea un burro esculpido en sillar, capturando con fidelidad los rasgos anatómicos del animal y el estilo artístico típico de la región. Los detalles en las orejas, la postura y el pelaje reflejan el uso cultural y simbólico del burro en las comunidades locales, destacando la habilidad del escultor.",
    path: models.donkey_sillar_polycam,
  },
  {
    id: 16,
    title: "Modelo 3D sillar de la mujer",
    description: "Una figura femenina tallada en sillar y representada en un modelo 3D de alta calidad. Este modelo pone énfasis en los rasgos expresivos del rostro, los pliegues del vestuario tradicional y los adornos, destacando la habilidad artesanal y el contexto cultural que rodea esta obra.",
    path: models.sillar_plycam_1,
  },
  {
    id: 17,
    title: "Modelo 3D sillar del hombre",
    description: "Modelo 3D que captura la esencia de una figura masculina esculpida en sillar. Los detalles en el rostro, la postura y los elementos del atuendo revelan la destreza artística y la importancia histórica de esta representación dentro del contexto cultural andino.",
    path: models.sillar_plycam_1,
  },
  {
    id: 18,
    title: "Modelo 3D sillar del portal",
    description: "Una majestuosa representación tridimensional de un portal esculpido en sillar, exhibiendo los complejos detalles del estilo barroco andino. Este modelo resalta la intrincada ornamentación, incluyendo motivos florales, geométricos y simbólicos, mostrando la influencia colonial y la adaptación indígena en la arquitectura.",
    path: models.barroco_andino,
  },
  {
    id: 19,
    title: "Modelo 3D de Furina",
    description: "Un modelo 3D detallado de Furina, un personaje icónico del juego Genshin Impact. Este modelo captura con precisión sus características únicas, desde los delicados detalles en su vestimenta y cabello, hasta su expresión facial distintiva, ofreciendo una representación fiel que destaca la estética visual del juego.",
    path: models.furina,
  },
  {
    id: 20,
    title: "Modelo 3D del Misti",
    description: "Una recreación 3D fiel del imponente volcán Misti, símbolo de Arequipa. Este modelo muestra la silueta perfecta de la montaña, destacando su cono simétrico y las sombras que producen las variaciones en su terreno. Es una representación precisa y detallada que captura la majestuosidad de esta montaña activa.",
    path: models.volcan,
  },
  {
    id: 0,
    title: "No deberias estar aqui",
    description: "Este modelo 3D captura la Plaza de Armas de Arequipa, uno de los espacios públicos más importantes de la ciudad. En este modelo, se aprecian los detalles arquitectónicos de los portales coloniales, la iglesia principal, y los monumentos históricos que rodean esta plaza vibrante.",
    path: models.sky_sphere,
  }
];


export default modelData;
