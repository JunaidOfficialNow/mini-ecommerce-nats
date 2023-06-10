import { Message, SubscriptionOptions } from "node-nats-streaming";
import { UserCreatedEvent } from "../../../../common/events/userCreatedEvent";
import { Listener } from "../../../../common/nats-listner";
import { Subjects } from "../../../../common/subjects";
import { queueGroupName } from "../queneName";
import { User } from "../../models/user";

export class UserCreatedListener extends Listener<UserCreatedEvent> {
  subject: Subjects = Subjects.UserCreated;
  queueGroupName: string = queueGroupName
  async onMessage(data: UserCreatedEvent['data'], msg: Message): Promise<void> {
    try {
      const { name , email, _id } = data; 
      await User.create({ _id, name,  email});
      msg.ack();
    } catch (error) {
      console.log(error);
    }

  }

}