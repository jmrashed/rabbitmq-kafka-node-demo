const express = require('express');
const bodyParser = require('body-parser');
const { sendRabbitMQMessage } = require('./producer/rabbitmqProducer');
const { sendKafkaMessage } = require('./producer/kafkaProducer');
const logger = require('../config/logger');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/produce', async (req, res) => {
  const { type, queue, topic, message, key } = req.body;

  if (!type || !message) {
    logger.warn('Producer received request with missing message type or content.');
    return res.status(400).send('Missing message type or content.');
  }

  try {
    if (type === 'rabbitmq') {
      if (!queue) {
        logger.warn('Producer received RabbitMQ request with missing queue name.');
        return res.status(400).send('Missing queue name for RabbitMQ message.');
      }
      await sendRabbitMQMessage(queue, message);
      logger.info('RabbitMQ message sent successfully.');
      res.status(200).send('RabbitMQ message sent.');
    } else if (type === 'kafka') {
      if (!topic) {
        logger.warn('Producer received Kafka request with missing topic name.');
        return res.status(400).send('Missing topic name for Kafka message.');
      }
      await sendKafkaMessage(topic, message, key);
      logger.info('Kafka message sent successfully.');
      res.status(200).send('Kafka message sent.');
    } else {
      logger.warn(`Producer received request with invalid message type: ${type}`);
      res.status(400).send('Invalid message type. Use "rabbitmq" or "kafka".');
    }
  } catch (error) {
    logger.error('Error in producer service:', error);
    res.status(500).send('Failed to send message.');
  }
});

app.listen(PORT, () => {
  logger.info(`Producer service listening on port ${PORT}`);
});