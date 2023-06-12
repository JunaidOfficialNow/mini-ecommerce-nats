import { Subjects } from "../subjects";
export interface InitiatePaymentEvent {
    subject: Subjects;
    data: {
        userId: string;
        amount: number;
        orderId: string;
    };
}
