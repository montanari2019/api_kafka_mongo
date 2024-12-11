import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MapsModule } from 'src/maps/maps.module';
import { RouteDriverService } from './route-driver/route-driver.service';

@Module({
  controllers: [RoutesController],
  providers: [RoutesService, RouteDriverService],
  imports: [MapsModule]
})
export class RoutesModule {}
