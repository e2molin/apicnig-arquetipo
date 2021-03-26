import Arquetipo from 'facade/arquetipo';


M.language.setLang('es'); //Español
//M.language.setLang('en'); //Inglés

const map = M.map({
  container: 'mapjs',
  controls: ['panzoom','panzoombar', 'scale*true', 'scaleline', 'rotate', 'location','backgroundlayers'], //getfeatureinfo: este control es un poco coñazo, siempre está buscando información al hacer clic en el mapa.
  // controls: ['panzoom', 'scale*true', 'scaleline', 'rotate', 'location', 'backgroundlayers', 'getfeatureinfo'],
  zoom: 6,
  maxZoom: 20,
  minZoom: 4,
  projection: "EPSG:3857*m",
  center: {
      x: -712300,
      y: 4310700,
      draw: false  //Dibuja un punto en el lugar de la coordenada
  },
});



const mp = new Arquetipo({
  position: 'TL',             // Posición del plugin en pantalla (TR-TL-BR-BL)
  collapsible: true,          // El botón para desplegar/replegar el plugin no aparece (false) o sí aparece(true)
  collapsed: true,            // El panel flotante del plugin aparece desplegado (false) o replegado (true)
});

map.addPlugin(mp);
