import { Controller, Get, Query } from '@nestjs/common';
import { DirectionsService } from './directions.service';

@Controller('directions')
export class DirectionsController {
  constructor(private directionService: DirectionsService) {}
  @Get()
  getDirections(
    @Query('originId') originId: string,
    @Query('destinationId') destinationId: string,
  ) {
    // originId = 'ChIJRc3GYprDpgARAyym45ZpJZ0'
    // destinationId = 'ChIJ9eHNTfqZpgARXXppdts-QGs'
    return this.directionService.getDirection(originId, destinationId);
  }
}
