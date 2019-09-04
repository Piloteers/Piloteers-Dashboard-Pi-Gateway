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
const child_process_1 = require("child_process");
const fs = require("fs");
const { version } = require('../../../package.json');
const lxde_autostart_file_1 = require("./files/lxde-autostart.file");
const rc_local_file_1 = require("./files/rc-local.file");
const lightdm_file_1 = require("./files/lightdm.file");
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
            console.log('init');
            yield this.refreshTab();
            try {
                yield this.setKiosk();
                yield this.setAutostart();
                yield this.setScreenSettings();
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    updateVersion() {
        console.log('start update');
        return new Promise(resolved => {
            const command = `sudo git reset --hard HEAD && sudo git pull && sudo pm2 restart all`;
            child_process_1.exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
                console.error(`stderr: ${stderr}`);
                resolved();
            });
        });
    }
    refreshTab() {
        console.log('Refresh tab');
        return new Promise(resolved => {
            const command = `export DISPLAY=:0 && xdotool key "ctrl+F5" && xset s noblank && xset s off && xset -dpms`;
            child_process_1.exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
                console.error(`stderr: ${stderr}`);
                resolved();
            });
        });
    }
    cleanStartup() {
        return new Promise(resolved => { });
    }
    removeCursor() {
        return new Promise(resolved => {
            const command = `sudo rm /etc/xdg/autostart/piwiz.desktop`;
            child_process_1.exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
                console.error(`stderr: ${stderr}`);
                resolved();
            });
        });
    }
    setKiosk() {
        return new Promise(resolved => {
            fs.writeFile(`/home/pi/.config/lxsession/LXDE-pi/autostart`, lxde_autostart_file_1.LxdeAutoStartFile, (err) => __awaiter(this, void 0, void 0, function* () {
                if (!err) {
                    console.log(`Err: setKiosk`);
                }
                else {
                    resolved();
                }
            }));
        });
    }
    setAutostart() {
        return new Promise(resolved => {
            fs.writeFile(`/etc/rc.local`, rc_local_file_1.RcLocalFile, (err) => __awaiter(this, void 0, void 0, function* () {
                if (!err) {
                    console.log(`Err: setAutostart`);
                    console.log(err);
                }
                else {
                    resolved();
                }
            }));
        });
    }
    setScreenSettings() {
        return new Promise(resolved => {
            fs.writeFile(`/etc/lightdm/lightdm.conf`, lightdm_file_1.LightdmFile, (err) => __awaiter(this, void 0, void 0, function* () {
                if (!err) {
                    console.log(`Err: setScreenSettings`);
                }
                else {
                    resolved();
                }
            }));
        });
    }
}
exports.raspberryPiService = Object.freeze(new RaspberryPiService());
//# sourceMappingURL=raspberry-pi.service.js.map