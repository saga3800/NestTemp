import { Injectable } from '@nestjs/common';
@Injectable()
export abstract class IGlobalValidateIService {

    abstract validateChannel(channel: string): any;

}