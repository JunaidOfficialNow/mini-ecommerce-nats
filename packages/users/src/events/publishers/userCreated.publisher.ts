import { Publisher } from "../../../../common/src/base-publisher";
import { UserCreatedEvent } from "../../../../common/src/events/userCreatedEvent";
import { Subjects } from "../../../../common/src/subjects";

export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
  readonly subject: Subjects = Subjects.UserCreated
}