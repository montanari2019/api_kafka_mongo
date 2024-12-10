import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('routes')
@ApiTags("Routes")
export class RoutesController {
  constructor(private readonly routesService: RoutesService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new route' })
  @ApiBody({
    description: 'Data required to create a new route',
    type: CreateRouteDto,
    examples: {
      example1: {
        summary: 'Example route creation',
        value: {
          name: 'Route 1',
          source_id: 'ChIJRc3GYprDpgARAyym45ZpJZ0',
          destination_id: 'ChIJ9eHNTfqZpgARXXppdts-QGs',
        },
      },
    },
  })
  create(@Body() createRouteDto: CreateRouteDto) {
    return this.routesService.create(createRouteDto);
  }

  @Get('find')
  findAll() {
    return this.routesService.findAll();
  }

  @Get('find/one/:id')
  findOne(@Param('id') id: string) {
    return this.routesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRouteDto: UpdateRouteDto) {
    return this.routesService.update(+id, updateRouteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.routesService.remove(+id);
  }
}
