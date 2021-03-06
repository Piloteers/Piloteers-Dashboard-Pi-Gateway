"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// /etc/rc.local
exports.RcLocalFile = `
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

# cd /home/pi/apps/Piloteers-Dashboard-Pi-Gateway && sudo /usr/bin/npm run prod

exit 0
`;
//# sourceMappingURL=rc-local.file.js.map