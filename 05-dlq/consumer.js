const amqp = require("amqplib")
const args = process.argv.slice(2)

async function start() {
    const connection = await amqp.connect("amqp://localhost")
    const channel = await connection.createChannel()

    const exchangeName = "exchange-direct"
    await channel.assertExchange(exchangeName, "direct", { durable: true })

    const exchangeNameDlq = "exchange-direct-dlq"
    await channel.assertExchange(exchangeNameDlq, "direct", { durable: true })

    const routingKey = args.length > 0 ? args[0] : "key"

    const assertQueue = await channel.assertQueue("", {
        exclusive: true,
        deadLetterExchange: exchangeNameDlq,
        deadLetterRoutingKey: ""
    })
    channel.bindQueue(assertQueue.queue, exchangeName, routingKey)

    function receiveMessage(msg) {
        const message = msg.content.toString()
        console.log("Message received", message)

        if (message === "hola") {
            channel.ack(msg, true)
        } else {
            channel.reject(msg, false)
        }
    }

    channel.consume(assertQueue.queue, receiveMessage, { noAck: false })
}

start()