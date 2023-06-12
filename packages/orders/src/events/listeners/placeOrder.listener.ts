import { Message } from "node-nats-streaming"
import { OrderPlacedEvent } from "../../../../common/events/orderPlacedEvent"
import { Listener } from "../../../../common/nats-listner"
import { Subjects } from "../../../../common/subjects"
import { queueGroupName } from "../queneName"
import { Order } from "../../models/orders"
import { OrderCreatedPublisher } from "../publisher/orderCreated.publisher"
import { natsWrapper } from "../../nats-wrapper"

export class OrderPlacedListener extends Listener<OrderPlacedEvent> {
  readonly subject: Subjects = Subjects.OrderPlaced
  queueGroupName: string = queueGroupName;
  async onMessage(data: OrderPlacedEvent['data'], msg: Message): Promise<void> {
    let success = false;
    try {
      if (data.maxTimeToCreate < Date.now()) {
        data.created = true;
      }
     const order = await Order.create({userId: data.cart.userId, products: data.cart.products,totalAmount: 500, created: data.created});
     success = true;
    } catch (error) {
      console.log(error);
      
    } finally {
      msg.ack();
      // new OrderCreatedPublisher(natsWrapper.client).publish({success});
    }
  }

}