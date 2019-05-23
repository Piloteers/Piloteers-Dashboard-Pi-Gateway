
import { Company, RolesEnum } from "@piloteers/dashboard-model";

class UpdateSocketClass {
  static instance: any;
  data: { socket?: any, io?: any } = {};

  constructor() {
    if (!UpdateSocketClass.instance) {
      this.data = {};
      UpdateSocketClass.instance = this;
    }
    return UpdateSocketClass.instance;
  }

  setSocket(socket, io) {
    this.data.socket = socket;
    this.data.io = io;
  }

  async showUpdateScreen(version) {
    await this.waitingLoop(0, this.data.socket);
    console.log('can update', !!this.data.socket)
    this.data.socket.emit('update:show', version)
  }

  waitingLoop(count = 0, object) {
    return new Promise((resolve, reject) => {

      var timeout = () => {
        setTimeout(() => {
          if (object || count > 50) {
            resolve();
          } else {
            count++;
            timeout()
          }
        }, 5000);
      }
      timeout();

    });
  }

}
export const UpdateSocket = Object.freeze(new UpdateSocketClass()); 
