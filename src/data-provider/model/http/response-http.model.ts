import { AxiosRequestConfig } from 'axios';

export interface IrequestInfo {
    url?: string;
    source?: string;
    method?: string;
    headers?: string;
    params?: string;
    data?: string;
    timeout?: string;
}
export class ResponseHttp<R = any> {

    public readonly executed: boolean;
    public readonly status?: number;
    public readonly requestInfo?: IrequestInfo;
    public readonly message?: string;
    public data?: R;
    
    constructor(axiosResult: any) {
        
        this.executed = (axiosResult?.response != undefined || axiosResult?.status == 200);

        if (this.executed) {
            this.status = axiosResult.response?.status || axiosResult?.status;

            if (this.status == 200)
                this.data = axiosResult.data;
            else
                this.data = axiosResult.response.data;
            
                this.message = axiosResult.response?.statusText || axiosResult?.statusText
        }
        else 
            this.message = axiosResult?.toJSON()?.message; 

        this.requestInfo = {
            url: axiosResult?.config?.url,
            method: axiosResult?.config?.method,
            headers: axiosResult?.config?.headers,
            params: axiosResult?.config?.params,
            data: axiosResult?.config?.data,
            timeout: axiosResult?.config?.timeout,
            source: (axiosResult?.request?.path || axiosResult?.request?._options?.path)?.split('?')[0]
        }

    }

}
