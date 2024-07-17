// import express from 'express';
// import * as paymentService from '../services/paymentService.js';

// const PaymentRouter = express.Router();

// /**
//  * @swagger
//  * /payments:
//  *   post:
//  *     summary: Create a payment
//  *     description: Creates a new payment order
//  *     parameters:
//  *       - in: body
//  *         name: body
//  *         required: true
//  *         schema:
//  *           type: object
//  *           properties:
//  *             user_id:
//  *               type: string
//  *             amount:
//  *               type: number
//  *             amount_due:
//  *               type: number
//  *     responses:
//  *       201:
//  *         description: Payment created successfully
//  *       500:
//  *         description: Server error
//  */
// PaymentRouter.route('/')
//   .post(async (req, res) => {
//     console.log('Request Body:', req.body);
//     const { user_id, amount, amount_due } = req.body;
  
//     try {
//       const payment = await paymentService.createPayment(user_id, amount, amount_due);
//       res.status(201).json(payment);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });

// /**
//  * @swagger
//  * /payments/{id}/process:
//  *   post:
//  *     summary: Process a payment
//  *     description: Processes a payment by its ID
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         type: string
//  *     responses:
//  *       200:
//  *         description: Payment processed successfully
//  *       500:
//  *         description: Server error
//  */
// PaymentRouter.route('/:id/process')
//   .post(async (req, res) => {
//     const { id } = req.params;
//     try {
//       const payment = await paymentService.processPayment(id);
//       res.status(200).json(payment);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });

// /**
//  * @swagger
//  * /payments/{id}/status:
//  *   get:
//  *     summary: Retrieve payment status
//  *     description: Retrieves the status of a payment by its ID
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         type: string
//  *     responses:
//  *       200:
//  *         description: Payment status retrieved successfully
//  *       500:
//  *         description: Server error
//  */
// PaymentRouter.route('/:id/status')
//   .get(async (req, res) => {
//     const { id } = req.params;
//     try {
//       const payment = await paymentService.getPaymentStatus(id);
//       res.status(200).json(payment);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });

// /**
//  * @swagger
//  * /payments/{id}/refund:
//  *   post:
//  *     summary: Handle a refund
//  *     description: Handles a refund for a payment by its ID
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         type: string
//  *     responses:
//  *       200:
//  *         description: Refund processed successfully
//  *       500:
//  *         description: Server error
//  */
// PaymentRouter.route('/:id/refund')
//   .post(async (req, res) => {
//     const { id } = req.params;
//     try {
//       const refund = await paymentService.handleRefund(id);
//       res.status(200).json(refund);
//     } catch (error) {
//       console.error('Error handling refund:', error); // Log the full error object
//       res.status(500).json({ message: error.message });
//     }
//   });

// export default PaymentRouter;
// import express from 'express';
// import * as paymentService from '../services/paymentService.js';

import express from 'express';
import * as paymentService from '../services/paymentService.js';

const PaymentRouter = express.Router();

/**
 * @openapi
 * /payments:
 *   post:
 *     summary: Create a payment
 *     description: Creates a new payment order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       201:
 *         description: Payment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       500:
 *         description: Server error
 */
PaymentRouter.post('/', async (req, res) => {
  const { user_id, amount, amount_due } = req.body;
  try {
    const payment = await paymentService.createPayment(user_id, amount, amount_due);
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @openapi
 * /payments/{id}/process:
 *   post:
 *     summary: Process a payment
 *     description: Processes a payment by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       500:
 *         description: Server error
 */
PaymentRouter.post('/:id/process', async (req, res) => {
  const { id } = req.params;
  try {
    const payment = await paymentService.processPayment(id);
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @openapi
 * /payments/{id}/status:
 *   get:
 *     summary: Retrieve payment status
 *     description: Retrieves the status of a payment by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       500:
 *         description: Server error
 */
PaymentRouter.get('/:id/status', async (req, res) => {
  const { id } = req.params;
  try {
    const payment = await paymentService.getPaymentStatus(id);
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @openapi
 * /payments/{id}/refund:
 *   post:
 *     summary: Handle a refund
 *     description: Handles a refund for a payment by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Refund processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       500:
 *         description: Server error
 */
PaymentRouter.post('/:id/refund', async (req, res) => {
  const { id } = req.params;
  try {
    const refund = await paymentService.handleRefund(id);
    res.status(200).json(refund);
  } catch (error) {
    console.error('Error handling refund:', error); // Log the full error object
    res.status(500).json({ message: error.message });
  }
});

export default PaymentRouter;
