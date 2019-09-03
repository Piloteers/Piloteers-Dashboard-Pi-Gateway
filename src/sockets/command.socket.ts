import { RoutesEnum, Company, User } from '@piloteers/dashboard-model';
import * as socketIO from 'socket.io';
import { microControllerService } from '../services/micro-controller.service';

export class CommandSocket {
  constructor(socket, io) {
    io.on(RoutesEnum.SG_UPDATE_VERSION, () => {
      console.log('update version');
      socket.emit(RoutesEnum.GD_UPDATE_VERSION);
      microControllerService.updateVersion();
    });
  }
}