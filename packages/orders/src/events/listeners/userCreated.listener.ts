import { Message, SubscriptionOptions } from "node-nats-streaming";
import { UserCreatedEvent } from "../../../../common/events/userCreatedEvent";
import { Listener } from "../../../../common/nats-listner";
import { Subjects } from "../../../../common/subjects";
import { queueGroupName } from "../queneName";
import { User } from "../../models/user";

export class UserCreatedListener extends Listener<UserCreatedEvent> {
  subject: Subjects = Subjects.UserCreated;
  queueGroupName: string = queueGroupName
  async onMessage(data: { name: string; email: string; }, msg: Message): Promise<void> {
    try {
      const { name , email } = data; 
      const user = await User.create({ name,  email});
      msg.ack();
    } catch (error) {
      
    }

  }

}