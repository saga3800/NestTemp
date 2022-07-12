export interface IServiceError {
  origen: string;
  message: string;
  stack: string;
  channel?: string;
  request?: any;
}