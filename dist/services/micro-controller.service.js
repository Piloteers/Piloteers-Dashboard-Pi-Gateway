"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const raspberry_pi_service_1 = require("./micro-controller/raspberry-pi.service");
class MicroControllerService {
    constructor() {
        new raspberry_pi_service_1.RaspberryPiService();
    }
}
exports.MicroControllerService = MicroControllerService;
//# sourceMappingURL=micro-controller.service.js.map