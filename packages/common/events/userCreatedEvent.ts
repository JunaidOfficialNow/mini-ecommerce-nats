import { Subjects } from "../subjects";

export interface UserCreatedEvent {
  subject: Subjects;
  data: {
    name: string;
    email: string;
  }
}