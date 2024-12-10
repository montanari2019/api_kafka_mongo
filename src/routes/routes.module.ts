import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [RoutesController],
  providers: [RoutesService],
  imports: [PrismaModule]
})
export class RoutesModule {}
