import {
  Listener,
  OrderCreatedEvent,
  Subjects,
} from "@mv-ticket-master/common";
import { Message } from "node-nats-streaming";
import { QUEUE_GROUP_NAME } from "./queue-group-name";
import { expirationQueue } from "../../queues/expiration-queue";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;

  queueGroupName = QUEUE_GROUP_NAME;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log(`Order ${data.id} will expire in ${delay} milliseconds.`);

    await expirationQueue.add({ orderId: data.id }, { delay });

    msg.ack();
  }
}
