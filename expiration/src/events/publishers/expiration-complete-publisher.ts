import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@mv-ticket-master/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
