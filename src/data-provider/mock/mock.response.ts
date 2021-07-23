export const MockResponse = {
  riesgo: {
    codigo: 0,
    mensaje: 'La persona se encuentra reportada en Listas Negras',
    listas: [
      {
        descripcion_error: {
          code: '-1',
          message: 'No hay datos asociados a su busqueda',
        },
      },
      {
        detalle_lista: {
          lista: 'CLIENTES',
          accion: 'claro',
          motivo: 'Riesgo de Fraude',
        },
      },
    ],
  },
};
