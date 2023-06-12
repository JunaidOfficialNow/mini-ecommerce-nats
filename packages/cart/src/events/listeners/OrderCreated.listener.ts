import { Message } from "node-nats-streaming";
import { OrderCreatedEvent } from "../../../../common/events/OrderPublishedEvent";
import { Listener } from "../../../../common/nats-listner";
import { Subjects } from "../../../../common/subjects";
import { queueGroupName } from "../queueName";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject: Subjects = Subjects.OrderCreated
  queueGroupName: string = queueGroupName
  onMessage(data: { success: boolean; }, msg: Message): void {
    throw new Error("Method not implemented.");
  }
}