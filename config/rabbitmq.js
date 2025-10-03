const amqp = require('amqplib');
require('dotenv').config();

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';

let connection = null;
let channel = null;

async function connectRabbitMQ() {
  if (connection && channel) {
    return { connection, channel };
  }
  try {
    connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    console.log('Connected to RabbitMQ');
    return { connection, channel };
  } catch (error) {
    console.error('Failed to connect to RabbitMQ:', error);
    throw error;
  }
}

async function publishMessage(queueName, message, options = {}) {
  try {
    await connectRabbitMQ();
    // Assert queue with dead-letter exchange
    await channel.assertQueue(queueName, {
      durable: true,
      arguments: {
        'x-dead-letter-exchange': `${queueName}-dlx`,
        'x-dead-letter-routing-key': `${queueName}-dl`,
      },
    });
    channel.sendToQueue(queueName, Buffer.from(message), { persistent: true, ...options });
    console.log(`Message sent to queue ${queueName}: ${message}`);
  } catch (error) {
    console.error('Failed to publish message:', error);
    throw error;
  }
}

async function setupDeadLetterQueue(queueName) {
  try {
    await connectRabbitMQ();
    const dlxName = `${queueName}-dlx`;
    const dlQueueName = `${queueName}-dl`;

    await channel.assertExchange(dlxName, 'direct', { durable: true });
    await channel.assertQueue(dlQueueName, { durable: true });
    await channel.bindQueue(dlQueueName, dlxName, dlQueueName);
    console.log(`Dead-letter exchange '${dlxName}' and queue '${dlQueueName}' set up.`);
  } catch (error) {
    console.error('Failed to set up dead-letter queue:', error);
    throw error;
  }
}

async function closeRabbitMQ() {
  try {
    if (channel) {
      await channel.close();
    }
    if (connection) {
      await connection.close();
    }
    console.log('RabbitMQ connection closed.');
  } catch (error) {
    console.error('Failed to close RabbitMQ connection:', error);
  }
}

module.exports = {
  connectRabbitMQ,
  publishMessage,
  setupDeadLetterQueue,
  closeRabbitMQ,
};