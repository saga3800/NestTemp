const rTracer = require('cls-rtracer');
import { HttpStatus } from '@nestjs/common';
const path = require("path");
const FS = require("fs");
import generalConfig from '../../common/configuration/general.config';
import { BusinessException } from '../lib/business-exceptions';
import { EmessageMapping } from "./enums/message.enum";
import { Echannel, EtypeDocument } from "./enums/params.enum";
import { Cache } from "cache-manager";
import { MESSAGE } from '../configuration/messages/message.config';
import { IMessage } from 'src/core/entity/message.entity';
const xml2js = require('xml2js');
export default class GeneralUtil {

  public static get getCorrelationalId(): string {
    return rTracer.id() || '';
  }


  /**
  * Convierte data con estructura xml a objeto en formato JSON
  * @param xml string con estructura xml a transformar
  * @returns JSON resultado de la transformación
  */
  public static async convertXmlToJson(xml: any): Promise<any> {
    if (GeneralUtil.validateValueRequired(xml)) {

      // return await xmlParser.xmlToJson(v, (err, json) => {
      const parser = new xml2js.Parser(
        {
          explicitArray: false,
          xmlns: false,
          attrValueProcessors: [function cleanOutput(value, name) {
            return (name.startsWith('xmlns:')) ? undefined : value;
          }],
        });

      return parser.parseStringPromise(xml).then((result) => {
        console.log('Result JSON transform from XML => \n', JSON.stringify(result));
        return JSON.parse(JSON.stringify(result));
      })
        .catch(function (err) {
          console.error('Error transformando xml a json.', err);
          throw new Error(`Error transformando xml a JSON. ${err}`);
        });
    }
    else
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


  /**
   * Determina si el canal indicado es valido
   * @param channel 
   * @returns 
   */
  public static validateChannel(channel: string): boolean {
    if (Echannel[channel])
      return true;
    else
      throw new BusinessException(
        HttpStatus.BAD_REQUEST,
        (channel == undefined) ? 'Debe indicar un canal válido.' : `${channel} no es un canal válido.`,
        false,
        {
          codMessage: EmessageMapping.CHANNEL_ERROR
        });
  }


  /**
   * Transforma el tipo de documento a su homologo en número
   * @param typeDoc 
   * @returns 
   */
  public static transformTypeDoc(typeDoc: EtypeDocument): number {
    switch (typeDoc) {
      case EtypeDocument.CC:
        return 1;
      case EtypeDocument.CE:
        return 4;
      default:
        return null;
    }
  }


  /**
 * 
 * @param value 
 * @returns 
 */
  public static validateValueRequired(value: string | number): boolean {
    if (value == undefined || value == null)
      return false;

    if (typeof value === 'number')
      return value >= 0

    if (typeof value === 'string')
      return !(value === "undefined" || value.trim().length == 0)

    return false;
  }



  /**
   * Retorna url de origen de las solicitudes recibidas por el ms
   * @param url 
   * @returns 
   */
  public static getOrigin(url: string): string {
    return `${generalConfig.apiMapping}${(url?.includes('?')) ? url.slice(0, url.indexOf('?')) : url}`;
  }


  public static getTemplateXML = name => {
    //return FS.readFileSync(`src/common/utils/xmls/${name}.xml`, "utf8");
    const pathfile = path.resolve(`${__dirname}/xmls/${name}.xml`);
    return FS.readFileSync(pathfile, "utf8");
  };


  /**
   * Manejo de mensajes en cache
   * @param cache 
   * @param operation 
   * @param messages 
   * @param updatedMessage 
   */
  public static async cacheMessages(
    cache: Cache,
    operation: string,
    messages?: IMessage[],
    updatedMessage?: IMessage,
  ) {

    if (operation == 'update') {
      // Actualizar el mensaje en cache
      var messages = await cache.get<IMessage[]>('messages');
      const messagePosition = messages.findIndex(message => message.id === updatedMessage.id);
      messages[messagePosition] = updatedMessage;
    }
    // Almacenar los mensajes en cache
    cache.set('messages', messages, { ttl: generalConfig.ttlCache }); // ttl (expiration time in seconds) 0 To disable expiration of the cache,
  }

  public static validateDate(date1: Date, date2: Date): number {
    // With Date object we can compare dates them using the >, <, <= or >=.
    // The ==, !=, ===, and !== operators require to use date.getTime(),
    // so we need to create a new instance of Date with 'new Date()'
    const d1 = new Date(date1); const d2 = new Date(date2);

    // Check if the dates are equal
    const same = d1.getTime() === d2.getTime();
    if (same) return 0;

    // Check if the first is greater than second
    if (d1 > d2) return 1;

    // Check if the first is less than second
    if (d1 < d2) return -1;

    // To calculate the time difference of two dates
    const Difference_In_Time = d2.getTime() - d1.getTime();

    // To calculate the no. of days between two dates
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Difference_In_Days;
  };

}


