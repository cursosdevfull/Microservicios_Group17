import { RabbitMQBootstrap } from "../bootstrap/rabbitmq";

export class RabbitMQConsumer {
    static async consumeMessage(consumer: (message: any) => void) {
        const channel = RabbitMQBootstrap.getConsumerChannel();

        const queue = RabbitMQBootstrap.getConsumerQueue();
        await channel.consume(queue.queue, consumer, { noAck: false });
    }
}