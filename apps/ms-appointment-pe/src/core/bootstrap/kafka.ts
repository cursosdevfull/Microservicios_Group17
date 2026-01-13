import { env } from "../../../env";
import { Consumer, Kafka, Producer } from "kafkajs"

interface KafkaTopic {
    name: string;
    partitions: number
}

export class KafkaBootstrap {
    private static kafka: Kafka
    private static producer: Producer
    private static consumer: Consumer

    async initialize() {
        await this.connect()
        return "Kafka connected successfully"
    }

    async connect() {
        return new Promise(async (resolve, reject) => {
            try {
                KafkaBootstrap.kafka = new Kafka({
                    clientId: env.KAFKA_CLIENT_ID,
                    brokers: [env.KAFKA_BROKER]
                })
                await KafkaBootstrap.connectProducer()
                await KafkaBootstrap.connectConsumer()
                resolve("Kafka connected successfully")
            } catch (error) {
                reject(error)
            }
        })
    }

    private static async createTopics(...topicList: KafkaTopic[]) {
        const topics = topicList.map(topic => ({
            topic: topic.name,
            numPartitions: topic.partitions,
            replicationFactor: 1
        }))

        const admin = KafkaBootstrap.kafka.admin()
        await admin.connect()
        const topicExists = await admin.listTopics()
        const topicsToCreate = topics.filter(topic => !topicExists.includes(topic.topic))

        await admin.createTopics({
            topics: topicsToCreate
        })

        await admin.disconnect()
    }

    private static async connectProducer() {
        await this.createTopics({ name: env.KAFKA_TOPIC, partitions: 3 }, { name: env.KAFKA_TOPIC_UPDATE, partitions: 1 })

        if (this.producer) return this.producer

        this.producer = KafkaBootstrap.kafka.producer()
        await this.producer.connect()
        return this.producer
    }

    private static async connectConsumer() {
        if (this.consumer) return this.consumer

        this.consumer = KafkaBootstrap.kafka.consumer({ groupId: env.KAFKA_GROUP_ID })
        await this.consumer.connect()
        return this.consumer
    }

    static getProducer() {
        return this.producer
    }

    static getConsumer() {
        return this.consumer
    }


}
