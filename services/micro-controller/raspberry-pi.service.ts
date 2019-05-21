

import { env } from "../../env";
import { exec } from "child_process";
import * as fs from 'fs';

export class RaspberryPiService {

  autoStactScriptName = 'Dashboard'

  constructor() {
    this.init()
  }

  async init() {
    await this.removeAutoStartScript()
    await this.createAutoStart();
    await this.writeKiosk()
  }

  removeAutoStartScript() {
    return new Promise((resolved) => {
      const command = `sudo rm -rf /etc/init.d/${this.autoStactScriptName}`

      exec(command, (err, stdout, stderr) => {
        if (err) {
          console.log(err)
        }
        if (stdout) {
          console.log(stdout)
        }
        if (stderr) {
          console.log(stderr)
        }
        console.log('Pi: Removed old autostart file')
        resolved()
      })
    })
  }

  executableAutoStart() {
    return new Promise((resolved) => {
      const command = `cd /etc/init.d/ && sudo chmod 755 /etc/init.d/${this.autoStactScriptName} && sudo update-rc.d ${this.autoStactScriptName} defaults`

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
        console.log(`Pi: Make ${this.autoStactScriptName} executable`)
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

      @chromium-browser -start-maximized --kiosk --disable-infobars http://127.0.0.1:${env.serverPort}
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
        sudo pm2 kill
        ;;
    restart)
        echo "pi wird neugestart" 
        sudo pm2 kill && cd ~/apps/Piloteers-Dashboard-Pi-Gateway && sudo npm i -g pm2 && sudo git pull && sudo npm i && sudo npm run prod
        ;;
    *) 
        exit 1
        ;;      
exit 0
    `

      fs.exists(`/etc/init.d/${this.autoStactScriptName}`, (exists) => {
        if (exists) {
          return
        } else {
          fs.writeFile(`/etc/init.d/${this.autoStactScriptName}`, file, async (err) => {
            if (!err) {
              console.log(`Pi: Created ${this.autoStactScriptName} file`)
              await this.executableAutoStart()
              resolved()
            }
          })
        }
      });
    })

  }

}




