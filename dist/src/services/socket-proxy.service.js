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
let patch = wildcard(io.Manager);
class SocketProxyService {
    constructor(socket) {
        this.proxyClient = null;
        this.socket = null;
        this.socket = socket;
        socket.use((data, next) => __awaiter(this, void 0, void 0, function* () {
            console.log('in', data);
            if (this.proxyClient == null) {
                this.proxyClient = io(env_1.env.backendSocketUrl, { query: `userId=${socket.handshake.query.userId}&role=${socket.handshake.query.role}` });
                patch(this.proxyClient);
                this.createClientProxy();
            }
            this.proxyClient.emit(...data);
        }));
    }
    createClientProxy() {
        this.proxyClient.on('*', (data) => {
            if (typeof data.data[0] === 'string') {
                console.log('out', ...data.data);
                this.socket.emit(...data.data);
            }
        });
    }
}
exports.SocketProxyService = SocketProxyService;
//# sourceMappingURL=socket-proxy.service.js.map