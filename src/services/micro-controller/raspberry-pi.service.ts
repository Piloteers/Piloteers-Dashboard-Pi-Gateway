import { env } from '../../env';
import { exec } from 'child_process';
import * as fs from 'fs';
const { version } = require('../../../package.json');
import * as request from 'request-promise';

class RaspberryPiService {
  instance: any = null;

  constructor() {
    if (!this.instance) {
      this.instance = this;
    }
    return this.instance;
  }

  async init() {
    try {
      await this.refreshTab();
      await this.writeKiosk();
    } catch (error) {}
  }

  updateVersion() {
    return new Promise(resolved => {
      const command = `sudo npm run git && sudo npm run clear && sudo npm i && sudo reboot`;
      exec(command, (err, stdout, stderr) => {
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
      });
    });
  }

  refreshTab() {
    return new Promise(resolved => {
      const command = `DISPLAY=:0 xdotool key F5 && export DISPLAY=:0 && xset s off -dpms`;

      exec(command, (err, stdout, stderr) => {
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

@chromium-browser -start-maximized --kiosk --disable-infobars --app=http://127.0.0.1:${env('gatewayPort')}
@unclutter
@xset s off
@xset s noblank
@xset -dpms 
      `;
      fs.writeFile(`/home/pi/.config/lxsession/LXDE-pi/autostart`, file, async err => {
        if (!err) {
          console.log(`Pi: kiosk chrome setup`);
        }
        resolved();
      });
    });
  }
}

export const raspberryPiService = Object.freeze(new RaspberryPiService());
