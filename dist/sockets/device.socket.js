"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_model_1 = require("@piloteers/dashboard-model");
const device_service_1 = require("../services/device.service");
class DeviceSocket {
    constructor(socket, proxyClient) {
        proxyClient.on(dashboard_model_1.RoutesEnum.SD_AUTHENTICATED, (d) => {
            device_service_1.deviceService.setDevice(d);
        });
        proxyClient.on(dashboard_model_1.RoutesEnum.SC_DEVICE_GET, (d) => {
            device_service_1.deviceService.setDevice(d);
        });
    }
}
exports.DeviceSocket = DeviceSocket;
//# sourceMappingURL=device.socket.js.map