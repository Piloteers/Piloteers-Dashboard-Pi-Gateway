import { env } from '../../env';
import { exec } from 'child_process';
import * as fs from 'fs';
const { version } = require('../../../package.json');
import * as request from 'request-promise';
import { LxdeAutoStartFile } from './files/lxde-autostart.file';
import { RcLocalFile } from './files/rc-local.file';
import { LightdmFile } from './files/lightdm.file';
import { extractFirstQuotedText } from '../../helpers';
var CronJob = require('cron').CronJob;

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
      await this.startCronJobs();
      await this.enableWifi();
      await this.refreshTab();
      await this.setKiosk();
      await this.setAutostart();
      await this.setScreenSettings();
    } catch (err) {
      console.log(err);
    }
  }

  startCronJobs() {

    // Reconnect to wifi
    new CronJob('*/10 * * * * *', () => {
      console.log('You will see this message 10 second');
      // weard bug in firmware: https://raspberrypi.stackexchange.com/questions/43720/disable-wifi-wlan0-on-pi-3
      const command = `sudo iwgetid`;
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(extractFirstQuotedText(stdout))
      });
    }, null, true, 'Europe/Berlin');

    // Turn Monitor on 
    new CronJob('0 9  * * 1-5', () => {
      console.log('Turn Monitor On');
      const command = `sudo vcgencmd display_power 1`;
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
      });
    }, null, true, 'Europe/Berlin');


    // Turn Monitor on 
    new CronJob('0 19  * * 1-5', () => {
      console.log('Turn Monitor Off');
      const command = `sudo vcgencmd display_power 0`;
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
      });
    }, null, true, 'Europe/Berlin');
  }

  enableWifi() {
    console.log('Controller: enableWifi');
    return new Promise(resolved => {
      // weard bug in firmware: https://raspberrypi.stackexchange.com/questions/43720/disable-wifi-wlan0-on-pi-3
      const command = `sudo iwconfig wlan0 txpower auto && sudo iwconfig wlan0 txpower auto && sudo iwconfig wlan0 txpower on && sudo iw wlan0 set power_save off`;
      exec(command, (error, stdout, stderr) => {
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

      exec(command, (error, stdout, stderr) => {
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
      exec(command, (error, stdout, stderr) => {
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

      exec(command, (error, stdout, stderr) => {
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
        } else {
          this.makeFileExecutable('/etc/rc.local')
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

  makeFileExecutable(file) {
    const command = `sudo chmod +x ${file}`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`File ${file} is now executable`)
    });
  }
}

export const raspberryPiService = Object.freeze(new RaspberryPiService());
