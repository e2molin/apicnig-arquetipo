# 馃攲 M.plugin.Arquetipo para API-CNIG

El prop贸sito de este desarrollo es crear un plugin que sirva como prototipo para crear nuevos plugins para la **APICNIG 3.0**. Si bien mediante paquetes **npm** puede lanzarse un asistente para crear una estructura b谩sica sobre la que podamos crear plugins, el ejemplo es muy escaso y tiene problemas de funcionamiento, adem谩s de que, al emnos para m铆, carece de una explicaci贸n adecuada de los m茅todos y eventos necesarios para comprender la mec谩nica de funcionamiento.

![](documents/img/apicnig-core-visor.png)
---

## 馃殌 C贸mo crear un arquetipo de plugin para **Mapea Core** y para **API-CNIG**

Voy a crear un proyecto arquetipo de plugin que sirva de base para crear los nuevos plugins. Navegamos al directorio de trabajo, en mi caso

```none
C:\ms4w\Apache\htdocs\apicnig
```

y en esta ubicaci贸n ejecutamos, para el usar el Mapea Core.

```bash
$ npm install -g mapea-create-plugin
$ mapea-create-plugin
# Lo hacemos con la versi贸n 5.2
# Dejamos que se instalen las dependencias npm. Tambi茅n podr铆amos instalarlas luego con un npm install
$ npm start
```

Para instalar el arquetipo que utiliza API-CNIG usamos

```bash
$ npm install -g api-cnig-create-plugin  # Con esto instalamos nuestra herramienta de creaci贸n de plugin
$ api-cnig-create-plugin                 # As铆 creamos un proyecto base para desarrollar nuestro plugin
```

Tras realizar el **npm install** y si se encuentran vulnerabilidades, podemos ver cuales son con **npm audit** y podemos corregirlas con **npm audit fix**.

Otras funciones disponibles son

```bash
$ npm start           # Inicia entorno de desarrollo para depurar y probar
$ npm run check       # Podemos validar el c贸digo con ESLint 
$ npm run build       # Crea ficheros distribuibles del plugin para ser consumidos por nuestro visor
$ npm run test-build  # Entorno de producci贸n para probar los ficheros creados con el comando anterior
```

## 馃摎 Recursos de consulta

* 馃挕 Gu铆a en detalle del plugin **Arquetipo** 馃憠 [documents/e2molin.md](documents/e2molin.md)
* 馃挕 Snippets de c贸digo **Arquetipo** 馃憠 [documents/snippets.md](documents/snippets.md)
* Manual de referencia API IGN [馃敆 https://componentes.ign.es/api-core/doc/](https://componentes.ign.es/api-core/doc/)
* Visor b谩sico [馃敆 https://componentes.ign.es/api-core/visor.jsp](https://componentes.ign.es/api-core/visor.jsp)
* Repositorio en Github del APICORE [馃敆 https://github.com/IGN-CNIG/API-CNIG](https://github.com/IGN-CNIG/API-CNIG)
* Repositorio en Github de los plugins [馃敆 https://github.com/IGN-CNIG/API-CNIG/tree/master/api-ign-js/src/plugins](https://github.com/IGN-CNIG/API-CNIG/tree/master/api-ign-js/src/plugins)
* Wiki general de la API-CNIG [馃敆 https://github.com/IGN-CNIG/API-CNIG/wiki](https://github.com/IGN-CNIG/API-CNIG/wiki)
* Gu铆a de desarrollo de plugins [馃敆 https://github.com/IGN-CNIG/API-CNIG/wiki/Gu%C3%ADa-de-desarrollo-de-plugins](https://github.com/IGN-CNIG/API-CNIG/wiki/Gu%C3%ADa-de-desarrollo-de-plugins)
* P谩gina de test de los plugins [馃弫 Producci贸n](http://componentes.ign.es/api-core/test.html) [鈿? Desarrollo](https://mapea-lite.desarrollo.guadaltel.es/api-core/test.html)

## 馃洜 Herramientas

* **Node.JS** version 8 o superior [馃敆 https://nodejs.org/es/](https://nodejs.org/es/)
* **handlebars** [馃敆 https://handlebarsjs.com/](https://handlebarsjs.com/)
* **IcoMoon** [馃敆 https://icomoon.io/app/#/select](https://icomoon.io/app/#/select)
* **Fontello** [馃敆 https://fontello.com/](https://fontello.com/)

