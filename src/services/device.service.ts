import { raspberryPiService } from './micro-controller/raspberry-pi.service';
import { env } from '../env';
import { Device, DeviceSettings } from '@piloteers/dashboard-model';

class DeviceService {
  instance: any = null;
  data = {
    device: new Device()
  }
  constructor() {
    if (!this.instance) {
      this.instance = this;
    }

    return this.instance
  }

  setDevice(device) {
    this.data.device = device;
  }

  setDeviceSettings(settings: DeviceSettings) {
    this.data.device.deviceSettings = settings;
  }
}

export const deviceService = Object.freeze(new DeviceService());
