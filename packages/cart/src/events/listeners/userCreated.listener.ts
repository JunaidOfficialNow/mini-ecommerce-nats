import { Message, SubscriptionOptions } from "node-nats-streaming";
import { UserCreatedEvent } from "../../../../common/events/userCreatedEvent";
import { Listener } from "../../../../common/nats-listner";
import { Subjects } from "../../../../common/subjects";
import { queueGroupName } from "../queueName";
import { Cart } from "../../models/cart";

export class UserCreatedListener extends Listener<UserCreatedEvent> {
  subject: Subjects = Subjects.UserCreated;
  queueGroupName: string = queueGroupName
  async onMessage(data: UserCreatedEvent['data'], msg: Message): Promise<void> {
    try {
      const { _id } = data; 
      await Cart.create({ userId: _id, products: [], totalAmount: 0})
      msg.ack();
    } catch (error) {
      
    }

  }

}