import { Controller, Get, Query } from '@nestjs/common';
import { DirectionsService } from './directions.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('directions')
@ApiTags("Directions")
export class DirectionsController {
  constructor(private directionService: DirectionsService) {}
  @Get()
  @ApiOperation({ summary: 'Get directions between two locations' })
  @ApiQuery({
    name: 'originId',
    description: 'The ID of the origin location',
    example: 'ChIJRc3GYprDpgARAyym45ZpJZ0',
    required: true,
  })
  @ApiQuery({
    name: 'destinationId',
    description: 'The ID of the destination location',
    example: 'ChIJ9eHNTfqZpgARXXppdts-QGs',
    required: true,
  })
  getDirections(
    @Query('originId') originId: string,
    @Query('destinationId') destinationId: string,
  ) {
    // originId = 'ChIJRc3GYprDpgARAyym45ZpJZ0'
    // destinationId = 'ChIJ9eHNTfqZpgARXXppdts-QGs'
    return this.directionService.getDirection(originId, destinationId);
  }
}
