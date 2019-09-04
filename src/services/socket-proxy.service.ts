import { env } from '../env';
import * as io from 'socket.io-client';
import * as wildcard from 'socketio-wildcard';
import { CommandSocket } from '../sockets/command.socket';
import { RoutesEnum } from '@piloteers/dashboard-model';
let patch = wildcard(io.Manager);

export class SocketProxyService {
  proxyClient = null;
  socket = null;

  constructor(socket) {
    this.socket = socket;

    if (this.proxyClient == null) {
      this.proxyClient = io(env('backendSocketUrl'), {
        query: `deviceId=${socket.handshake.query.deviceId}&role=${socket.handshake.query.role}`
      });

      new CommandSocket(this.socket, this.proxyClient);
      patch(this.proxyClient);
      this.createClientProxy();
    }

    socket.use(async (data, next) => {
      console.log('in', data);
      this.proxyClient.emit(...data);
    });
  }

  createClientProxy() {
    this.proxyClient.on('*', data => {
      if (typeof data.data[0] === 'string') {
        if (data.data[0].startsWith('SG_')) {
          console.log('Server Command: ', data.data[0]);
        } else {
          console.log('out', data.data[0]);
          this.socket.emit(...data.data);
        }
      }
    });
  }

  disconnectProxy() {
    this.proxyClient.disconnect();
  }
}
