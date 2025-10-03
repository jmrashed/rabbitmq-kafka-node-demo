const { startRabbitMQConsumer } = require('./consumer/rabbitmqConsumer');
const { startKafkaConsumer } = require('./consumer/kafkaConsumer');
const logger = require('../config/logger');

const RABBITMQ_QUEUE = 'task_queue';
const KAFKA_TOPIC = 'task_logs';
const KAFKA_GROUP_ID = 'task-log-group';

async function handleRabbitMQMessage(message) {
  logger.info(`Processing RabbitMQ task: ${message}`);
  // Simulate some async work
  await new Promise(resolve => setTimeout(resolve, 1000));
  logger.info(`Finished processing RabbitMQ task: ${message}`);
}

async function handleKafkaMessage(message) {
  logger.info(`Logging Kafka message: ${message}`);
  // Simulate some analytics or logging work
  await new Promise(resolve => setTimeout(resolve, 500));
  logger.info(`Finished logging Kafka message: ${message}`);
}

async function startConsumerServices() {
  logger.info('Starting consumer services...');
  await startRabbitMQConsumer(RABBITMQ_QUEUE, handleRabbitMQMessage);
  await startKafkaConsumer(KAFKA_TOPIC, handleKafkaMessage, KAFKA_GROUP_ID);
}

startConsumerServices();