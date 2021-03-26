# Snippets

## Implementación del CreateView

Previamente importamos el template y la función de traducción 

```javascript
//e2m: aquí se hace referencia al template arquetipo.html. Puede haber más de uno
import template from 'templates/arquetipo'; 
//e2m: Multilanguage support. Alias -> getValue is too generic
import { getValue as getValueTranslate} from './i18n/language'; 
```

La función **createView** se llama desde dentro de una **Promesa**, ya que al ser un procedimiento asíncrono no sabemos cuando podremos disponer de la vista creada a partir del template para insertarla en el panel del mapa. Podemos hacerlo de dos maneras distintas:

### Método 1

```javascript
let options = {
          jsonp: true,
          vars: {
              translations: {
                title: getValueTranslate('title'),
                button1: getValueTranslate('button1'),
                button2: getValueTranslate('button2'),
                button3: getValueTranslate('button3'),
              } 
          }
};//Opciones que se pasan al template para su compilación
this.template = M.template.compileSync(template, options);//e2m: Compilamos el template con los parámetros definidos en options
```

### Método 2

```javascript
//e2m: es un método de utilidad del API-CNIG para crear el template. Es un wrapper, un método que envuelve la lógica para crear las vistas
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
```

