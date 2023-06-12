import nats, { Stan, Message } from 'node-nats-streaming';
import { Subjects } from './subjects';
interface Event {
    subject: Subjects;
    data: any;
}
export declare abstract class Listener<T extends Event> {
    private client;
    abstract subject: T['subject'];
    abstract queueGroupName: string;
    protected ackWait: number;
    abstract onMessage(data: T['data'], msg: Message): void;
    constructor(client: Stan);
    subscriptionOptions(): nats.SubscriptionOptions;
    listen(): void;
    customListen(): nats.Subscription;
    parseMessage(msg: Message): any;
}
export {};
