import { Message } from "node-nats-streaming";
import { Listener, ProductCreatedEvent, Subjects } from "jndminiecomcommon";
import { queueGroupName } from "../queueName";
import { Product } from "../../models/product";

export class ProductCreatedListener extends Listener<ProductCreatedEvent> {
  readonly subject: Subjects = Subjects.ProductCreated;
  queueGroupName: string = queueGroupName
  async onMessage(data: { name: string; price: number; isActive: boolean; }, msg: Message): Promise<void> {
    const { name, price, isActive } = data;
    try {
      await Product.create({ name, price, isActive });    
      msg.ack();  
    } catch (error) {
      console.log(error);
    }
      
  }
  
}