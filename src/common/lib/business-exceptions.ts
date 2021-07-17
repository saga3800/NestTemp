import { Etask } from "../utils/enums/taks.enum";

export class BusinessException {

  constructor(
    public readonly code: number,
    public readonly description: string,
    public readonly context?: string,
    public readonly task?: Etask,
    public readonly details?: any,
  ) { }

}

