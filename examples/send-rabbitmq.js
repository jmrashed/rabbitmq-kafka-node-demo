const axios = require('axios');

const sendRabbitMQMessage = async () => {
  try {
    const response = await axios.post('http://localhost:3000/produce', {
      type: 'rabbitmq',
      queue: 'task_queue',
      message: `Hello RabbitMQ! Timestamp: ${new Date().toISOString()}`
    });
    console.log('✅ RabbitMQ message sent:', response.data);
  } catch (error) {
    console.error('❌ Error sending RabbitMQ message:', error.message);
  }
};

sendRabbitMQMessage();