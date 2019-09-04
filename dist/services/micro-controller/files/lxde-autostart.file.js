"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("../../../env");
// /home/pi/.config/lxsession/LXDE-pi/autostart
exports.LxdeAutoStartFile = `
#@lxpanel --profile LXDE-pi
@pcmanfm --desktop--off --profile LXDE-pi
#@xscreensaver -no-splash
@point-rpi

#@/usr/bin/npm run prod --prefix /home/pi/apps/Piloteers-Dashboard-Pi-Gateway
@chromium-browser -start-maximized --kiosk --noerrdialogs --disable-session-crashed-bubble --disable-infobars --app=http://127.0.0.1:${env_1.env('gatewayPort')}
@unclutter
@xset s off
@xset s noblank
@xset -dpms  
`;
//# sourceMappingURL=lxde-autostart.file.js.map