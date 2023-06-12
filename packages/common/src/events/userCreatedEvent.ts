import { Subjects } from "../subjects";

export interface UserCreatedEvent {
  subject: Subjects;
  data: {
    _id: string;
    name: string;
    email: string;
  }
}