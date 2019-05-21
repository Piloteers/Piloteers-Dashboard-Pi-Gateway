
import * as socketIo from 'socket.io';
import * as uuid from 'uuid/v1';
import { env } from '../env';
import { SocketProxyService } from './socket-proxy.service';
export class SocketService {

  io: any;
  constructor(http) {
    this.io = socketIo(http);


    this.io.on('connection', (socket) => {
      console.log('pi connected', socket.handshake.query.role, socket.handshake.query.userId);

      new SocketProxyService(socket);

      socket.on('disconnect', () => {
        console.log('user disconnected');
      });

    })

    http.listen(env.socketIoPort, function () {
      console.log(`Socket listening on *:${env.socketIoPort}`);
    });
  }

}

