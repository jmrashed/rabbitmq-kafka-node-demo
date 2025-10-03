const { connectKafkaConsumer, disconnectKafkaConsumer } = require('../../config/kafka');
const logger = require('../../config/logger');

async function startKafkaConsumer(topic, messageHandler, groupId = 'default-group') {
  let consumerInstance;
  try {
    consumerInstance = await connectKafkaConsumer(groupId);
    await consumerInstance.subscribe({ topic, fromBeginning: true });

    await consumerInstance.run({
      eachMessage: async ({ topic, partition, message }) => {
        const content = message.value.toString();
        logger.info(`Consumer received message from Kafka topic '${topic}' (Partition: ${partition}, Offset: ${message.offset}): ${content}`);
        try {
          await messageHandler(content);
        } catch (error) {
          logger.error(`Error processing message from Kafka topic '${topic}':`, error);
          // Depending on the error, you might want to handle retries or dead-letter topics here.
        }
      },
    });
    logger.info(`Kafka consumer started for topic: ${topic}, group: ${groupId}`);
  } catch (error) {
    logger.error('Kafka Consumer failed to start:', error);
  } finally {
    // In a real application, you might not disconnect immediately
    // but manage it through a connection pool or keep it open for continuous consumption.
    // For this demo, we'll leave it open for the test.
    // await disconnectKafkaConsumer(consumerInstance);
  }
}

module.exports = {
  startKafkaConsumer,
};