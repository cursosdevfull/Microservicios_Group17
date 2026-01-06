const { kafka } = require("./client")
const groupId = process.argv[2]

async function start() {
    const consumer = kafka.consumer({ groupId })
    await consumer.connect()

    await consumer.subscribe({ topics: ["updates-client"], fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            if (partition === 1) {
                console.log(`GroupId = ${groupId}, Topic = ${topic}, Partition: ${partition}, Message: ${message.value.toString()} `)
            } else {
                console.log("Solo se procesan mensaje de la partición 1")
            }
        }
    })
}

start()