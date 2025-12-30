const amqp = require("amqplib")

async function start() {
    const connection = await amqp.connect("amqp://localhost")
    const channel = await connection.createChannel()

    const exchangeNameDlq = "exchange-direct-dlq"
    await channel.assertExchange(exchangeNameDlq, "direct", { durable: true })

    const queueName = "queueDlq"
    await channel.assertQueue(queueName)
    await channel.bindQueue(queueName, exchangeNameDlq, "")

    function receiveMessage(msg) {
        console.log("Message Dlq", msg.content.toString())
        channel.ack(msg)
    }

    channel.consume(queueName, receiveMessage, { noAck: false })
}


start()
