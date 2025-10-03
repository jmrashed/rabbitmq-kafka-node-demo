const { producer, connectKafkaProducer, disconnectKafkaProducer } = require('../../config/kafka');
const logger = require('../../config/logger');

async function sendKafkaMessage(topic, message, key = null) {
  try {
    await connectKafkaProducer();
    await producer.send({
      topic,
      messages: [
        {
          key: key,
          value: message,
        },
      ],
    });
    logger.info(`Producer sent message to Kafka topic '${topic}': ${message} (Key: ${key})`);
  } catch (error) {
    logger.error('Kafka Producer failed to send message:', error);
  } finally {
    // In a real application, you might not close the connection immediately
    // but manage it through a connection pool or keep it open for continuous publishing.
    // For this demo, we'll close it after each send for simplicity.
    // await disconnectKafkaProducer();
  }
}

module.exports = {
  sendKafkaMessage,
};