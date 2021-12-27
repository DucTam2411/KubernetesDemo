import { Subjects, Publisher, PaymentCreatedEvent } from '@ductam2943/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
