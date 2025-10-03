const { execSync } = require('child_process');

console.log('🚀 Setting up RabbitMQ Kafka Node Demo...\n');

const steps = [
  {
    name: 'Install dependencies',
    command: 'npm install',
    description: 'Installing Node.js dependencies...'
  },
  {
    name: 'Start Docker services',
    command: 'docker-compose up -d',
    description: 'Starting RabbitMQ, Kafka, and application...'
  },
  {
    name: 'Wait for services',
    command: 'timeout /t 30 /nobreak',
    description: 'Waiting for services to be ready...'
  }
];

try {
  for (const step of steps) {
    console.log(`📋 ${step.description}`);
    execSync(step.command, { stdio: 'inherit' });
    console.log(`✅ ${step.name} completed\n`);
  }

  console.log('🎉 Setup completed successfully!\n');
  console.log('🌐 Application: http://localhost:3000');
  console.log('🐰 RabbitMQ Management: http://localhost:15672 (guest/guest)');
  console.log('\n📚 Try the examples:');
  console.log('  node examples/send-rabbitmq.js');
  console.log('  node examples/send-kafka.js');
  console.log('  node examples/load-test.js');

} catch (error) {
  console.error('❌ Setup failed:', error.message);
  process.exit(1);
}