import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DirectionsService } from 'src/maps/directions/directions.service';

@Injectable()
export class RoutesService {
  constructor(
    private readonly prismaServices: PrismaService,
    private readonly directionService: DirectionsService,
  ) {}
  async create(createRouteDto: CreateRouteDto) {
 
    const { available_travel_modes, geocoded_waypoints, routes, request } =
      await this.directionService.getDirection(
        createRouteDto.source_id,
        createRouteDto.destination_id,
      ).catch((error) =>{
        throw new BadRequestException(error)
      });


    const legs = routes[0].legs[0]

    const item = await this.prismaServices.route.create({
      data: {
        name: createRouteDto.name,
        source: {
          name: legs.start_address,
          location: {
            lat: legs.start_location.lat,
            lng: legs.start_location.lng,
          },
        },
        destination: {
          name: legs.end_address,
          location: {
            lat: legs.end_location.lat,
            lng: legs.end_location.lng,
          },
        },
        duration: legs.duration.value,
        distance: legs.distance.value,
        directions: JSON.parse(
          JSON.stringify({
            available_travel_modes,
            geocoded_waypoints,
            routes,
            request,
          }),
        ),
      },
    });

    return item
  }

  async findAll() {
    return await this.prismaServices.route.findMany();
  }

  async findOne(id: string) {
    return await this.prismaServices.route.findUniqueOrThrow({
      where: {
        id
      }
    });
  }

  update(id: number, updateRouteDto: UpdateRouteDto) {
    return `This action updates a #${id} route`;
  }

  remove(id: number) {
    return `This action removes a #${id} route`;
  }
}
