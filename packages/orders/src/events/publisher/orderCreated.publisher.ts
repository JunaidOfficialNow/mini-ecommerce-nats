import { Publisher } from "../../../../common/base-publisher";
import { OrderCreatedEvent } from "../../../../common/events/OrderPublishedEvent";
import { Subjects } from "../../../../common/subjects";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject: Subjects = Subjects.OrderCreated;
}