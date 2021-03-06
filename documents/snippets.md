# Snippets

## Utilizando Handlebars para introducir condicionales

Si queremos utilizar condicionales en la compilaci铆n de nuestra plantilla con handlebars, tenemos que implementar

```javascript
/*
Funci贸n de registro del ifCond en HandleBars
*/
Handlebars.registerHelper('ifCond', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

/* Aunque mejor en notaci贸n function arrows馃憞馃憞馃憞 */
Handlebars.registerHelper('ifCond', (v1, v2, options) => {
  return v1 === v2 ? options.fn(this) : options.inverse(this);
});
```

## Implementaci贸n del CreateView

Previamente importamos el template y la funci贸n de traducci贸n 

```javascript
//e2m: aqu铆 se hace referencia al template arquetipo.html. Puede haber m谩s de uno
import template from 'templates/arquetipo'; 
//e2m: Multilanguage support. Alias -> getValue is too generic
import { getValue as getValueTranslate} from './i18n/language'; 
```

La funci贸n **createView** se llama desde dentro de una **Promesa**, ya que al ser un procedimiento as铆ncrono no sabemos cuando podremos disponer de la vista creada a partir del template para insertarla en el panel del mapa. Podemos hacerlo de dos maneras distintas:

### M茅todo 1

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
};//Opciones que se pasan al template para su compilaci贸n
this.template = M.template.compileSync(template, options);//e2m: Compilamos el template con los par谩metros definidos en options
```

### M茅todo 2

```javascript
//e2m: es un m茅todo de utilidad del API-CNIG para crear el template. Es un wrapper, un m茅todo que envuelve la l贸gica para crear las vistas
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

