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
var CronJob = require('cron').CronJob;
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
                yield this.startCronJobs();
                yield this.enableWifi();
                yield this.refreshTab();
                yield this.setKiosk();
                yield this.setAutostart();
                yield this.setScreenSettings();
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    startCronJobs() {
        // Reconnect to wifi
        new CronJob('*/10 * * * * *', () => {
            console.log('You will see this message 10 second');
            // weard bug in firmware: https://raspberrypi.stackexchange.com/questions/43720/disable-wifi-wlan0-on-pi-3
            const command = `sudo iwgetid`;
            child_process_1.exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
                console.log(stdout);
            });
        }, null, true, 'Europe/Berlin');
        // Turn Monitor on 
        new CronJob('0 9  * * 1-5', () => {
            console.log('Turn Monitor On');
            const command = `sudo vcgencmd display_power 1`;
            child_process_1.exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
                console.log(stdout);
            });
        }, null, true, 'Europe/Berlin');
        // Turn Monitor on 
        new CronJob('0 19  * * 1-5', () => {
            console.log('Turn Monitor Off');
            const command = `sudo vcgencmd display_power 0`;
            child_process_1.exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
                console.log(stdout);
            });
        }, null, true, 'Europe/Berlin');
    }
    enableWifi() {
        console.log('Controller: enableWifi');
        return new Promise(resolved => {
            // weard bug in firmware: https://raspberrypi.stackexchange.com/questions/43720/disable-wifi-wlan0-on-pi-3
            const command = `sudo iwconfig wlan0 txpower auto && sudo iwconfig wlan0 txpower auto && sudo iwconfig wlan0 txpower on && sudo iw wlan0 set power_save off`;
            child_process_1.exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
                resolved();
            });
        });
    }
    updateVersion() {
        console.log('Controller: updateVersion');
        return new Promise(resolved => {
            const command = `sudo git reset --hard HEAD && sudo git pull && sudo npm i && sudo pm2 restart all`;
            child_process_1.exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
                resolved();
            });
        });
    }
    refreshTab() {
        console.log('Controller: refreshTab');
        return new Promise(resolved => {
            const command = `export DISPLAY=:0 && export XAUTHORITY=/home/pi/.Xauthority && xdotool key "ctrl+F5" && xset s noblank && xset s off && xset -dpms`;
            child_process_1.exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
                resolved();
            });
        });
    }
    cleanStartup() {
        console.log('Controller: cleanStartup');
        return new Promise(resolved => { });
    }
    removeCursor() {
        console.log('Controller: removeCursor');
        return new Promise(resolved => {
            const command = `sudo rm /etc/xdg/autostart/piwiz.desktop`;
            child_process_1.exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
                resolved();
            });
        });
    }
    setKiosk() {
        console.log('Controller: setKiosk');
        return new Promise(resolved => {
            fs.writeFile(`/home/pi/.config/lxsession/LXDE-pi/autostart`, lxde_autostart_file_1.LxdeAutoStartFile, (err) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    console.log(`Err: setKiosk`, err);
                }
                else {
                    resolved();
                }
            }));
        });
    }
    setAutostart() {
        console.log('Controller: setAutostart');
        return new Promise(resolved => {
            fs.writeFile(`/etc/rc.local`, rc_local_file_1.RcLocalFile, (err) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    console.log(`Err: setAutostart`, err);
                }
                else {
                    resolved();
                }
            }));
        });
    }
    setScreenSettings() {
        console.log('Controller: setScreenSettings');
        return new Promise(resolved => {
            fs.writeFile(`/etc/lightdm/lightdm.conf`, lightdm_file_1.LightdmFile, (err) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    console.log(`Err: setScreenSettings`, err);
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