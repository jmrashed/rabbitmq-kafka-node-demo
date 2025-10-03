const axios = require('axios');

const sendKafkaMessage = async () => {
  try {
    const response = await axios.post('http://localhost:3000/produce', {
      type: 'kafka',
      topic: 'task_logs',
      message: `Hello Kafka! Timestamp: ${new Date().toISOString()}`,
      key: `key-${Date.now()}`
    });
    console.log('✅ Kafka message sent:', response.data);
  } catch (error) {
    console.error('❌ Error sending Kafka message:', error.message);
  }
};

sendKafkaMessage();