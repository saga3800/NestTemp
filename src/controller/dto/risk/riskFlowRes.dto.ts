export class RiskFlowResDTO {
    success: boolean;
    origin: string;
    status: number;
    message: string;
    documents: {
      riesgo: {
        codigo: number;
        mensaje: string;
        listas: {
          descripcion_error: {
            code: number;
            message: string;
          };
          detalle_lista: {
            lista: string;
            accion: string;
            motivo: string;
          };
        };
      };
    };
  }