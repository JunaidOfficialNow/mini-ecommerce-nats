export * from './subjects';
export * from './events/OrderPublishedEvent';
export * from './events/intiatePaymentEvent';
export * from './events/orderPlacedEvent';
export * from './events/paymentSuccessfullEvent';
export * from './events/productCreatedEvent';
export * from './events/userCreatedEvent';
export * from './nats-listner';
export * from './base-publisher';
export * from './middlewares';
export * from './errors/errors';
export type payloadUser = {
    user?: any;
    isAdmin: boolean;
};
declare global {
    namespace Express {
        interface Request {
            user?: payloadUser;
        }
    }
}
