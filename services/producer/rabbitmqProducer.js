const { publishMessage, closeRabbitMQ } = require('../../config/rabbitmq');
const logger = require('../../config/logger');

async function sendRabbitMQMessage(queueName, message) {
  try {
    await publishMessage(queueName, message);
    logger.info(`Producer sent message to RabbitMQ queue '${queueName}': ${message}`);
  } catch (error) {
    logger.error('RabbitMQ Producer failed to send message:', error);
  } finally {
    // In a real application, you might not close the connection immediately
    // but manage it through a connection pool or keep it open for continuous publishing.
    // For this demo, we'll close it after each send for simplicity.
    // await closeRabbitMQ();
  }
}

module.exports = {
  sendRabbitMQMessage,
};