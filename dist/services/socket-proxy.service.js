"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("../env");
const io = require("socket.io-client");
const wildcard = require("socketio-wildcard");
const command_socket_1 = require("../sockets/command.socket");
let patch = wildcard(io.Manager);
class SocketProxyService {
    constructor(socket) {
        this.proxyClient = null;
        this.socket = null;
        this.socket = socket;
        if (this.proxyClient == null) {
            this.proxyClient = io(env_1.env('backendSocketUrl'), {
                query: `deviceId=${socket.handshake.query.deviceId}&role=${socket.handshake.query.role}`
            });
            patch(this.proxyClient);
            this.createClientProxy();
        }
        socket.use((data, next) => __awaiter(this, void 0, void 0, function* () {
            console.log('in', data);
            this.proxyClient.emit(...data);
        }));
    }
    createClientProxy() {
        new command_socket_1.CommandSocket(this.socket, this.proxyClient);
        this.proxyClient.on('*', data => {
            if (typeof data.data[0] === 'string') {
                if (data.data[0].startsWith('SG_')) {
                    console.log('Server Command: ', data.data[0]);
                }
                else {
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
exports.SocketProxyService = SocketProxyService;
//# sourceMappingURL=socket-proxy.service.js.map