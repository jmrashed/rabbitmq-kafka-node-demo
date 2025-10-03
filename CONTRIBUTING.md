Thank you for considering contributing to rabbitmq-kafka-node-demo!

Getting started

1. Fork the repository.
2. Clone your fork:

   git clone https://github.com/<your-username>/rabbitmq-kafka-node-demo.git

3. Install dependencies:

   npm install

Project structure

- `produce.js`, `consume.js` - simple producer/consumer scripts
- `services/` - organized producer/consumer services
- `config/` - connection configs for RabbitMQ and Kafka
- `test/` - small node scripts for manual testing

Running locally

- RabbitMQ and Kafka can be started using the provided Docker Compose in `docker/docker-compose.yml`.
- Start the services:

  docker-compose -f docker/docker-compose.yml up -d

- Run producers/consumers from node while Docker services are running.

Development workflow

- Create a topic branch for each feature or fix using the pattern `feat/` or `fix/`.
- Open a pull request against `main` and include a clear description and testing notes.
- Keep changes small and focused.

Testing

- There are small test scripts in `test/` for manual verification. Add automated tests when adding features.

Code style

- Use modern JavaScript (ES2018+) and follow existing project style.

Security

- If you discover a security vulnerability, please follow the instructions in `SECURITY.md`.

Thank you for contributing! We appreciate clear, well-documented PRs and tests.
