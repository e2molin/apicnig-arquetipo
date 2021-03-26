/**
 * @module M/control/ArquetipoControl
 */

import ArquetipoImplControl from 'impl/arquetipocontrol';
import template from 'templates/arquetipo'; //e2m: aquí se hace referencia al template arquetipo.html. Puede haber más de uno
import { getValue as getValueTranslate} from './i18n/language'; //e2m: Multilanguage support. Alias -> getValue is too generic

export default class ArquetipoControl extends M.Control {
  /**
   * @classdesc
   * Main constructor of the class. Creates a PluginControl
   * control
   *
   * @constructor
   * @extends {M.Control}
   * @api stable
   */
  constructor(values) {
    // 1. checks if the implementation can create PluginControl
    if (M.utils.isUndefined(ArquetipoImplControl)) {
      M.exception('La implementación usada no puede crear controles ArquetipoControl');
    }
    // 2. implementation of this control
    const impl = new ArquetipoImplControl();
    super(impl, 'Arquetipo');
    
    /**
     * Recepción de los parámetros de configuración del plugin
     */

    /**
     * Collapsible
     * @public
     * @type {M.Map}
     */
     this.map = null;

    /**
     * Collapsible
     * @public
     * @type {ArquetipoImplControl}
     */
     this.impl_ = impl;

    /**
     * Collapsible
     * @public
     * @public {boolean}
     */
     this.collapsible = values.collapsible;

     /**
      * Collapsed
      * @public
      * @public {boolean}
      */
     this.collapsed = values.collapsed;


    // captura de customevent lanzado desde impl con coords
    window.addEventListener('mapclicked', (e) => {
      this.map_.addLabel('Hola Mundo!', e.detail);
    });
  }

  /**
   * This function creates the view
   *
   * @public
   * @function
   * @param {M.Map} map to add the control
   * @api stable
   */
  createView(map) {

    this.map = map;

    /**
     * e2m: 
     * El método createView es asíncrono.
     * El mapa maneja el createView como una promesa, ya que no sabemos cuando acaba.
     * Cuando al final llamamos al método success el mapa se entera de que la vista está disponible para acceder a ella
     */
    return new Promise((success, fail) => {

      //e2m: config a helper in Handlebars for embedding conditionals in template
      Handlebars.registerHelper('ifCond', function(v1, v2, options) {
        if(v1 === v2) {
          return options.fn(this);
        }
        return options.inverse(this);
      });

      /**
       * e2m: es un método de utilidad del API-CNIG para crear el template. Es un wrapper, un método que envuelve la lógica para crear las vistas
       * Ver snippets.md
       */
      const html = M.template.compileSync(template,{
        vars: {
          translations: {
            title: getValueTranslate('title'),
            button1: getValueTranslate('button1'),
            button2: getValueTranslate('button2'),
            button3: getValueTranslate('button3'),
          } 
        }
      });

      this.template_ = html;

      this.prepareDOMView_();

      success(html);
    });

  }

  /**
    * e2m: Aquí definimos los Listeners de los eventos que controlarán el plugin
    */
  prepareDOMView_(){

    this.template_.querySelector('#ctrlTest1').addEventListener('click', (evt) => {
      console.log("Clic en Botón 1");
    });
    this.template_.querySelector('#ctrlTest2').addEventListener('click', (evt) => {
      console.log("Clic en Botón 2");
      //this.activate();
    });
    this.template_.querySelector('#ctrlTest3').addEventListener('click', (evt) => {
      console.log("Clic en Botón 3");
      //this.deactivate();
    });

  }

  /**
   * This function is called on the control activation
   *
   * @public
   * @function
   * @api stable
   */
  activate() {
    // calls super to manage de/activation
    console.log("Paso Y");
    super.activate();
    const div = document.createElement('div');
    div.id = 'msgInfo';
    div.classList.add('info');
    div.innerHTML = 'Haz doble click sobre el mapa';
    this.map_.getContainer().appendChild(div);

    this.getImpl().activateClick(this.map_);
  }


  /**
   * This function is called on the control deactivation
   *
   * @public
   * @function
   * @api stable
   */
  deactivate() {

    // calls super to manage de/activation
    super.deactivate();
    const div = document.getElementById('msgInfo');
    this.map_.getContainer().removeChild(div);

    this.getImpl().deactivateClick(this.map_);
  }


  /**
   * This function gets activation button
   *
   * @public
   * @function
   * @param {HTML} html of control
   * @api stable
   * 
   * e2m: 
   * De esta curiosa manera definimos el botón que desencadena el evento activate del control. 
   * Me he vuelto majareta para descubrir esto. 💩 No entendía porqué sin definir el evento, el botón correspondiente a .m-arquetipo button se comportaba como botón de activación.
   */
  getActivationButton(html) {
    //return html.querySelector('.m-arquetipo button');
    return html.querySelector('#ctrlTest4');//e2m: con esto le decimos el botón que queremos que sea la activación del control
  }

  /**
   * This function compares controls
   *
   * @public
   * @function
   * @param {M.Control} control to compare
   * @api stable
   * 
   * e2m: El mapa necesita saber qué controles estána ctivos. este método es fundamental
   */
  equals(control) {
    return control instanceof ArquetipoControl;
  }

  // Add your own functions
}
