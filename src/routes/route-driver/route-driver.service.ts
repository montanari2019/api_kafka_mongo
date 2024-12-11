import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RouteDriverService {
  constructor(private readonly prismaServices: PrismaService) {}
  async processRoute(dto: { route_id: string; lat: number; lng: number }) {
      const routerDrive = await this.prismaServices.routeDriver.upsert({
        include: {
          route: true, // eager loading
        },
        where: { route_id: dto.route_id },
        create: {
          route_id: dto.route_id,
          points : {
            set:{
              location:{
                lat: dto.lat,
                lng: dto.lng,
              }
            }
          }
        },
        update: {
          points : {
            push:{
              location:{
                lat: dto.lat,
                lng: dto.lng,
              }
            }
          }
        },
      })

      return routerDrive
  }
}
