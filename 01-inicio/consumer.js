const amqp = require("amqplib")

async function start() {
    const connection = await amqp.connect("amqp://localhost")
    const channel = await connection.createChannel()

    const queueName = "queue01"
    await channel.assertQueue(queueName, { durable: true })

    function receiveMessage(msg) {
        console.log(msg.content.toString())
    }

    channel.consume(queueName, receiveMessage, { noAck: true })
}

start()