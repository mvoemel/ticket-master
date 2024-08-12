import {
  Subjects,
  Publisher,
  PaymentCreatedEvent,
} from "@mv-ticket-master/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
