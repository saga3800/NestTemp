import { Injectable } from '@nestjs/common';
import { RiskFlowReqDTO } from "../dto";


@Injectable()
export abstract class IRiskService {

   constructor(){}

   abstract validateRiskAnalysis(data:RiskFlowReqDTO);

}