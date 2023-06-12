import { InitiatePaymentEvent, Publisher, Subjects } from "jndminiecomcommon";

export class PaymentInitiatePublisher extends Publisher<InitiatePaymentEvent> {
  readonly subject: Subjects = Subjects.InitiatePayment;

}