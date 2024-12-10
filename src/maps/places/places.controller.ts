import { Controller, Get, Query } from '@nestjs/common';
import { PlacesService } from './places.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('places')
@ApiTags('Places')
export class PlacesController {
  constructor(private readonly placesService: PlacesService) {}

  @Get()
  @ApiOperation({ summary: 'Find places based on a search text' })
  @ApiQuery({
    name: 'text',
    description: 'Search query to find places',
    example: 'av capitao castro, vilhena, 3178',
    required: true,
  })
  findPlaces(@Query('text') text: string) {
    return this.placesService.findPlaces(text);
  }
}
