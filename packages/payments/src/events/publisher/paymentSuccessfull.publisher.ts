import { PaymentSuccesfullEvent, Publisher, Subjects } from "jndminiecomcommon";

export class PaymentSuccessfulPublisher extends Publisher<PaymentSuccesfullEvent> {
  subject: Subjects = Subjects.PaymentSuccessful;

}