import { env } from '../../env';
import { exec } from 'child_process';
import * as fs from 'fs';
const { version } = require('../../../package.json');
import * as request from 'request-promise';
import { LxdeAutoStartFile } from './files/lxde-autostart.file';
import { RcLocalFile } from './files/rc-local.file';
import { LightdmFile } from './files/lightdm.file';

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
      await this.setKiosk();
      await this.setAutostart();
      await this.setScreenSettings();
    } catch (err) {
      console.log(err);
    }
  }

  updateVersion() {
    console.log('Controller: updateVersion');
    return new Promise(resolved => {
      const command = `sudo git reset --hard HEAD && sudo git pull && sudo pm2 restart all`;

      exec(command, (error, stdout, stderr) => {
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
    console.log('Controller: refreshTab');
    return new Promise(resolved => {
      const command = `export DISPLAY=:0 && export XAUTHORITY=/home/pi/.Xauthority && xdotool key "ctrl+F5" && xset s noblank && xset s off && xset -dpms`;
      exec(command, (error, stdout, stderr) => {
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
    console.log('Controller: cleanStartup');
    return new Promise(resolved => {});
  }

  removeCursor() {
    console.log('Controller: removeCursor');
    return new Promise(resolved => {
      const command = `sudo rm /etc/xdg/autostart/piwiz.desktop`;

      exec(command, (error, stdout, stderr) => {
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
    console.log('Controller: setKiosk');
    return new Promise(resolved => {
      fs.writeFile(`/home/pi/.config/lxsession/LXDE-pi/autostart`, LxdeAutoStartFile, async err => {
        if (err) {
          console.log(`Err: setKiosk`, err);
        } else {
          resolved();
        }
      });
    });
  }

  setAutostart() {
    console.log('Controller: setAutostart');
    return new Promise(resolved => {
      fs.writeFile(`/etc/rc.local`, RcLocalFile, async err => {
        if (err) {
          console.log(`Err: setAutostart`, err);
          console.log(err);
        } else {
          resolved();
        }
      });
    });
  }

  setScreenSettings() {
    console.log('Controller: setScreenSettings');
    return new Promise(resolved => {
      fs.writeFile(`/etc/lightdm/lightdm.conf`, LightdmFile, async err => {
        if (err) {
          console.log(`Err: setScreenSettings`, err);
        } else {
          resolved();
        }
      });
    });
  }
}

export const raspberryPiService = Object.freeze(new RaspberryPiService());
