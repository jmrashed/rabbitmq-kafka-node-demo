# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2024-01-XX

### Added
- Complete Docker Compose setup with RabbitMQ, Kafka, and Zookeeper
- REST API endpoints for message production
- Consumer services for both RabbitMQ and Kafka
- Example scripts for testing and load testing
- Comprehensive documentation and README
- GitHub Actions CI/CD pipeline
- Health checks for all services
- Logging with Winston
- Environment configuration with dotenv

### Features
- **Message Brokers**: RabbitMQ and Apache Kafka integration
- **REST API**: HTTP endpoints for message production
- **Docker Support**: Full containerization with docker-compose
- **Examples**: Ready-to-use demonstration scripts
- **Testing**: Automated test suite and load testing
- **Monitoring**: Service health checks and logging
- **CI/CD**: GitHub Actions workflow

### Technical Stack
- Node.js 18+
- Express.js for REST API
- RabbitMQ with amqplib
- Apache Kafka with kafkajs
- Docker & Docker Compose
- Winston for logging
- Axios for HTTP requests

### Project Structure
```
├── config/                 # Configuration files
├── services/              # Core services (producers/consumers)
├── examples/              # Example scripts
├── test/                  # Test files
├── scripts/               # Utility scripts
├── .github/workflows/     # CI/CD workflows
├── docker-compose.yml     # Docker services
├── Dockerfile            # App container
└── README.md             # Documentation
```