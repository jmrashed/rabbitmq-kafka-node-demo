const axios = require('axios');

const runLoadTest = async (messageCount = 10) => {
  console.log(`🚀 Starting load test with ${messageCount} messages...`);
  
  const promises = [];
  
  for (let i = 0; i < messageCount; i++) {
    // Send RabbitMQ message
    promises.push(
      axios.post('http://localhost:3000/produce', {
        type: 'rabbitmq',
        queue: 'task_queue',
        message: `RabbitMQ Load Test Message #${i + 1}`
      })
    );
    
    // Send Kafka message
    promises.push(
      axios.post('http://localhost:3000/produce', {
        type: 'kafka',
        topic: 'task_logs',
        message: `Kafka Load Test Message #${i + 1}`,
        key: `load-test-${i + 1}`
      })
    );
  }
  
  try {
    await Promise.all(promises);
    console.log(`✅ Load test completed! Sent ${messageCount * 2} messages total.`);
  } catch (error) {
    console.error('❌ Load test failed:', error.message);
  }
};

const messageCount = process.argv[2] ? parseInt(process.argv[2]) : 10;
runLoadTest(messageCount);