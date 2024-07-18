import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import crypto from 'crypto';
import config from './config/config.js';
import Payment from './models/paymentSchema.js';
import specs from './config/swaggerConfig.js';
import app from './src/app.js';
// import paymentRoutes from './routes/paymentRoutes.js';


const PORT = process.env.PORT || 3000;


// Connect to MongoDB
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error(err));

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/', (req, res) => {
    res.send('Welcome to the Payment Gateway API-3');
  });


// Routes
app.post('/verify-payment', async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        console.log('Received data:', req.body);
        const hmac = crypto.createHmac('sha256', config.razorpayKeySecret);
        hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
        const generated_signature = hmac.digest('hex');
        console.log('Generated signature:', generated_signature);
        console.log('Razorpay signature:', razorpay_signature);

        if (generated_signature === razorpay_signature) {
            try {
                const payment = await Payment.findOneAndUpdate(
                    { razorpay_order_id },
                    { razorpay_payment_id, status: 'processed', amount_due: 0, amount_paid: 0 },
                    { new: true }
                );
                if (!payment) {
                    return res.status(404).json({ status: 'failure', message: 'Payment not found' });
                }
                console.log('Payment document updated:', payment);
                res.json({ status: 'success', message: 'Payment verified and updated successfully', payment });
            } catch (error) {
                console.error('Database update failed:', error);
                res.status(500).json({ status: 'failure', message: 'Database update failed', error: error.message });
            }
        } else {
            console.error('Payment verification failed: signatures do not match');
            res.status(400).json({ status: 'failure', message: 'Payment verification failed' });
        }
    } catch (error) {
        console.error('Error in /verify-payment:', error);
        res.status(500).json({ status: 'failure', message: 'Internal server error', error: error.message });
    }
});

// Listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
