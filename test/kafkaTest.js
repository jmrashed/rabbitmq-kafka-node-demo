const { sendKafkaMessage } = require('../services/producer/kafkaProducer');
const { startKafkaConsumer } = require('../services/consumer/kafkaConsumer');
const { connectKafkaProducer, disconnectKafkaProducer, connectKafkaConsumer, disconnectKafkaConsumer } = require('../config/kafka');

const TEST_TOPIC = 'test_topic';
const TEST_GROUP_ID = 'test-group';

async function runKafkaTest() {
  console.log('Starting Kafka test...');

  let receivedMessage = null;
  let consumerInstance = null;

  const messageHandler = async (message) => {
    receivedMessage = message;
    console.log(`Test consumer received: ${message}`);
  };

  try {
    // Ensure Kafka producer is connected
    await connectKafkaProducer();

    // Start consumer
    consumerInstance = await connectKafkaConsumer(TEST_GROUP_ID);
    await consumerInstance.subscribe({ topic: TEST_TOPIC, fromBeginning: true });
    
    const consumerRunPromise = new Promise(async (resolve) => {
      await consumerInstance.run({
        eachMessage: async ({ topic, partition, message }) => {
          const content = message.value.toString();
          console.log(`Test consumer received from Kafka topic '${topic}' (Partition: ${partition}, Offset: ${message.offset}): ${content}`);
          receivedMessage = content;
          resolve(); // Resolve after receiving one message
        },
      });
    });

    // Give consumer a moment to set up
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Send message
    const testMessage = 'Hello Kafka!';
    const testKey = 'testKey';
    await sendKafkaMessage(TEST_TOPIC, testMessage, testKey);

    // Wait for message to be consumed
    await consumerRunPromise; // Wait for the consumer to receive the message

    if (receivedMessage === testMessage) {
      console.log('Kafka test PASSED: Message delivered and consumed successfully.');
    } else {
      console.error('Kafka test FAILED: Message not delivered or consumed correctly.');
    }
  } catch (error) {
    console.error('Kafka test encountered an error:', error);
  } finally {
    await disconnectKafkaProducer();
    if (consumerInstance) {
      await disconnectKafkaConsumer(consumerInstance);
    }
    console.log('Kafka test finished.');
  }
}

runKafkaTest();