const { connectRabbitMQ, setupDeadLetterQueue } = require('../../config/rabbitmq');
const logger = require('../../config/logger');

async function startRabbitMQConsumer(queueName, messageHandler) {
  try {
    const { channel } = await connectRabbitMQ();
    await setupDeadLetterQueue(queueName); // Setup DLQ for this queue
    await channel.assertQueue(queueName, {
      durable: true,
      arguments: {
        'x-dead-letter-exchange': `${queueName}-dlx`,
        'x-dead-letter-routing-key': `${queueName}-dl`,
      },
    });
    await channel.consume(queueName, async (msg) => {
      if (msg !== null) {
        const content = msg.content.toString();
        logger.info(`Consumer received message from RabbitMQ queue '${queueName}': ${content}`);
        try {
          await messageHandler(content);
          channel.ack(msg);
        } catch (error) {
          logger.error(`Error processing message from queue '${queueName}':`, error);
          // Nack with requeue: false to send to DLQ
          channel.nack(msg, false, false);
        }
      }
    }, { noAck: false });

    // Also consume from the dead-letter queue for logging/monitoring
    const dlQueueName = `${queueName}-dl`;
    await channel.consume(dlQueueName, (msg) => {
      if (msg !== null) {
        const content = msg.content.toString();
        logger.warn(`Dead-letter queue '${dlQueueName}' received message: ${content}`);
        channel.ack(msg); // Acknowledge DLQ message
      }
    }, { noAck: false });

    logger.info(`RabbitMQ consumer started for queue: ${queueName} and DLQ: ${dlQueueName}`);
  } catch (error) {
    logger.error('RabbitMQ Consumer failed to start:', error);
  }
}

module.exports = {
  startRabbitMQConsumer,
};