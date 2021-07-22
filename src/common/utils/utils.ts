const rTracer = require('cls-rtracer');
const xmlToJson = require("xml-to-json-stream"),
  parser = xmlToJson({ attributeMode: false });

export default class UtilConfig {

  /**
   * Retorna identificador unico de transacción
   */
  public static get getCorrelationalId(): string {
    return rTracer.id() || '';
  }


  /**
  * Convierte data con estructura xml a objeto en formato JSON
  * @param xml string con estructura xml a transformar
  * @param replaceValues Arregalo de valores a remplazar del json
  * @param replaceBy caracter por el cual se reemplazaran los valores indicados.
  * @returns JSON resultado de la transformación
  */
  public static convertXmlToJson(xml: string, replaceValues: string[] = [], replaceBy: string = ''): any {
    if (xml != null && xml != undefined) {
      //Se transforma el xml en caso que se tenga estructura CDATA
      xml = xml.replace('<![CDATA[', '').replace(']]>', '');

      return parser.xmlToJson(xml, (err, json) => {
        if (err)
          throw new Error(`Error transformando xml a JSON. ${err}`);

        return UtilConfig.cleanProperties(json, replaceValues, replaceBy);
      });
    }
    return null;
  }


  /**
   * Limpia los valores y/o propiedades de un JSON
   * @param json objeto JSON a limpiar
   * @param replaceValues Arregalo de valores a remplazar del json
   * @param replaceBy caracter por el cual se reemplazaran los valores indicados.
   * @returns Objeto json con valores reemplazados
   */
  public static cleanProperties(json: any, replaceValues: string[], replaceBy: string = ''): any {
    let jsonString = JSON.stringify(json);

    replaceValues.forEach(value => {
      jsonString = jsonString.replace(new RegExp(value, 'ig'), replaceBy);
    });

    return JSON.parse(jsonString);
  }


}
