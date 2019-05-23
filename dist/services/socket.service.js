"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketIo = require("socket.io");
const env_1 = require("../env");
const socket_proxy_service_1 = require("./socket-proxy.service");
const update_socket_1 = require("../sockets/update.socket");
class SocketService {
    constructor(http) {
        this.io = socketIo(http);
        this.io.on('connection', (socket) => {
            console.log('pi connected', socket.handshake.query.role, socket.handshake.query.userId);
            new socket_proxy_service_1.SocketProxyService(socket);
            update_socket_1.UpdateSocket.setSocket(socket, this.io);
            socket.on('disconnect', () => {
                console.log('user disconnected');
            });
        });
        http.listen(env_1.env.socketIoPort, function () {
            console.log(`Socket listening on *:${env_1.env.socketIoPort}`);
        });
    }
}
exports.SocketService = SocketService;
//# sourceMappingURL=socket.service.js.map