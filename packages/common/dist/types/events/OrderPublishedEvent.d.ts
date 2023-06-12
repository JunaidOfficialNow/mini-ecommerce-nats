import { Subjects } from "../subjects";
export interface OrderCreatedEvent {
    subject: Subjects;
    data: {
        success: boolean;
    };
}
