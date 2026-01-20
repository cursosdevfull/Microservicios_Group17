import { DatabaseBootstrap, KafkaBootstrap } from "../../core/bootstrap";
import { AppointmentData } from "../application";
import { AppointmentPort } from "../ports";
import { env } from "../../env";

export class AppointmentAdapter implements AppointmentPort {
    async save(data: AppointmentData) {
        await this.saveToDatabase(data);
    }

    async receiveMessage(cb: (msg: string) => void) {
        const consumer = KafkaBootstrap.getConsumer();
        await consumer.subscribe({ topics: [env.KAFKA_TOPIC], fromBeginning: true })
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log(`Received message on topic: ${topic}, partition: ${partition}`);
                if (partition === 1) {
                    console.log(`Topic = ${topic}, Partition: ${partition}, Message: ${message.value?.toString() || ''} `)
                    cb(message.value?.toString() || '')
                } else {
                    console.log("Solo se procesan mensaje de la partición 1")
                }
            }
        })
    }

    private async saveToDatabase(data: AppointmentData) {
        const repository = DatabaseBootstrap.dataSource.getRepository(AppointmentData)
        await repository.save(data);
    }

    async sendKafka(id: number) {
        const producer = KafkaBootstrap.getProducer();
        await producer.send({
            topic: env.KAFKA_TOPIC_UPDATE,
            messages: [
                { key: "appointment", value: id.toString() }
            ]
        });
    }
}