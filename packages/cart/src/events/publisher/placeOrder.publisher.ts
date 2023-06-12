import { Publisher } from "../../../../common/base-publisher";
import { OrderPlacedEvent } from "../../../../common/events/orderPlacedEvent";
import { Subjects } from "../../../../common/subjects";

export class PlaceOrderPublisher  extends Publisher<OrderPlacedEvent> {
  readonly subject: Subjects = Subjects.OrderPlaced
}