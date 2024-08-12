import {
  Subjects,
  Listener,
  PaymentCreatedEvent,
} from "@mv-ticket-master/common";
import { QUEUE_GROUP_NAME } from "./queue-group-name";
import { Order, OrderStatus } from "../../models/order";
import { Message } from "node-nats-streaming";

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  readonly subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
  queueGroupName = QUEUE_GROUP_NAME;

  async onMessage(data: PaymentCreatedEvent["data"], msg: Message) {
    const order = await Order.findById(data.orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    order.set({ status: OrderStatus.COMPLETE });

    // Keep in mind that when updating the order, the version number is incremented.
    // Normally, you should publish another event so that other services know about the change.
    // But because we do not expect any updates to the order after it has been complete, we will leave it at that.
    await order.save();

    msg.ack();
  }
}
