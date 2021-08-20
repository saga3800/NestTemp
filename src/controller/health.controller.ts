import { Controller, Get } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MicroserviceHealthIndicator,
  MongooseHealthIndicator,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private dbMongo: MongooseHealthIndicator,
    private http: HttpHealthIndicator,
    private ms: MicroserviceHealthIndicator
  ) {}

  @Get('/database')
  @HealthCheck()
  checkDatabase() {
    return this.health.check([() => this.dbMongo.pingCheck('database_mongo')]);
  }

  @Get('/service')
  @HealthCheck()
  checkService() {
    return this.http.pingCheck('service-example', 'http://localhost:8080');
  }

//   @Get('/service')
//   @HealthCheck()
//   checkService() {
//     return this.health.check([
//       () => this.ms.pingCheck('service-example', {
//         transport: Transport.NATS,
//         options: { host: 'localhost', port: 8080 },
//       })
//     ]);
//   }
}
