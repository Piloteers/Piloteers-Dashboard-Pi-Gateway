"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_model_1 = require("@piloteers/dashboard-model");
const micro_controller_service_1 = require("../services/micro-controller.service");
class CommandSocket {
    constructor(socket, proxyClient) {
        proxyClient.on(dashboard_model_1.RoutesEnum.SG_COMMAND_UPDATE_VERSION, () => {
            console.log('update version');
            socket.emit(dashboard_model_1.RoutesEnum.GD_COMMAND_UPDATE_VERSION);
            micro_controller_service_1.microControllerService.updateVersion();
        });
    }
}
exports.CommandSocket = CommandSocket;
//# sourceMappingURL=command.socket.js.map