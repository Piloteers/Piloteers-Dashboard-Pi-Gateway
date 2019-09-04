"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const raspberry_pi_service_1 = require("./micro-controller/raspberry-pi.service");
const env_1 = require("../env");
class MicroControllerService {
    constructor() { }
    init() {
        if (env_1.env('environment') == 'production') {
            raspberry_pi_service_1.raspberryPiService.init();
        }
    }
    updateVersion() {
        if (env_1.env('environment') == 'production') {
            raspberry_pi_service_1.raspberryPiService.updateVersion();
        }
    }
}
exports.microControllerService = Object.freeze(new MicroControllerService());
//# sourceMappingURL=micro-controller.service.js.map