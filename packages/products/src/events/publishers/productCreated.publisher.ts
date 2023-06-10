import { Publisher } from "../../../../common/base-publisher";
import { ProductCreatedEvent } from "../../../../common/events/productCreatedEvent";
import { Subjects } from "../../../../common/subjects";

export class ProductCreatedPublisher extends Publisher<ProductCreatedEvent> {
  readonly subject: Subjects = Subjects.ProductCreated
}