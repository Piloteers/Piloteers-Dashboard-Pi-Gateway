import { env } from '../../../env';

// /home/pi/.config/lxsession/LXDE-pi/autostart
export const LxdeAutoStartFile = `
#@lxpanel --profile LXDE-pi
@pcmanfm --desktop--off --profile LXDE-pi
#@xscreensaver -no-splash
@point-rpi

#@/usr/bin/npm run prod --prefix /home/pi/apps/Piloteers-Dashboard-Pi-Gateway
@chromium-browser -start-maximized --kiosk --noerrdialogs --disable-session-crashed-bubble --disable-infobars --app=http://127.0.0.1:${env(
  'gatewayPort'
)}
@unclutter
@xset s off
@xset s noblank
@xset -dpms  
`;
