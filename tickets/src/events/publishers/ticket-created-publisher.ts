import { Publisher, Subjects, TicketCreatedEvent } from '@ductam2943/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
