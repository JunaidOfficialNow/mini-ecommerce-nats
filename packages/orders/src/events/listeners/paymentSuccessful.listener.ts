import { Message } from "node-nats-streaming";
import { queueGroupName } from "../queneName";
import { Order } from "../../models/orders";
import { Listener, PaymentSuccesfullEvent, Subjects } from "jndminiecomcommon";

export class PaymentSuccessfulListener extends Listener<PaymentSuccesfullEvent>  {
  subject: Subjects = Subjects.PaymentSuccessful
  queueGroupName: string = queueGroupName
  async onMessage(data: { orderId: string; }, msg: Message): Promise<void> {
    try {
      const order = await Order.findOne({orderId: data.orderId});
      if (order && order.paid) {
        order.paid = true;
      }
      order?.save();
      msg.ack();
    } catch (error) {
      console.log(error);
    }
  }
  

}