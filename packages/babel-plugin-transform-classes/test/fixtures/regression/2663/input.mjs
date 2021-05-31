import net from 'net';
import { EventEmitter } from 'events';
import BinarySerializer from './helpers/binary-serializer';
// import ...

export default class Connection extends EventEmitter {
    constructor(endpoint, joinKey, joinData, roomId) {
        super();

        this.isConnected = false;
        this.roomId = roomId;

        // ...
    }

    send(message) {
        this.sock.write(BinarySerializer.serializeMessage(message));
    }

    disconnect() {
        this.sock.close();
    }
}
