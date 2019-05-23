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