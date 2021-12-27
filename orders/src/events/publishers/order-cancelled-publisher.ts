import { Subjects, Publisher, OrderCancelledEvent } from '@ductam2943/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
