import Razorpay from 'razorpay';
import Payment from '../models/paymentSchema.js';
import config from '../config/config.js';

const razorpay = new Razorpay({
  key_id: config.razorpayKeyId,
  key_secret: config.razorpayKeySecret,
});

export const createPayment = async (user_id, amount, amount_due) => {
  try {
    const options = {
      amount: amount * 100,
      currency: 'INR',
    };
    const order = await razorpay.orders.create(options);

    const payment = new Payment({
      user_id,
      amount,
      amount_due,
      razorpay_order_id: order.id,
    });
    await payment.save();
    return payment;
  } catch (error) {
    console.error('Error creating payment:', error); // Log the error
    throw new Error('Payment creation failed');
  }
};

export const processPayment = async (id) => {
  try {
    const payment = await Payment.findById(id);
    // Process the payment logic here
    return payment;
  } catch (error) {
    console.error('Error processing payment:', error); // Log the error
    throw new Error('Payment processing failed');
  }
};

export const getPaymentStatus = async (id) => {
  try {
    const payment = await Payment.findById(id);
    return payment;
  } catch (error) {
    console.error('Error getting payment status:', error); // Log the error
    throw new Error('Failed to get payment status');
  }
};

export const handleRefund = async (id) => {
  try {
    const payment = await Payment.findById(id);
    if (!payment) {
      throw new Error('Payment not found');
    }

    // Process the refund through Razorpay
    const refund = await razorpay.payments.refund(payment.razorpay_payment_id, {
      amount: payment.amount * 100,
    });

    // Update the payment status in the database
    const updatedPayment = await Payment.findByIdAndUpdate(
      id,
      { status: 'refunded' },
      { new: true }
    );

    return updatedPayment;
  } catch (error) {
    console.error('Error in handleRefund:', error); // Log the full error object
    throw error;
  }
};
