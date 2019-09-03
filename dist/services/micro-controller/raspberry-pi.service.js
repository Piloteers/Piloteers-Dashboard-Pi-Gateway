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
const env_1 = require("../../env");
const child_process_1 = require("child_process");
const fs = require("fs");
const { version } = require('../../../package.json');
class RaspberryPiService {
    constructor() {
        this.instance = null;
        if (!this.instance) {
            this.instance = this;
        }
        return this.instance;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.refreshTab();
                yield this.writeKiosk();
            }
            catch (error) { }
        });
    }
    updateVersion() {
        return new Promise(resolved => {
            const command = `sudo npm run deploy`;
            child_process_1.exec(command, (err, stdout, stderr) => {
                if (err) {
                    console.log('err', JSON.stringify(err));
                }
                if (stdout) {
                    console.log('stdout', stdout);
                }
                if (stderr) {
                    console.log('stderr', stderr);
                }
                console.log(`Pi: Update version`);
                this.refreshTab();
            });
        });
    }
    refreshTab() {
        return new Promise(resolved => {
            const command = `DISPLAY=:0 xdotool key F5 && export DISPLAY=:0 && xset s off -dpms`;
            child_process_1.exec(command, (err, stdout, stderr) => {
                if (err) {
                    console.log('err', JSON.stringify(err));
                }
                if (stdout) {
                    console.log('stdout', stdout);
                }
                if (stderr) {
                    console.log('stderr', stderr);
                }
                console.log(`Pi: Refresh tab`);
                resolved();
            });
        });
    }
    writeKiosk() {
        return new Promise(resolved => {
            const file = `
@lxpanel --profile LXDE-pi
@pcmanfm --desktop --profile LXDE-pi
#@xscreensaver -no-splash
point-rpi

@chromium-browser -start-maximized --kiosk --disable-infobars --app=http://127.0.0.1:${env_1.env('gatewayPort')}
@unclutter
@xset s off
@xset s noblank
@xset -dpms 
      `;
            fs.writeFile(`/home/pi/.config/lxsession/LXDE-pi/autostart`, file, (err) => __awaiter(this, void 0, void 0, function* () {
                if (!err) {
                    console.log(`Pi: kiosk chrome setup`);
                }
                resolved();
            }));
        });
    }
}
exports.raspberryPiService = Object.freeze(new RaspberryPiService());
//# sourceMappingURL=raspberry-pi.service.js.map