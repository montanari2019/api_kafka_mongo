import {
  DirectionsRequest,
  Client as GoogleMapsClient,
  PlaceInputType,
  TravelMode,
} from '@googlemaps/google-maps-services-js';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DirectionsService {
  constructor(
    private googleMapsClient: GoogleMapsClient,
    private configService: ConfigService,
  ) {}

  async getDirection(originId: string, destinationId: string) {
    const requestParams: DirectionsRequest['params'] = {
      origin: `place_id:${originId}`,
      destination: `place_id:${destinationId}`,
      mode: TravelMode.driving,
      key: this.configService.get('API_GOOGLE_KEY'),
    };

    const { data } = await this.googleMapsClient
      .directions({
        params: requestParams,
      })
      .catch((message) => {
        console.log(
          '---------------------------------------------------------------------',
        );
        console.error(message);
        console.log(
          '---------------------------------------------------------------------',
        );
        throw new BadRequestException(message.message);
      });

    return {
      ...data,
      request: {
        origin: {
          place_id: requestParams.origin,
          location: {
            lat: data.routes[0].legs[0].start_location.lat,
            lng: data.routes[0].legs[0].start_location.lng,
          },
        },
        destination: {
          place_id: requestParams.destination,
          location: {
            lat: data.routes[0].legs[0].end_location.lat,
            lng: data.routes[0].legs[0].end_location.lng,
          },
        },
        mode: requestParams.mode,
      },
    };
  }
}
