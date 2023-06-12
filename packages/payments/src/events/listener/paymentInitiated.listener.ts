import { Message } from "node-nats-streaming";

import { queueGroupName } from "../queueName";
import { Payment } from "../../models/payments";
import { InitiatePaymentEvent, Listener, Subjects } from "jndminiecomcommon";

export class PaymentInitiatedListener extends Listener<InitiatePaymentEvent> {
   readonly subject: Subjects  = Subjects.InitiatePayment;
  queueGroupName: string = queueGroupName
   async  onMessage(data: { userId: string; amount: number; orderId: string; }, msg: Message): Promise<void> {
     try {
      const payment = await Payment.create({ userId: data.userId, amount: data.amount, orderId: data.orderId });
      msg.ack();
     } catch (error) {
      console.log(error);
      
     }
  }

}