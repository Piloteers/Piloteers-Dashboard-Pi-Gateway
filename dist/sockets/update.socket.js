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
class UpdateSocketClass {
    constructor() {
        this.data = {};
        if (!UpdateSocketClass.instance) {
            this.data = {};
            UpdateSocketClass.instance = this;
        }
        return UpdateSocketClass.instance;
    }
    setSocket(socket, io) {
        this.data.socket = socket;
        this.data.io = io;
    }
    showUpdateScreen(version) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitingLoop(0, this.data.socket);
            console.log('can update', !!this.data.socket);
            this.data.socket.emit('update:show', version);
        });
    }
    waitingLoop(count = 0, object) {
        return new Promise((resolve, reject) => {
            var timeout = () => {
                setTimeout(() => {
                    if (object || count > 50) {
                        resolve();
                    }
                    else {
                        count++;
                        timeout();
                    }
                }, 5000);
            };
            timeout();
        });
    }
}
exports.UpdateSocket = Object.freeze(new UpdateSocketClass());
//# sourceMappingURL=update.socket.js.map