import { env } from '../env';
import * as io from 'socket.io-client';
import * as wildcard from 'socketio-wildcard';
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
        console.log('out', data.data[0]);

        this.socket.emit(...data.data);
      }
    });
  }

  disconnectProxy() {
    this.proxyClient.disconnect();
  }
}
