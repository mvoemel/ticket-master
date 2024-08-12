import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@mv-ticket-master/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
