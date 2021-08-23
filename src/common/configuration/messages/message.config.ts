import { EmessageMapping } from "src/common/utils/enums/message.enum";
import { IMessage } from "src/core/entity/message.entity";

export const MESSAGE: IMessage[] = [
    {
        id: EmessageMapping.DEFAULT_ERROR,
        description: 'Error interno del servicio',
        message: '¡Ups¡, parece que algo salió mal, inténtalo nuevamente.'
    },
    {
        id: EmessageMapping.CHANNEL_ERROR,
        description: 'Canal incorrecto',
        message: 'El canal recibido no es soportado por el servicio.'
    },
    {
        id: EmessageMapping.DEFAULT,
        description: 'Proceso ejecutado correctamente.',
        message: 'Execution successfull'
    }
];