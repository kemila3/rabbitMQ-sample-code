const amqplib = require("amqplib");

const queueName = "Hello";
const msg = "Hello 1";

const sendMessage = async () => {
  const connection = await amqplib.connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName, { durable: false });
  channel.sendToQueue(queueName, Buffer.from(msg));
  console.log("msg sent", msg);
  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
};

sendMessage();
