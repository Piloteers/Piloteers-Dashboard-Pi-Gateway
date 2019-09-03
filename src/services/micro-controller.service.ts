import { raspberryPiService } from './micro-controller/raspberry-pi.service';

class MicroControllerService {
  constructor() {}

  init() {
    raspberryPiService.init();
  }

  updateVersion() {
    raspberryPiService.updateVersion();
  }
}

export const microControllerService = Object.freeze(new MicroControllerService());
