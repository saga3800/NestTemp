export interface IServiceError {
  success: boolean;
  origen: string;
  message: string;
  serviceid: string;
  numOrden: string;
  numSubOrder?: string;
  documents: {
    error: string;
    request?: string;
    response?: string;
   };
}
