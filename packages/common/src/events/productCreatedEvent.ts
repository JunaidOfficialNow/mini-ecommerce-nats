import { Subjects } from "../subjects";

export interface ProductCreatedEvent {
  subject: Subjects;
  data: {
    name: string,
    price: number,
    isActive: boolean,
  }
}