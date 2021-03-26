/**
 * @module M/impl/control/ArquetipoControl
 */

export default class ArquetipoControl extends M.impl.Control {
  /**
   * This function adds the control to the specified map
   *
   * @public
   * @function
   * @param {M.Map} map to add the plugin
   * @param {HTMLElement} html of the plugin
   * @api stable
   * 
   * 👁 Atención. Dentro de la clase  M.impl.Control, map es la instancia al mapa de Openlayers. FacadeMap es la instancia del mapa de APICNIG
   */
  addTo(map, html) {
    
    this.facadeMap_ = map;  //e2m: Objeto mapa de APICNIG. La variable map que viene en el método AddTo es el mapa de APICNIG 👁❗️
    const olMap = map.getMapImpl();//e2m: Objeto mapa de OL

    olMap.getInteractions().forEach((interaction) => {
      if (interaction instanceof ol.interaction.DoubleClickZoom) {
        this.dblClickInteraction_ = interaction;
      }
    });
    
    // super addTo - don't delete
    super.addTo(map, html);
  }

  /**
   * @function
   * @api
   * @returns Instance of M.Map
   * 
   * e2m: FacadeMap es la instancia del mapa de APICNIG
   */
  getFacadeMap(){
    return this.facadeMap_
  }


  // Add your own functions
  activateClick(map) {

    // desactivo el zoom al dobleclick
    this.dblClickInteraction_.setActive(false); 
    console.log("Rebuscando");
    console.log(this.map_);
    console.log(this.facadeMap_);
    // añado un listener al evento dblclick
    const olMap = map.getMapImpl();
    olMap.on('dblclick', (evt) => {
      // disparo un custom event con las coordenadas del dobleclick
      const customEvt = new CustomEvent('mapclicked', {
        detail: evt.coordinate,
        bubbles: true,
      });
      map.getContainer().dispatchEvent(customEvt);
    });

  }

  deactivateClick(map) {

    // activo el zoom al dobleclick
    this.dblClickInteraction_.setActive(true);

    // elimino el listener del evento
    map.getMapImpl().removeEventListener('dblclick');
    
  }
}
