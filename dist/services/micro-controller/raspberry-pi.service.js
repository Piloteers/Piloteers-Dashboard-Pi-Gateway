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
        this.autoStactScriptName = 'autostart';
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.removeAutoStartScript();
            yield this.createAutoStart();
            yield this.writeKiosk();
        });
    }
    removeAutoStartScript() {
        return new Promise((resolved) => {
            const command = `sudo rm -rf /etc/init.d/${this.autoStactScriptName}`;
            child_process_1.exec(command, (err, stdout, stderr) => {
                if (err) {
                    console.log(err);
                }
                if (stdout) {
                    console.log(stdout);
                }
                if (stderr) {
                    console.log(stderr);
                }
                resolved();
            });
        });
    }
    executableAutoStart() {
        return new Promise((resolved) => {
            const command = `sudo chmod 755 /etc/init.d/${this.autoStactScriptName} && sudo update-rc.d ${this.autoStactScriptName} defaults`;
            child_process_1.exec(command, (err, stdout, stderr) => {
                console.log(err, stdout, stderr);
                if (err) {
                    console.log('err', JSON.stringify(err));
                }
                if (stdout) {
                    console.log('stdout', stdout);
                }
                if (stderr) {
                    console.log('stderr', stderr);
                }
                resolved();
            });
        });
    }
    writeKiosk() {
        console.log('start kiosk');
        return new Promise((resolved) => {
            const file = `
      @lxpanel --profile LXDE-pi
      @pcmanfm --desktop --profile LXDE-pi
      #@xscreensaver -no-splash
      point-rpi

      @chromium-browser -start-maximized --kiosk --disable-infobars  http://127.0.0.1:${env_1.env.serverPort}
      @unclutter
      @xset s off
      @xset s noblank
      @xset -dpms 
      `;
            fs.writeFile(`/home/pi/.config/lxsession/LXDE-pi/autostart`, file, (err) => __awaiter(this, void 0, void 0, function* () {
                if (!err) {
                    console.log(`Pi: kiosk chrome setup`);
                    yield this.executableAutoStart();
                    resolved();
                }
            }));
        });
    }
    createAutoStart() {
        return new Promise((resolved) => {
            const file = `
      #! /bin/sh
      ### BEGIN INIT INFO
      # Provides: noip
      # Required-Start: $syslog
      # Required-Stop: $syslog
      # Default-Start: 2 3 4 5
      # Default-Stop: 0 1 6
      # Short-Description: noip server
      # Description:
      ### END INIT INFO
      
      case "$1" in
          start)
              echo "pi wird gestartet"
              # Starte Programm
              cd ~/apps/Piloteers-Dashboard-Pi-Gateway && sudo npm i -g pm2 && sudo git pull && sudo npm i && sudo npm run prod
              ;;
          stop)
              echo "pi wird beendet"
              # Beende Programm 
              ;;
          *) 
              exit 1
              ;;      
      exit 0
    `;
            fs.exists(`/etc/init.d/${this.autoStactScriptName}`, (exists) => {
                if (exists) {
                    return;
                }
                else {
                    fs.writeFile(`/etc/init.d/${this.autoStactScriptName}`, file, (err) => __awaiter(this, void 0, void 0, function* () {
                        if (!err) {
                            console.log(`Pi: Created ${this.autoStactScriptName} file`);
                            yield this.executableAutoStart();
                            resolved();
                        }
                    }));
                }
            });
        });
    }
}
exports.RaspberryPiService = RaspberryPiService;
//# sourceMappingURL=raspberry-pi.service.js.map