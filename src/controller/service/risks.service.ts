import { Injectable } from '@nestjs/common';
import { RiskFlowReqDTO, ResponseService } from "../dto";
@Injectable()
export abstract class IRiskService {

   abstract validateRiskAnalysis(data:RiskFlowReqDTO):Promise<ResponseService>;

}