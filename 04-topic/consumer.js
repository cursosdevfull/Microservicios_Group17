const amqp = require("amqplib")
const args = process.argv.slice(2)

async function start() {
    const connection = await amqp.connect("amqp://localhost")
    const channel = await connection.createChannel()

    const exchangeName = "exchange-topic"
    await channel.assertExchange(exchangeName, "topic", { durable: true })

    const routingKey = args.length > 0 ? args[0] : "key"

    const assertQueue = await channel.assertQueue("", { exclusive: true })

    await channel.bindQueue(assertQueue.queue, exchangeName, routingKey)

    function receiveMessage(msg) {
        console.log("Message received", msg.content.toString())
    }

    channel.consume(assertQueue.queue, receiveMessage, { noAck: false })
}

start()