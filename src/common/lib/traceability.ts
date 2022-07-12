import { IServiceTracing } from "src/core/entity/service-tracing/service-tracing.entity";
import { GlobalReqOrigin } from "../configuration/general.config";
//import { EStatusTracingGeneral } from "../utils/enums/tracing.enum";

export default class Traceability {

    private readonly Traceability: IServiceTracing;

    constructor(traceability: IServiceTracing) {
        this.Traceability = traceability;
        this.Traceability.origen = GlobalReqOrigin.globalOrigin;
    }
    public setStatus(status: string) {
        this.Traceability.status = status;
    }
    public setOrigen(origen: string) {
        this.Traceability.origen = origen;
    }
    public setTask(task: string) {
        this.Traceability.task = task;
    }
    public setDescription(description: string) {
        this.Traceability.description = description;
    }

    public getTraceability() {
        return this.Traceability;
    }

}