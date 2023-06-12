"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Listener = void 0;
class Listener {
    constructor(client) {
        this.client = client;
        this.ackWait = 5000;
    }
    subscriptionOptions() {
        return this.client.subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setAckWait(this.ackWait)
            .setDurableName(this.queueGroupName);
    }
    listen() {
        const subscription = this.client.subscribe(this.subject, this.queueGroupName, this.subscriptionOptions());
        subscription.on('message', (msg) => {
            console.log('Message recieved: ' + this.subject + ' / ' + this.queueGroupName + ' / ');
            const parsedData = this.parseMessage(msg);
            this.onMessage(parsedData, msg);
        });
    }
    customListen() {
        return this.client.subscribe(this.subject, this.queueGroupName, this.subscriptionOptions());
    }
    parseMessage(msg) {
        const data = msg.getData();
        return typeof data === 'string'
            ? JSON.parse(data)
            : JSON.parse(data.toString('utf8'));
    }
}
exports.Listener = Listener;
