

import { env } from "../../env";
import { exec } from "child_process";
import * as fs from 'fs';

export class RaspberryPiService {

  autoStactScriptName = 'autostart'

  constructor() {
    this.init()
  }

  async init() {
    await this.removeAutoStartScript()
    await this.createAutoStart();
    await this.startKiosk()
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
        resolved()
      })
    })
  }

  executableAutoStart() {
    return new Promise((resolved) => {
      const command = `sudo chmod 755 /etc/init.d/${this.autoStactScriptName} && sudo update-rc.d ${this.autoStactScriptName} defaults`

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
        resolved()
      })
    })
  }

  startKiosk() {
    console.log('start kiosk')
    return new Promise((resolved) => {
      const command = `/usr/bin/chromium-browser -start-maximized --no-sandbox --kiosk http://127.0.0.1:${env.serverPort}`

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
        resolved()
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




