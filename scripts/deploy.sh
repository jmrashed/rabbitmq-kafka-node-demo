#!/bin/bash

echo "🚀 Deploying RabbitMQ Kafka Node Demo..."

# Build and start services
docker-compose down
docker-compose build --no-cache
docker-compose up -d

# Wait for services to be healthy
echo "⏳ Waiting for services to be healthy..."
sleep 30

# Check service status
docker-compose ps

echo "✅ Deployment complete!"
echo "🌐 Application: http://localhost:3000"
echo "🐰 RabbitMQ Management: http://localhost:15672"