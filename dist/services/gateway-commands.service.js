"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_model_1 = require("@piloteers/dashboard-model");
class GatewayCommandsService {
    constructor() { }
    init() {
    }
    sendDisconnect(socket) {
        socket.emit(dashboard_model_1.RoutesEnum.GD_UPDATE_WIFI_STATUS, dashboard_model_1.WifiStatusEnum.DISCONNECTED);
    }
    sendConnect(socket) {
        socket.emit(dashboard_model_1.RoutesEnum.GD_UPDATE_WIFI_STATUS, dashboard_model_1.WifiStatusEnum.CONNECTED);
    }
}
exports.gatewayCommandsService = Object.freeze(new GatewayCommandsService());
//# sourceMappingURL=gateway-commands.service.js.map