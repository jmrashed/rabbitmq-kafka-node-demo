const { sendRabbitMQMessage } = require('../services/producer/rabbitmqProducer');
const { startRabbitMQConsumer } = require('../services/consumer/rabbitmqConsumer');
const { connectRabbitMQ, closeRabbitMQ } = require('../config/rabbitmq');

const TEST_QUEUE = 'test_queue';

async function runRabbitMQTest() {
  console.log('Starting RabbitMQ test...');

  let receivedMessage = null;

  const messageHandler = async (message) => {
    receivedMessage = message;
    console.log(`Test consumer received: ${message}`);
  };

  try {
    // Ensure RabbitMQ is connected before starting consumer
    await connectRabbitMQ();

    // Start consumer
    await startRabbitMQConsumer(TEST_QUEUE, messageHandler);

    // Give consumer a moment to set up
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Send message
    const testMessage = 'Hello RabbitMQ!';
    await sendRabbitMQMessage(TEST_QUEUE, testMessage);

    // Wait for message to be consumed
    await new Promise(resolve => setTimeout(resolve, 2000));

    if (receivedMessage === testMessage) {
      console.log('RabbitMQ test PASSED: Message delivered and consumed successfully.');
    } else {
      console.error('RabbitMQ test FAILED: Message not delivered or consumed correctly.');
    }
  } catch (error) {
    console.error('RabbitMQ test encountered an error:', error);
  } finally {
    await closeRabbitMQ();
    console.log('RabbitMQ test finished.');
  }
}

runRabbitMQTest();