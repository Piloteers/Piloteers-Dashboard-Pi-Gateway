
import { Company, RolesEnum } from "@piloteers/dashboard-model";

export class UpdateSocket {
  instance: UpdateSocket;
  socket: any = null;
  io: any = null;

  constructor(socket = null, io = null) {
    this.socket = socket;
    this.io = io;

    if (!this.instance && socket && io) {
      this.instance = this
    }

    return this.instance;
  }

  static getInstance() {
    return this;
  }

  showUpdateScreen(version) {
    if (this.socket) {
      this.socket.emit('update:show', version)
    }
  }

}


