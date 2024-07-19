# Payment Gateway API

This is a Node.js-based payment gateway API that integrates with Razorpay to handle payment creation, processing, status checks, and refunds. The API is containerized using Docker and automated with GitHub Actions CI/CD.

## Project Structure

```plaintext
PaymentGateway
├── config
│   ├── config.js
│   ├── swaggerConfig.js
├── models
│   └── paymentSchema.js
├── routes
│   └── paymentRoutes.js
├── services
│   └── paymentService.js
├── src
│   └── public
│       └── index.html
├── .github
│   └── workflows
│       └── ci-cd.yml
├── .gitignore
├── Dockerfile
├── app.js
├── db.js
├── logger.js
├── package.json
├── package-lock.json
├── server.js
└── swagger.json
```

### Features
- Create payment orders
- Process payments
- Check payment status
- Handle payment refunds
- Swagger API documentation
- Dockerized for easy deployment
- Automated CI/CD with GitHub Actions
### Prerequisites
- Node.js v20.x
- MongoDB
- Razorpay Account
- Docker
- GitHub Actions

## Installation
1. **Clone the repository**:

```bash
git clone <repository-url>
cd PaymentGateway
```


2. **Install dependencies**:


```bash

npm install
```
3. **Configure environment variables**:

- Create a config.js file in the config folder with the following content:

```javascript
export default {
  mongoURI: 'your_mongoDB_connection_string',
  razorpayKeyId: 'your_razorpay_key_id',
  razorpayKeySecret: 'your_razorpay_key_secret'
};
```
4. **Run the application**:

```bash
node server.js
```
## How It Works
- ***order_id*** is the genrated from mongoDB and ***razorpay_order_id*** is genrated by razor pay.
- **Run the Server**: Start by running the server.js file to launch the server.
- **Create an Order**: Use the Swagger API documentation available at /api-docs to create an order.
- **Copy the Razorpay Order ID**: When an order is created, the response will include a Razorpay order ID. Copy this ID.
- **Update index.html**: Paste the copied Razorpay order ID into the order_id field in index.html.
- **Make the HTML Live**: Host the index.html file live.
- **Initiate Payment**: Click the "Pay" button and use a test card (available from Razorpay) to complete the payment.
- **Check Payment Status**: To check the payment status, copy the order ID from the initial order creation response and use it with the status route in Swagger.
- **Process a Refund**: To process a refund, use the same order ID with the refund route in swagger

### API Endpoints
1. **Create Payment**
- Endpoint: /payments
- Method: POST
- Description: Creates a new payment order.

- Request Body:
```json

{
  "user_id": "user123",
  "amount": 1000,
  "amount_due": 1000
}
```
- Response:
```json

{
  "status": "success",
  "payment": {
    "_id": "payment_id",
    "user_id": "user123",
    "amount": 1000,
    "amount_due": 1000,
    "razorpay_order_id": "order_id",
    "status": "created"
  }
}
```
2. **Process Payment**
- Endpoint: /payments/{id}/process
- Method: POST
- Description: Processes a payment by its ID.
- Response:
```json

{
  "status": "success",
  "payment": {
    "_id": "payment_id",
    "user_id": "user123",
    "amount": 1000,
    "amount_due": 1000,
    "razorpay_order_id": "order_id",
    "status": "processed"
  }
}
```
3. **Get Payment Status**
- Endpoint: /payments/{id}/status
- Method: GET
- Description: Retrieves the status of a payment by its ID.
- Response:
```json

{
  "status": "success",
  "payment": {
    "_id": "order_id",
    "user_id": "user123",
    "amount": 1000,
    "amount_due": 0,
    "razorpay_order_id": "razorpay_order_id",
    "created_at":"date",
    "razorpay_payment_id":"razorpay_payment_id"
    "status": "processed"
  }
}
```
4. **Handle Refund**
- Endpoint: /payments/{id}/refund
- Method: POST
- Description: Handles a refund for a payment by its ID.
- Response:
```json
{
  "status": "success",
  "payment": {
    "_id": "payment_id",
    "user_id": "user123",
    "amount": 1000,
    "amount_due": 0,
    "razorpay_order_id": "order_id",
    "created_at":"date",
    "razorpay_payment_id":"razorpay_payment_id",
    "status": "refunded"
  }
}
```
### Running with Docker
- Build the Docker image:

```bash
docker build -t payment-gateway .
```
- Run the Docker container:

```bash
docker run -p 3000:3000 payment-gateway
```
### Automating with GitHub Actions
- Create a GitHub repository and push your project.

- Create a .github/workflows/ci-cd.yml file with the following content:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches:
      - main

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    - name: Checkout code
      uses: actions/checkout@v2

    - name: Set up Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '20'

    - name: Install dependencies
      run: npm install

    - name: Run tests
      run: npm test

    - name: Build Docker image
      run: docker build -t payment-gateway .

    - name: Log in to Docker Hub
      run: echo "${{ secrets.DOCKER_PASSWORD }}" | docker login -u "${{ secrets.DOCKER_USERNAME }}" --password-stdin

    - name: Push Docker image
      run: docker push ${{ secrets.DOCKER_USERNAME }}/payment-gateway:latest
```
- Configure GitHub secrets for DOCKER_USERNAME and DOCKER_PASSWORD in your repository settings.

## Usage
- Start the server:

```bash
node server.js
```
- Open the Swagger documentation at below to interact with the API.
```link
http://localhost:3000/api-docs 
```


- Use the index.html page to create an order and proceed with the payment using Razorpay.