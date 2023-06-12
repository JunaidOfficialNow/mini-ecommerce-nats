import { OrderCreatedEvent, Publisher, Subjects } from "jndminiecomcommon";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject: Subjects = Subjects.OrderCreated;
}