const producerService = require('./services/producer-service');
const consumerService = require('./services/consumer-service');

// Start consumer services first to be ready for messages
consumerService.startConsumerServices();

// The producer service will be started via an HTTP server
// and can be triggered by external requests.
// For demonstration, you might manually trigger a message send
// or set up a simple script to do so.
console.log('Producer service is available via HTTP POST to /produce on port 3000.');
console.log('Example RabbitMQ message: curl -X POST -H "Content-Type: application/json" -d \'{"type": "rabbitmq", "queue": "task_queue", "message": "My RabbitMQ Task"}\' http://localhost:3000/produce');
console.log('Example Kafka message: curl -X POST -H "Content-Type: application/json" -d \'{"type": "kafka", "topic": "task_logs", "message": "My Kafka Log", "key": "log1"}\' http://localhost:3000/produce');