import { Publisher, OrderCreatedEvent, Subjects } from '@ductam2943/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
