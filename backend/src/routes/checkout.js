const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET || '');
const { auth } = require('../middlewares/auth');

router.post('/create-checkout-session', auth, async (req,res)=>{
  const { items } = req.body;
  // Create a simple Stripe Checkout Session (line-items mapping left simple)
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map(it => ({ price_data: { currency: 'usd', product_data: { name: it.product.title || 'Item' }, unit_amount: Math.round((it.price||0)*100) }, quantity: it.quantity })),
    mode: 'payment',
    success_url: req.body.successUrl || 'http://localhost:3000/checkout/success',
    cancel_url: req.body.cancelUrl || 'http://localhost:3000/checkout/cancel'
  });
  res.json({ url: session.url, id: session.id });
});

router.post('/webhook', express.raw({ type: 'application/json' }), async (req,res)=>{
  // stripe webhook handling - in production verify signature
  res.json({ received: true });
});

module.exports = router;
