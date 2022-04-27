export interface IServiceError {
  success: boolean;
  origen: string;
  message: string;
  serviceid: string;
  documents: {
    error: string;
    request?: string;
    response?: string;
   };
}
