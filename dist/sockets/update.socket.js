"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UpdateSocket {
    constructor(socket = null, io = null) {
        this.socket = null;
        this.io = null;
        this.socket = socket;
        this.io = io;
        if (!this.instance && socket && io) {
            this.instance = this;
        }
        return this.instance;
    }
    static getInstance() {
        return this;
    }
    showUpdateScreen(version) {
        if (this.socket) {
            this.socket.emit('update:show', version);
        }
    }
}
exports.UpdateSocket = UpdateSocket;
//# sourceMappingURL=update.socket.js.map