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
const date_fns_1 = require("date-fns");
const moment = require("moment");
const device_service_1 = require("../device.service");
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
        //Reconnect to wifi
        new CronJob('0 */1 * * * *', () => {
            // weard bug in firmware: https://raspberrypi.stackexchange.com/questions/43720/disable-wifi-wlan0-on-pi-3
            const command = `sudo iwgetid`;
            child_process_1.exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    this.reconnectWifi();
                    return;
                }
                // const ssid = extractFirstQuotedText(stdout)
                // if (!ssid) {
                //   console.log('Wifi disconnected', new Date());
                //   console.log(ssid, stdout)
                //   this.reconnectWifi();
                // }
            });
        }, null, true, 'Europe/Berlin');
        // Check active screen time  
        new CronJob('0 */1 * * * *', () => {
            this.checkMonitorStatus();
        }, null, true, 'Europe/Berlin');
    }
    checkMonitorStatus() {
        console.log('Monitor check', new Date());
        const date = new Date();
        if (device_service_1.deviceService.data.device.isConnected) {
            const activeScreenTime = device_service_1.deviceService.data.device.deviceSettings.activeScreenTime;
            const quarter = Math.floor(parseInt(date_fns_1.format(date, 'mm')) / 15);
            const time = date_fns_1.format(date.setMinutes(quarter * 15), 'HH:mm');
            const day = moment().format('ddd').toUpperCase();
            const schedule = activeScreenTime.find((s) => s.day == day);
            if (schedule) {
                if (schedule.times.includes(time)) {
                    this.turnMonitorOn();
                }
                else {
                    this.turnMonitorOff();
                }
            }
            else {
                this.turnMonitorOn();
            }
        }
    }
    turnMonitorOn() {
        console.log('Turn Monitor On', new Date());
        const command = `sudo vcgencmd display_power 1`;
        child_process_1.exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
        });
    }
    turnMonitorOff() {
        console.log('Turn Monitor Off', new Date());
        const command = `sudo vcgencmd display_power 0`;
        child_process_1.exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
        });
    }
    reconnectWifi() {
        const command = `sudo wpa_cli -i wlan0 reconfigure`;
        child_process_1.exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
        });
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
                    this.makeFileExecutable('/etc/rc.local');
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
    makeFileExecutable(file) {
        const command = `sudo chmod +x ${file}`;
        child_process_1.exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`File ${file} is now executable`);
        });
    }
}
exports.raspberryPiService = Object.freeze(new RaspberryPiService());
//# sourceMappingURL=raspberry-pi.service.js.map