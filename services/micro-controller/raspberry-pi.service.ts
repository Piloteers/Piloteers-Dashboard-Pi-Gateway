

import { env } from "../../env";
import { exec } from "child_process";
import * as fs from 'fs';

export class RaspberryPiService {

  constructor() {
    this.init()
  }

  async init() {

    await this.createAutoStart();
  }

  async gitPull() {
    return new Promise((resolved) => {
      const command = `git pull`

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
              cd ~/apps/Piloteers-Dashboard-Pi-Gateway && npm i -g pm2 &&  git pull && npm i && npm run prod
              /usr/bin/chromium-browser -start-maximized --kiosk http://127.0.0.1:${env.serverPort}
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

      fs.exists('/etc/init.d/autostart', (exists) => {
        if (exists) {
          return
        } else {
          fs.writeFile('/etc/init.d/autostart', file, (err) => {
            if (!err) {
              console.log('Pi: Created auto start file')
              resolved()
            }
          })
        }
      });
    })

  }

}




