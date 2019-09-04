import { RoutesEnum, Company, User } from '@piloteers/dashboard-model';
import * as socketIO from 'socket.io';
import { microControllerService } from '../services/micro-controller.service';

export class CommandSocket {
  socket;

  constructor(socket) {
    this.socket = socket;
  }

  on(route, data) {
    console.log('Server Command: ', route, RoutesEnum.SG_COMMAND_UPDATE_VERSION);
    switch (route) {
      case RoutesEnum.SG_COMMAND_UPDATE_VERSION:
        console.log('update version');
        this.socket.emit(RoutesEnum.GD_COMMAND_UPDATE_VERSION);
        microControllerService.updateVersion();
        break;
      default:
        break;
    }
  }
}
