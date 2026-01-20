import amqp, { ChannelModel, Channel } from 'amqplib'
import { env } from "../../env";

export class RabbitMQBootstrap {
    private static connection: ChannelModel
    private static producerChannel: Channel
    private static consumerChannel: Channel
    private static consumerQueue: amqp.Replies.AssertQueue

    async initialize() {
        await this.connect()
        await this.setupChannels()
        await this.setupQueuesAndExchanges()
    }

    async connect() {
        const connection = await amqp.connect(env.RABBITMQ_URL)
        RabbitMQBootstrap.connection = connection
    }

    async setupChannels() {
        RabbitMQBootstrap.producerChannel = await RabbitMQBootstrap.connection.createChannel()
        RabbitMQBootstrap.consumerChannel = await RabbitMQBootstrap.connection.createChannel()
        RabbitMQBootstrap.consumerChannel.prefetch(env.RABBITMQ_PREFETCH)
    }

    async setupQueuesAndExchanges() {
        await RabbitMQBootstrap.producerChannel.assertExchange(env.RABBITMQ_EXCHANGE_NAME, env.RABBITMQ_EXCHANGE_TYPE, { durable: true })

        RabbitMQBootstrap.consumerQueue = await RabbitMQBootstrap.consumerChannel.assertQueue(env.RABBITMQ_QUEUE_APPOINTMENTS, { durable: true })
        await RabbitMQBootstrap.consumerChannel.bindQueue(env.RABBITMQ_QUEUE_APPOINTMENTS, env.RABBITMQ_EXCHANGE_NAME, 'appointment_routing_key')
    }

    static getProducerChannel(): Channel {
        return RabbitMQBootstrap.producerChannel
    }

    static getConsumerChannel(): Channel {
        return RabbitMQBootstrap.consumerChannel
    }

    static getConsumerQueue(): amqp.Replies.AssertQueue {
        return RabbitMQBootstrap.consumerQueue
    }


}