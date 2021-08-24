import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  MongooseHealthIndicator,
} from '@nestjs/terminus';

@ApiTags('healthCheck')
@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private dbMongo: MongooseHealthIndicator,
    private http: HttpHealthIndicator,
  ) {}

  @Get('')
  @ApiOperation({ 
    description: 'Health check de base de datos y servicio http' 
  })
  async checkDatabase() {
    const result = {
      success: true,
      documents: {
        database: await this.checkDB(),
        serviceHttp: await this.checkServiceHttp(),
      },
    };
    return result;
  }

  @HealthCheck()
  private async checkDB() {
    try {
      const n = await this.health.check([() => this.dbMongo.pingCheck('database_mongo')]);
      return n;
    } catch (error) {
      return error.response;
    }
  }

  @HealthCheck()
  private async checkServiceHttp() {
    let n: any;
    try {
      n = await this.http.pingCheck('service-example', 'http://localhost:8080');
    } catch (error) {
      n = error.causes;
    } finally { 
      n['service-example']['source'] = 'http://localhost:8080';
      return n;
    }
  }
}
