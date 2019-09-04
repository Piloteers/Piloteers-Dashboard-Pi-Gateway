import { raspberryPiService } from './micro-controller/raspberry-pi.service';
import { env } from '../env';

class MicroControllerService {
  constructor() {}

  init() {
    if (env('environment') == 'production') {
      raspberryPiService.init();
    }
  }

  updateVersion() {
    console.log('start update 2', env('environment'));
    if (env('environment') == 'production') {
      raspberryPiService.updateVersion();
    }
  }
}

export const microControllerService = Object.freeze(new MicroControllerService());
