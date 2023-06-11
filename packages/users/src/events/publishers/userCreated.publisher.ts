import { Publisher, Subjects, UserCreatedEvent } from "jndminiecomcommon";


export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
  readonly subject: Subjects = Subjects.UserCreated
}