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
        return __awaiter(this, void 0, void 0, function* () {
            console.log('start update 2', env_1.env('environment'));
            if (env_1.env('environment') == 'production') {
                yield raspberry_pi_service_1.raspberryPiService.updateVersion();
            }
        });
    }
}
exports.microControllerService = Object.freeze(new MicroControllerService());
//# sourceMappingURL=micro-controller.service.js.map