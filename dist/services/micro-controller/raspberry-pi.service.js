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
const request = require("request-promise");
const update_socket_1 = require("../../sockets/update.socket");
class RaspberryPiService {
    constructor() {
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.refreshTab();
            yield this.writeKiosk();
            yield this.checkVersion();
            // every hours check for updates
            setInterval(() => {
                this.checkVersion();
            }, 60 * 60 * 1000);
        });
    }
    checkVersion() {
        return new Promise((resolved) => {
            request(`https://raw.githubusercontent.com/Piloteers/Piloteers-Dashboard-Pi-Gateway/master/package.json`).then((data) => {
                let packageJson = JSON.parse(data);
                console.log('Pi: Check version ', version, '=>', packageJson.version);
                if (packageJson.version != version) {
                    setTimeout(() => {
                        // wait until socket is connected
                        new update_socket_1.UpdateSocket().showUpdateScreen(packageJson.version);
                        this.updateVersion();
                    }, 10 * 1000);
                }
                resolved();
            }).catch((err) => {
                // Crawling failed...
            });
        });
    }
    updateVersion() {
        return new Promise((resolved) => {
            const command = `sudo npm run git && sudo npm i && sudo reboot`;
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
    refreshTab() {
        return new Promise((resolved) => {
            const command = `DISPLAY=:0 xdotool key F5`;
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
        return new Promise((resolved) => {
            const file = `
@lxpanel --profile LXDE-pi
@pcmanfm --desktop --profile LXDE-pi
#@xscreensaver -no-splash
point-rpi

@chromium-browser -start-maximized --kiosk --disable-infobars --app=http://127.0.0.1:${env_1.env.serverPort}
@unclutter
@xset s off
@xset s noblank
@xset -dpms 
      `;
            fs.writeFile(`/home/pi/.config/lxsession/LXDE-pi/autostart`, file, (err) => __awaiter(this, void 0, void 0, function* () {
                if (!err) {
                    console.log(`Pi: kiosk chrome setup`);
                    resolved();
                }
            }));
        });
    }
}
exports.RaspberryPiService = RaspberryPiService;
//# sourceMappingURL=raspberry-pi.service.js.map