import { ProductCreatedEvent, Publisher, Subjects } from "jndminiecomcommon";

export class ProductCreatedPublisher extends Publisher<ProductCreatedEvent> {
  readonly subject: Subjects = Subjects.ProductCreated
}