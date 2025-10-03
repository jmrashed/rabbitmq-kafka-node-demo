# Deployment Guide

## Quick Deploy Commands

### 1. Initial Setup
```bash
# Clone and setup
git clone https://github.com/jmrashed/rabbitmq-kafka-node-demo.git
cd rabbitmq-kafka-node-demo
node setup.js
```

### 2. Development
```bash
# Start development environment
npm run docker:up
npm run dev

# Test the application
node examples/send-rabbitmq.js
node examples/send-kafka.js
```

### 3. Production Deployment
```bash
# Build and deploy
docker-compose up -d --build

# Verify deployment
docker-compose ps
npm run docker:logs
```

### 4. Release Process
```bash
# Prepare release
npm run release 1.0.0

# Push to GitHub
git push origin main
git push origin v1.0.0
```

## Environment Variables

Create `.env` file with:
```
RABBITMQ_URL=amqp://localhost
KAFKA_BROKERS=localhost:9092
KAFKA_CLIENT_ID=rabbitmq-kafka-node-demo
```

## Service URLs

- **Application**: http://localhost:3000
- **RabbitMQ Management**: http://localhost:15672 (guest/guest)
- **Health Check**: http://localhost:3000/health (if implemented)

## Troubleshooting

### Port Conflicts
```bash
# Check port usage
netstat -an | findstr "3000\|5672\|9092\|15672\|2181"

# Kill processes if needed
taskkill /F /PID <process_id>
```

### Service Issues
```bash
# Restart services
docker-compose restart

# View logs
docker-compose logs -f <service_name>

# Clean restart
docker-compose down -v
docker-compose up -d
```