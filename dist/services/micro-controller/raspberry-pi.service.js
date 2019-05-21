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
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createAutoStart();
        });
    }
    gitPull() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolved) => {
                const command = `git pull`;
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
                });
            });
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
              npm i -g pm2
              cd ~/apps/Piloteers-Dashboard-Pi-Gateway && git pull && npm i && npm run prod
              /usr/bin/chromium-browser -start-maximized --kiosk http://127.0.0.1:${env_1.env.serverPort}
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
            fs.exists('/etc/init.d/autostart', (exists) => {
                if (exists) {
                    return;
                }
                else {
                    fs.writeFile('/etc/init.d/autostart', file, (err) => {
                        if (!err) {
                            console.log('Pi: Created auto start file');
                            resolved();
                        }
                    });
                }
            });
        });
    }
}
exports.RaspberryPiService = RaspberryPiService;
//# sourceMappingURL=raspberry-pi.service.js.map