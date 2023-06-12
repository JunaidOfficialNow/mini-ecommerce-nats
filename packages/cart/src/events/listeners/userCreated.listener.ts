import { Message, SubscriptionOptions } from "node-nats-streaming";
import { Listener, Subjects, UserCreatedEvent } from "jndminiecomcommon";
import { queueGroupName } from "../queueName";
import { Cart } from "../../models/cart";

export class UserCreatedListener extends Listener<UserCreatedEvent> {
  subject: Subjects = Subjects.UserCreated;
  queueGroupName: string = queueGroupName
  async onMessage(data: UserCreatedEvent['data'], msg: Message): Promise<void> {
    try {
      const { _id } = data; 
      await Cart.create({ userId: _id, products: []})
      msg.ack();
    } catch (error) {
      
    }

  }

}