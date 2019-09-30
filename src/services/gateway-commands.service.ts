import { raspberryPiService } from './micro-controller/raspberry-pi.service';
import { env } from '../env';
import { RoutesEnum, Company, User, WifiStatusEnum, DeviceSettings, DeviceInfo } from '@piloteers/dashboard-model';
import * as ip from 'ip'

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


  sendInfo(socket: any) {
    socket.emit(RoutesEnum.GD_DEVICE_INFO, new DeviceInfo({
      ip: ip.address(),
    }))
  }
}

export const gatewayCommandsService = Object.freeze(new GatewayCommandsService());
