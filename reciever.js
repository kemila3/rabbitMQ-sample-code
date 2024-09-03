const amqplib = require("amqplib");

const queueName = "Hello";

const recieveMessage = async () => {
  const connection = await amqplib.connect("amqp://localhost");
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName, { durable: false });
  console.log("Listeninig...");
  channel.consume(queueName, msg => {
    console.log("Message recieved : ", msg.content.toString());
  }, {noAck:true});
};

recieveMessage()
