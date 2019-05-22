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
class RaspberryPiService {
    constructor() {
        this.autoStactScriptName = 'dashboard';
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createAutoStart();
            yield this.writeKiosk();
        });
    }
    executableAutoStart() {
        return new Promise((resolved) => {
            const command = `cd /etc/init.d/ && sudo chmod 755 /etc/init.d/${this.autoStactScriptName} && sudo update-rc.d ${this.autoStactScriptName} defaults`;
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
                console.log(`Pi: Make ${this.autoStactScriptName} executable`);
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

@chromium-browser -start-maximized --kiosk --disable-infobars http://127.0.0.1:${env_1.env.serverPort}
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
    createAutoStart() {
        return new Promise((resolved) => {
            const file = `
        #! /bin/bash
        ### BEGIN INIT INFO
        # Provides: ${this.autoStactScriptName}
        # Required-Start: $remote_fs $syslog
        # Required-Stop: $remote_fs $syslog
        # Default-Start: 2 3 4 5
        # Default-Stop: 0 1 6
        # Short-Description: ${this.autoStactScriptName}
        # Description: ${this.autoStactScriptName}
        ### END INIT INFO 
        case "$1" in
            start)
                echo "pi wird gestartet" 
                # Starte Programm
                cd /home/pi/apps/Piloteers-Dashboard-Pi-Gateway && sudo mkdir scriptlgeht && sudo /usr/bin/npm i -g pm2 && sudo /usr/bin/git pull && sudo /usr/bin/npm i && sudo /usr/bin/npm run prod
                ;;
            stop)
                echo "pi wird beendet"
                # Beende Programm 
                sudo /usr/bin/pm2 kill
                ;;
            restart)
                echo "pi wird neugestart" 
                sudo /usr/bin/pm2 kill 
                ;;
            *) 
                exit 1
                ;;       
        esac

        exit 0
      `;
            fs.writeFile(`/etc/init.d/${this.autoStactScriptName}`, file, (err) => __awaiter(this, void 0, void 0, function* () {
                if (!err) {
                    console.log(`Pi: Created ${this.autoStactScriptName} file`);
                    yield this.executableAutoStart();
                    resolved();
                }
                else {
                    console.log(err);
                }
            }));
        });
    }
}
exports.RaspberryPiService = RaspberryPiService;
//# sourceMappingURL=raspberry-pi.service.js.map