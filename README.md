# Payment Service

## Overview

Pulse-pay is an api that allows users to receive payments

## Documentation

- [View Documentation](https://documenter.getpostman.com/view/36363144/2sB2cRC47S)

## Features

- receive payments via bank transfer

## Prerequisites

- [Node.js](https://nodejs.org/) (v22.14.0)
- [Mongodb](https://www.mongodb.com/)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Esavwede/pulse-pay.git
   cd payment-service
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and configure the required variables:

   ```env
   # FLUTTERWAVE
   FLW_PUBLIC_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   FLW_SECRET_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

   # DATABASE
   DB_URI=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```

4. Build:

```bash
npm run build
```

or

```bash
npm run build-and-run #to run prettier formatting, eslint, ts building and start server immediately
```

4. Start the service in development mode:

```bash
npm run dev
```

5. Start the service:

```bash
npm start
```

## Usage

- Access the API documentation at `http://localhost:3000/docs`.
- Use the provided endpoints to process payments, manage transactions, and more.

## Testing

Run the test suite to ensure everything is working as expected:

```bash
npm test
```

## Endpoints

# Payments API Documentation

## Endpoint

**Initiate Payment**
**URL:** `http://localhost:3000/api/v1/payments`

**Method:** `POST`

**Content-Type:** `application/json`

---

## Request

### Request Body

The endpoint requires a JSON payload with the following fields:

| Field  | Type   | Required | Description                                                       |
| ------ | ------ | -------- | ----------------------------------------------------------------- |
| email  | string | Yes      | The email address of the user making the payment.                 |
| amount | number | Yes      | The amount to be charged (in cents or smallest unit of currency). |
| name   | string | Yes      | The name of the user making the payment.                          |

### Example Request

```json
{
  "email": "user@gmail.com",
  "amount": 900000,
  "name": "name"
}
```

---

## Response

### Success Response

If the request is successful, the API returns a response with payment authorization details.

**Response Structure:**

| Field                       | Type   | Description                                                                          |
| --------------------------- | ------ | ------------------------------------------------------------------------------------ |
| response.status             | string | Status of the request (e.g., `success`).                                             |
| response.message            | string | A message indicating the result (e.g., `Charge initiated`).                          |
| response.meta.authorization | object | Authorization details for the transaction.                                           |
| response.meta.txRef         | string | Unique reference generated for the transaction ( must use to retrieve paymentstatus) |

### Example Success Response

- **200 Charge Initiated**  
  Returned when payment details ( bank name, bank account ) are generated for user to receive payment in a specified timeframe
  **Response Format:**

```json
{
  "response": {
    "status": "success",
    "message": "Charge initiated",
    "meta": {
      "authorization": {
        "transfer_reference": "MockFLWRef-1742820067481",
        "transfer_account": "0067100155",
        "transfer_bank": "Mock Bank",
        "account_expiration": "2025-03-24 1:41:07 PM",
        "transfer_note": "Mock note",
        "transfer_amount": "900000.00",
        "mode": "banktransfer"
      },
      "txRef": "5ec7fc95-e3c6-4545-9e87-f67ea11b3eef"
    }
  }
}
```

---

#### Error Responses

- **404 Not Found**  
  Returned when route not found
  **Response Format:**

  ```json
  {
    "success": false,
    "message": "requested resource not found"
  }
  ```

- **400 Bad Request**  
  Returned when the request contains invalid data or parameters.  
  **Response Format:**

  ```json
  {
    "success": false,
    "errors": ["error"]
  }
  ```

  - **500 Not Found**  
    returned when server encounters an error
    **Response Format:**

  ```json
  {
    "success": false,
    "message": "server error"
  }
  ```

### Status Codes

- **200 OK**: The request was successful, and the response contains the expected data.
- **400 Bad Request**: Bad request received from client
- **500 Internal Server Error**: The server encountered an unexpected condition that prevented it from fulfilling the request.

---

---

### 2. Retrieve Payment Status

**URL:** `http://localhost:3000/api/v1/payments/{txRef}`

**Method:** `GET`

**Path Parameter:**

| Parameter | Type   | Required | Description                                          |
| --------- | ------ | -------- | ---------------------------------------------------- |
| id        | string | Yes      | The transaction reference generated from transaction |

#### Example Request

```
GET http://localhost:3000/api/v1/payments/PAY-8466725
```

#### Success Response

If the request is successful, the API returns the payment details.

##### Response Structure

| Field                           | Type   | Description                                 |
| ------------------------------- | ------ | ------------------------------------------- |
| message                         | string | General response message.                   |
| response.status                 | string | Status of the request (e.g., `success`).    |
| response.message                | string | Message indicating the result.              |
| response.payment.id             | string | Unique payment ID.                          |
| response.payment.customer_name  | string | Name of the customer.                       |
| response.payment.customer_email | string | Email of the customer.                      |
| response.payment.amount         | number | Amount paid.                                |
| response.payment.status         | string | Status of the payment (e.g., `successful`). |

##### Example Success Response

```json
{
  "message": "payment status",
  "response": {
    "payment": {
      "id": "PAY-8466725",
      "customer_name": "name ",
      "customer_email": "user@gmail.com",
      "amount": 9000,
      "status": "successful"
    },
    "status": "success",
    "message": "Payment details retrieved successfully."
  }
}
```

#### Error Responses

- **404 Not Found**  
  Returned when no transaction is found for the provided ID.  
  **Response Format:**

  ```json
  {
    "success": false,
    "message": "No transaction was found for this id"
  }
  ```

- **400 Bad Request**  
  Returned when the request contains invalid data or parameters.  
  **Response Format:**

  ```json
  {
    "success": false,
    "errors": ["error"]
  }
  ```

  - **500 Not Found**  
    returned when server encounters an error
    **Response Format:**

  ```json
  {
    "success": false,
    "message": "server error"
  }
  ```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with a detailed description of your changes.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For questions or support, please contact [ogaga@ogaga.tech].
