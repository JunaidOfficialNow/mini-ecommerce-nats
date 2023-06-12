import { Message } from "node-nats-streaming";
import { queueGroupName } from "../queueName";
import { Listener, OrderCreatedEvent, Subjects } from "jndminiecomcommon";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject: Subjects = Subjects.OrderCreated
  queueGroupName: string = queueGroupName
  onMessage(data: { success: boolean; }, msg: Message): void {
    throw new Error("Method not implemented.");
  }
}