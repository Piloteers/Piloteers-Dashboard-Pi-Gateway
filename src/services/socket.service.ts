import * as socketIo from 'socket.io';
import * as uuid from 'uuid/v1';
import { env } from '../env';
import { SocketProxyService } from './socket-proxy.service';
import { UpdateSocket } from '../sockets/update.socket';
export class SocketService {
  io: any;
  constructor(http) {
    this.io = socketIo(http);

    this.io.on('connection', socket => {
      console.log('device connected', socket.handshake.query.role, socket.handshake.query.deviceId);

      const socketProxyService = new SocketProxyService(socket);
      // UpdateSocket.setSocket(socket, this.io);

      socket.on('disconnect', () => {
        console.log('proxy disconnected');
        socketProxyService.disconnectProxy();
      });
    });

    http.listen(env('gatewaySocketPort'), function() {
      console.log(`Gateway Socket listening on *:${env('gatewaySocketPort')}`);
    });
  }
}
