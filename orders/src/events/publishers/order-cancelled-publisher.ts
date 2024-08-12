import {
  Publisher,
  OrderCancelledEvent,
  Subjects,
} from "@mv-ticket-master/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
