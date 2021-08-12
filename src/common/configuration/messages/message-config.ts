import { EmessageMapping } from "src/common/utils/enums/message.enum";
import { IMessage } from "src/core/entity/message.entity";

export const MESSAGE: IMessage[] = [
    {
        id: EmessageMapping.SHOPPING_CART_ID_ERROR,
        description: 'Error identificador del carrito',
        message: 'El carrito de compra enviado no corresponde al carrito de compra del cliente'
    },
    {
        id: EmessageMapping.GET_OK,
        description: 'Consulta carrito exitosa',
        message: 'Execution successfull'
    },
    {
        id: EmessageMapping.CANCEL_OK,
        description: 'Cancelación del carrito exitosa',
        message: 'Execution successfull'
    },
    {
        id: EmessageMapping.CHANNEL_ERROR,
        description: 'Canal incorrecto',
        message: 'El canal recibido no es soportado por el servicio.'
    },
    {
        id: EmessageMapping.ERROR_SERVICE_DELETE,
        description: 'Error timeout o inestabilidad deleteShoppingCart',
        message: '¡Ups¡, parece que algo salió mal, inténtalo nuevamente o si prefieres comunícate con nosotros a la línea en Bogotá 7457466 o déjanos tus datos dando clic en el botón Aceptar.'
    },
    {
        id: EmessageMapping.ERROR_SERVICE_DELETE,
        description: 'Error timeout o inestabilidad deleteShoppingCart',
        message: '¡Ups¡, parece que algo salió mal, inténtalo nuevamente o si prefieres comunícate con nosotros a la línea en Bogotá 7457466 o déjanos tus datos dando clic en el botón Aceptar.'
    },
    {
        id: EmessageMapping.ERROR_CONEXION_GET_SHOPPINGCART,
        description: 'Error timeout o inestabilidad MS-ON-INSPIRA',
        message: '¡Ups¡, parece que algo salió mal, inténtalo nuevamente o si prefieres comunícate con nosotros a la línea en Bogotá 7457466 o déjanos tus datos dando clic en el botón Aceptar.'
    },
    {
        id: EmessageMapping.ERROR_CONEXION_CANCEL_SHOPPINGCART,
        description: 'Error timeout o inestabilidad MS-ON-INSPIRA',
        message: '¡Ups¡, parece que algo salió mal, inténtalo nuevamente o si prefieres comunícate con nosotros a la línea en Bogotá 7457466 o déjanos tus datos dando clic en el botón Aceptar.'
    },
    {
        id: EmessageMapping.SHOPPINGCART_NOTFOUND,
        description: 'Carrito no encontrado',
        message: '¡Ups¡, parece que algo salió mal, inténtalo nuevamente o si prefieres comunícate con nosotros a la línea en Bogotá 7457466 o déjanos tus datos dando clic en el botón Aceptar.'
    },
    {
        id: EmessageMapping.DEFAULT_ERROR,
        description: 'Error del microservicio ShoppingCart',
        message: '¡Ups¡, parece que algo salió mal, inténtalo nuevamente o si prefieres comunícate con nosotros a la línea en Bogotá 7457466 o déjanos tus datos dando clic en el botón Aceptar.'
    },
    {
        id: EmessageMapping.DEFAULT,
        description: 'Proceso ejecutado correctamente.',
        message: 'Execution successfull'
    }
];