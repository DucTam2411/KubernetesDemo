import { Publisher, Subjects, TicketUpdatedEvent } from '@ductam2943/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
