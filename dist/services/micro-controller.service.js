"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const raspberry_pi_service_1 = require("./micro-controller/raspberry-pi.service");
class MicroControllerService {
    constructor() { }
    init() {
        raspberry_pi_service_1.raspberryPiService.init();
    }
    updateVersion() {
        raspberry_pi_service_1.raspberryPiService.updateVersion();
    }
}
exports.microControllerService = Object.freeze(new MicroControllerService());
//# sourceMappingURL=micro-controller.service.js.map