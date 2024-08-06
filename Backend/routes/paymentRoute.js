import express from 'express';
import Stripe from 'stripe';
import User from '../models/userModel.js';


const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', async (req, res) => {
    const { tokenId, amount, userId } = req.body;

    if (typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({
            success: false,
            message: 'Invalid amount provided.'
        });
    }

    try {
        const charge = await stripe.charges.create({
            amount: amount * 100,
            currency: 'usd',
            description: 'Recipe Points Purchase',
            source: tokenId,
        });

        let pointsToAdd=0;
        if (amount === 100) {
            pointsToAdd = 1000;
        } else if (amount === 300) {
            pointsToAdd = 3000;
        } else if (amount === 500) {
            pointsToAdd = 5000;
        }
        const updatedResult = await User.findByIdAndUpdate({_id:userId}, { $inc: { points: pointsToAdd } }, { new: true });
       const {points}=updatedResult
        res.status(200).json({ message: 'Payment successful and points updated.',points });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Payment failed.', error });
    }
});

export default router;
