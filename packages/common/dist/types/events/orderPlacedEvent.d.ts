import { Subjects } from "../subjects";
export interface OrderPlacedEvent {
    subject: Subjects;
    data: {
        cart: {
            userId: string;
            products: Array<{
                productId: string;
                quantity: number;
            }>;
        };
        maxTimeToCreate: number;
        replyTo: Subjects;
        created: boolean;
    };
}
