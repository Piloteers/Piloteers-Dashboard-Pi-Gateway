

import { env } from "../../env";
import { exec } from "child_process";
import * as fs from 'fs';

export class RaspberryPiService {

  autoStactScriptName = 'dashboard'

  constructor() {
    this.init()
  }

  async init() {
    await this.createAutoStart();
    await this.writeKiosk()
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
                cd /home/pi/apps/Piloteers-Dashboard-Pi-Gateway
                sudo mkdir scriptlgeht
                sudo /usr/bin/npm i -g pm2 && sudo /usr/bin/git pull && sudo /usr/bin/npm i && sudo /usr/bin/npm run prod
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
      `

      fs.writeFile(`/etc/init.d/${this.autoStactScriptName}`, file, async (err) => {
        if (!err) {
          console.log(`Pi: Created ${this.autoStactScriptName} file`)
          await this.executableAutoStart()
          resolved()
        } else {
          console.log(err)
        }
      })
    })

  }

}




