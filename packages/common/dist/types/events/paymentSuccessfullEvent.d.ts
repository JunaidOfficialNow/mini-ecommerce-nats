import { Subjects } from "../subjects";
export interface PaymentSuccesfullEvent {
    subject: Subjects;
    data: {
        orderId: string;
    };
}
