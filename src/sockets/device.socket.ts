import { RoutesEnum, Company, User, Device } from '@piloteers/dashboard-model';
import * as socketIO from 'socket.io';
import { microControllerService } from '../services/micro-controller.service';
import { deviceService } from '../services/device.service';

export class DeviceSocket {
  constructor(socket, proxyClient) {
    proxyClient.on(RoutesEnum.SD_AUTHENTICATED, (d: Device) => {
      deviceService.setDevice(d);
      microControllerService.checkMonitorStatus();
    });
    proxyClient.on(RoutesEnum.SC_DEVICE_GET, (d: Device) => {
      deviceService.setDevice(d);
      microControllerService.checkMonitorStatus();
    });
  }
}
