import { Injectable } from '@nestjs/common';
import { CreateMockupDto } from '../dto/mockup/create-mockup.dto';
import { UpdateMockupDto } from '../dto/mockup/update-mockup.dto';
import { ResponseService } from '../dto/response-service.dto';

@Injectable()
export abstract class IMockupService {

  abstract create(createMockupDto: CreateMockupDto): ResponseService;

  abstract findAll(page: number, limit: number): ResponseService;

  abstract findOne(id: number): ResponseService;

  abstract update(id: number, updateMockupDto: UpdateMockupDto): ResponseService;

  abstract remove(id: number): ResponseService;
}
