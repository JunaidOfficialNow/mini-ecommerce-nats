import { Publisher } from "../../../../common/base-publisher";
import { UserCreatedEvent } from "../../../../common/events/userCreatedEvent";
import { Subjects } from "../../../../common/subjects";

export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
  readonly subject: Subjects = Subjects.UserCreated
}