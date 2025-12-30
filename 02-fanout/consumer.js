const amqp = require("amqplib")

async function start() {
    const connection = await amqp.connect("amqp://localhost")
    const channel = await connection.createChannel()

    const exchangeName = "exchange-fanout"
    await channel.assertExchange(exchangeName, "fanout", { durable: true })

    const assertQueue = await channel.assertQueue("", { exclusive: true })

    await channel.bindQueue(assertQueue.queue, exchangeName, "")

    function receiveMessage(msg) {
        console.log("Message:", msg.content.toString())
    }

    channel.consume(assertQueue.queue, receiveMessage, { noAck: true })
}

start()