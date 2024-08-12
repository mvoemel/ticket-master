import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
} from "@mv-ticket-master/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
