/**
 * @module M/plugin/Arquetipo
 */
import 'assets/css/arquetipo';
import ArquetipoControl from './arquetipocontrol';
import api from '../../api.json';
import { getValue as getValueTranslate} from './i18n/language'; //e2m: Multilanguage support. Alias -> getValue is too generic


/**
 * e2m: 
 * Hereda de la clase abstracta **M.Plugin** definida en el API-CNIG  
 * Aquí se implementa una serie lógica que permite funcionar a la clase como plugin denro del entorno de API-CNIG
 * 
 */
export default class Arquetipo extends M.Plugin {
  /**
   * @classdesc
   * Main facade plugin object. This class creates a plugin
   * object which has an implementation Object
   *
   * @constructor
   * @extends {M.Plugin}
   * @param {Object} impl implementation object
   * @api stable
   */
  constructor(options = {}) {
    super();

    /**
     * Name plugin
     * @private
     * @type {String}
     */
     this.name_ = 'arquetipo';

    /**
     * Facade of the map
     * @private
     * @type {M.Map}
     */
    this.map_ = null; //e2m: instancia de nuestro mapa de la API-CNIG

    /**
     * Array of controls
     * @private
     * @type {Array<M.Control>}
     */
    this.controls_ = []; //e2m: algunos plugins se definen con más de un control. Enesos casos, la lista de controles se datallan aquí.

    /**
     * Class name of the html view Plugin
     * @public
     * @type {string}
     */
     this.className = 'm-plugin-arquetipo';

    /**
     * Position of the Plugin
     * @public
     * Posible values: TR | TL | BL | BR
     * @type {String}
     */
     const positions = ['TR', 'TL', 'BL', 'BR'];
     this.position = positions.includes(options.position) ? options.position : 'TR';
     if (this.position_ === 'TL' || this.position_ === 'BL'){
        this.positionClass_ = 'left';
     }else{
        this.positionClass_ = 'right';
     }

    /**
     * Collapsed attribute
     * @public
     * @type {boolean}
     */
     this.collapsed = options.collapsed;
     if (this.collapsed === undefined) this.collapsed = true;
 
     /**
      * Collapsible attribute
      * @public
      * @type {boolean}
      */
     this.collapsible = options.collapsible;
     if (this.collapsible === undefined) this.collapsible = true;

    /**
     *@private
     *@type { string }
     */
     this.tooltip_ = options.tooltip || getValueTranslate('tooltip');

    /**
     * Metadata from api.json
     * @private
     * @type {Object}
     */
    this.metadata_ = api.metadata;
  }

  /**
   * This function adds this plugin into the map
   *
   * @public
   * @function
   * @param {M.Map} map the map to add the plugin
   * @api stable
   */
  /**
   * e2m:
   * El método addTo() inicia el ciclo de vida del plugin.
   * Cuado ejecutamos el método map.addPlugin() al objeto map, se invoca este método
   * 
   */
  addTo(map) {

    const pluginOnLeft = !!(['TL', 'BL'].includes(this.position));

    const values = {
      pluginOnLeft,
      collapsible:  this.collapsible,
      collapsed:  this.collapsed,
    }

    this.map_ = map;
    this.control_ = new ArquetipoControl(values);//e2m:aquí creamos el control para el plugin

    /**
     * e2m: 
     * M.ui.Panel es una utility class del API-CNIG para incluir un panel en el que podemos meter controles. 
     * El panel es la vista, el contenedor de nuestros elementos HTML: botones, desplegables, cajas de texto, grids.
     */
    this.panel_ = new M.ui.Panel('ArquetipoPanel', {
      collapsible: this.collapsible,
      collapsed: this.collapsed,
      className: `m-arquetipo ${this.positionClass_}`,
      position: M.ui.position[this.position], //M.ui.position.TR
      collapsedButtonClass: pluginOnLeft ? 'g-cartografia-flecha-derecha' : 'g-cartografia-flecha-izquierda',//Cargamos la flecha adecuada en el botón del plugin según su posición. Es el icono que aparece al estar el plugin cerrado
      tooltip: this.tooltip_,
    });
    
    this.controls_.push(this.control_);
    this.panel_.addControls(this.controls_);  //e2m: añadimos el control o controles al panel. El panel tiene que tener la referencia del control

    map.addPanels(this.panel_);

  }

  /**
   * This function destroys this plugin
   *
   * @public
   * @function
   * @api stable
   */
    //e2m: cuando ejecutamos un map.removePlugin, se llama a este método
  destroy() {

    this.map_.removeControls(this.controls_);
    [this.map_, this.control_, this.panel_, this.collapsible, this.collapsed] = [null, null, null, null, null];
  }

  /**
   * This function gets name plugin
   * @getter
   * @public
   * @returns {string}
   * @api stable
   */
  get name() {
    return this.name_;
  }


  /**
   * This function gets metadata plugin
   *
   * @public
   * @function
   * @api stable
   */
  //e2m: esto devuelve el fichero apijson del plugin, con información sobre las propiedades del plugin para otros desrrolladores
  getMetadata(){
    return this.metadata_;
  }

  /**
   * Get the API REST Parameters of the plugin
   *
   * @function
   * @public
   * @api
   */
  getAPIRest() {
    return `${this.name}=${this.position}*${this.collapsible}*${this.collapsed}}`;
  }

  /**
  * Activate plugin
  *
  * @function
  * @public
  * @api
  */
  activate() {
    console.log("Activate");
    this.control_.activate();
  }

  /**
   * Desactivate plugin
   *
   * @function
   * @public
   * @api
   */
  deactivate() {
    console.log("Deactivate");
    this.control_.deactivate();
  }

 /**
   * This
   function compare
   *
   * @public
   * @function
   * @param {M.plugin} plugin to compare
   * @api stable
   */
   equals(plugin) {
    if (plugin instanceof Arquetipo) {
      return true;
    }
    return false;
  }


}
