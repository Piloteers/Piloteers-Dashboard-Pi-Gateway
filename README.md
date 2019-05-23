PI Gateway

```
sudo apt-get update

sudo apt-get install xdotool

DISPLAY=:0 xdotool key F5
```

```
chromium-browser -start-maximized --kiosk --disable-infobars --app=http://127.0.0.1:${env.serverPort}
```


Edit /etc/xdg/lxsession/LXDE-pi/autostart and add these three lines

@xset s off
@xset -dpms
@xset s noblank