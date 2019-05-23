

import { env } from "../../env";
import { exec } from "child_process";
import * as fs from 'fs';
const { version } = require('../../../package.json');
import * as request from 'request-promise'


export class RaspberryPiService {

  constructor() {
    this.init()
  }

  async init() {
    await this.refreshTab();
    await this.checkVersion();
    await this.writeKiosk();
  }

  checkVersion() {
    return new Promise((resolved) => {
      request(`https://raw.githubusercontent.com/Piloteers/Piloteers-Dashboard-Pi-Gateway/master/package.json`).then((data) => {
        let packageJson = JSON.parse(data)
        console.log('Pi: Check version ', version, '=>', packageJson.version)
        if (packageJson.version != version) {
          this.updateVersion()
        }
        resolved()
      }).catch((err) => {
        // Crawling failed...
      });
    })

  }

  updateVersion() {
    return new Promise((resolved) => {
      const command = `sudo npm run git && sudo npm i`

      exec(command, (err, stdout, stderr) => {
        if (err) {
          console.log('err', JSON.stringify(err))
        }
        if (stdout) {
          console.log('stdout', stdout)
        }
        if (stderr) {
          console.log('stderr', stderr)
        }
        console.log(`Pi: Refresh tab`)
        resolved()
      })
    })
  }

  refreshTab() {
    return new Promise((resolved) => {
      const command = `DISPLAY=:0 xdotool key F5`

      exec(command, (err, stdout, stderr) => {
        if (err) {
          console.log('err', JSON.stringify(err))
        }
        if (stdout) {
          console.log('stdout', stdout)
        }
        if (stderr) {
          console.log('stderr', stderr)
        }
        console.log(`Pi: Refresh tab`)
        resolved()
      })
    })
  }


  writeKiosk() {
    return new Promise((resolved) => {
      const file = `
@lxpanel --profile LXDE-pi
@pcmanfm --desktop --profile LXDE-pi
#@xscreensaver -no-splash
point-rpi

@chromium-browser -start-maximized --kiosk --disable-infobars --app=http://127.0.0.1:${env.serverPort}
@unclutter
@xset s off
@xset s noblank
@xset -dpms 
      `
      fs.writeFile(`/home/pi/.config/lxsession/LXDE-pi/autostart`, file, async (err) => {
        if (!err) {
          console.log(`Pi: kiosk chrome setup`)
          resolved()
        }
      })
    })
  }

}




