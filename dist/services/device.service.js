"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_model_1 = require("@piloteers/dashboard-model");
class DeviceService {
    constructor() {
        this.instance = null;
        this.data = {
            device: new dashboard_model_1.Device()
        };
        if (!this.instance) {
            this.instance = this;
        }
        return this.instance;
    }
    setDevice(device) {
        this.data.device = device;
    }
    setDeviceSettings(settings) {
        this.data.device.deviceSettings = settings;
    }
}
exports.deviceService = Object.freeze(new DeviceService());
//# sourceMappingURL=device.service.js.map