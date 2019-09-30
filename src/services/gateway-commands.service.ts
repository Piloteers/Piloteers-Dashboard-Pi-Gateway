import { raspberryPiService } from './micro-controller/raspberry-pi.service';
import { env } from '../env';
import { RoutesEnum, Company, User, WifiStatusEnum } from '@piloteers/dashboard-model';

class GatewayCommandsService {
  constructor() { }

  init() {
  }

  sendDisconnect(socket: any) {
    socket.emit(RoutesEnum.GD_UPDATE_WIFI_STATUS, WifiStatusEnum.DISCONNECTED)
  }

  sendConnect(socket: any) {
    socket.emit(RoutesEnum.GD_UPDATE_WIFI_STATUS, WifiStatusEnum.CONNECTED)
  }
}

export const gatewayCommandsService = Object.freeze(new GatewayCommandsService());
