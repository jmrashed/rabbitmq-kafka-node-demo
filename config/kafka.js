const { Kafka } = require('kafkajs');
require('dotenv').config();

const KAFKA_BROKERS = process.env.KAFKA_BROKERS ? process.env.KAFKA_BROKERS.split(',') : ['localhost:9092'];
const CLIENT_ID = process.env.KAFKA_CLIENT_ID || 'rabbitmq-kafka-node-demo';

const kafka = new Kafka({
  clientId: CLIENT_ID,
  brokers: KAFKA_BROKERS,
});

const { Partitioners } = require('kafkajs');

const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });
const consumer = kafka.consumer({ groupId: 'default-group' });

async function connectKafkaProducer() {
  try {
    await producer.connect();
    console.log('Kafka producer connected.');
  } catch (error) {
    console.error('Failed to connect Kafka producer:', error);
    throw error;
  }
}

async function disconnectKafkaProducer() {
  try {
    await producer.disconnect();
    console.log('Kafka producer disconnected.');
  } catch (error) {
    console.error('Failed to disconnect Kafka producer:', error);
  }
}

async function connectKafkaConsumer(groupId = 'default-group') {
  try {
    const newConsumer = kafka.consumer({ groupId });
    await newConsumer.connect();
    console.log(`Kafka consumer connected for group: ${groupId}`);
    return newConsumer;
  } catch (error) {
    console.error('Failed to connect Kafka consumer:', error);
    throw error;
  }
}

async function disconnectKafkaConsumer(consumerInstance) {
  try {
    if (consumerInstance) {
      await consumerInstance.disconnect();
      console.log('Kafka consumer disconnected.');
    }
  } catch (error) {
    console.error('Failed to disconnect Kafka consumer:', error);
  }
}

module.exports = {
  kafka,
  producer,
  consumer,
  connectKafkaProducer,
  disconnectKafkaProducer,
  connectKafkaConsumer,
  disconnectKafkaConsumer,
};