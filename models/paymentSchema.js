// import mongoose from 'mongoose';
// const { Schema } = mongoose;

// const PaymentSchema = new Schema({
//   user_id: { type: String, required: true },
//   amount: { type: Number, required: true },
//   razorpay_order_id: { type: String, required: true },
//   razorpay_payment_id: { type: String },
//   status: { type: String, default: 'created' },
// });

// const Payment = mongoose.model('Payment', PaymentSchema);

// export default Payment;

import mongoose from 'mongoose';
const { Schema } = mongoose;

const PaymentSchema = new Schema({
  user_id: { type: String, required: true },
  amount: { type: Number, required: true },
  amount_due: { type: Number, required: true },
  razorpay_order_id: { type: String },
  razorpay_payment_id: { type: String },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'created' },
});

const Payment = mongoose.model('Payment', PaymentSchema);

export default Payment;

