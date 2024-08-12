import Queue, { Job } from "bull";
import { ExpirationCompletePublisher } from "../events/publishers/expiration-complete-publisher";
import { natsWrapper } from "../nats-wrapper";

interface Payload {
  orderId: string;
}

const expirationQueue = new Queue<Payload>("order:expiration", {
  redis: {
    host: process.env.REDIS_HOST,
    port: 6379,
  },
});

expirationQueue.process(async (job: Job) => {
  const { orderId } = job.data;

  new ExpirationCompletePublisher(natsWrapper.client).publish({ orderId });
});

export { expirationQueue };
