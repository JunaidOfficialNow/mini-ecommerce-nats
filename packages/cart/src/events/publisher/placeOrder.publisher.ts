import { OrderPlacedEvent, Publisher, Subjects } from "jndminiecomcommon";

export class PlaceOrderPublisher  extends Publisher<OrderPlacedEvent> {
  readonly subject: Subjects = Subjects.OrderPlaced
}