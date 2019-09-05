PI Gateway

```
sudo apt-get update

sudo apt-get install xdotool

DISPLAY=:0 xdotool key F5
```



```
chromium-browser -start-maximized --kiosk --disable-infobars --app=http://127.0.0.1:${env.serverPort}
```

You can enter the following three xset commands in /etc/X11/xinit/xinitrc
file (You should insert these after the first line).

```
sudo nano /etc/lightdm/lightdm.conf
[SeatDefaults]
xserver-command=X -s 0 -dpms

export DISPLAY=:0 && xset s off -dpms
```

Autostart

```
sudo nano /etc/rc.local
```

```
#!/bin/sh -e
#
# rc.local
#
# This script is executed at the end of each multiuser runlevel.
# Make sure that the script will "exit 0" on success or any other
# value on error.
#
# In order to enable or disable this script just change the execution
# bits.
#
# By default this script does nothing.

# Print the IP address
_IP=$(hostname -I) || true
if [ "$_IP" ]; then
  printf "My IP address is %s\n" "$_IP"
fi

cd /home/pi/apps/Piloteers-Dashboard-Pi-Gateway && sudo /usr/bin/npm run prod

exit 0
```

Refreh Chronium

```
pi@raspberrypi:~ $ export DISPLAY=:0
pi@raspberrypi:~ $ xdotool key "ctrl+F5"
```

Get display resolution
`fbset -s`

//cd /home/pi/apps/Piloteers-Dashboard-Pi-Gateway && sudo /usr/bin/npm run prod
// /usr/bin/npm run prod --prefix /home/pi/apps/Piloteers-Dashboard-Pi-Gateway

Remove startup message

```
sudo rm /etc/xdg/autostart/piwiz.desktop
```

Remove cursor
I simply added a nocursor option as follows in the file (/etc/lightdm/lightdm.conf)

```
xserver-command = X -nocursor
```

Auto start pm2

```
sudo pm2 startup systemd
```