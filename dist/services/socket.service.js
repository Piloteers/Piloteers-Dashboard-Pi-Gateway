"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketIo = require("socket.io");
const env_1 = require("../env");
const socket_proxy_service_1 = require("./socket-proxy.service");
class SocketService {
    constructor(http) {
        this.io = socketIo(http);
        this.io.on('connection', socket => {
            console.log('device connected', socket.handshake.query.role, socket.handshake.query.deviceId);
            const socketProxyService = new socket_proxy_service_1.SocketProxyService(socket);
            socket.on('disconnect', () => {
                console.log('proxy disconnected');
                socketProxyService.disconnectProxy();
            });
        });
        http.listen(env_1.env('gatewaySocketPort'), function () {
            console.log(`Gateway Socket listening on *:${env_1.env('gatewaySocketPort')}`);
        });
    }
}
exports.SocketService = SocketService;
//# sourceMappingURL=socket.service.js.map