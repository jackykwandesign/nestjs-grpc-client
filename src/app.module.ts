import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ClientsModule, Transport} from '@nestjs/microservices'
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'HERO_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'hero',
          protoPath: join(__dirname, 'protos/hero.proto'),
          url:"192.168.96.67:5000",
        },
      },
    ]),
  ],
  controllers:[AppController],
  providers: [AppService],
})
export class AppModule {}
