import express from 'express';
import Stripe from 'stripe';
import { verifyToken } from '../middleware/auth.js';
import Payment from '../models/Payment.js';
import axios from 'axios';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// STRIPE: Criar Sessão de Checkout
router.post('/stripe/create-checkout-session', verifyToken, async (req, res) => {
  try {
    const { amount, productName } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: productName || 'Startup Tank Service',
            },
            unit_amount: amount * 100, // em centavos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
      metadata: {
        userId: req.user.id,
      },
    });

    // Salvar registro inicial
    await Payment.create({
      userId: req.user.id,
      amount,
      provider: 'stripe',
      transactionId: session.id,
      status: 'pending'
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe Error:', error);
    res.status(500).json({ message: 'Erro ao iniciar pagamento com Stripe' });
  }
});

// PAGSEGURO: Criar Checkout (Exemplo simplificado via Checkout Transparente ou Direcionamento)
router.post('/pagseguro/create-payment', verifyToken, async (req, res) => {
  try {
    const { amount, productName } = req.body;

    // Nota: Para PagSeguro real, você precisaria da integração com a API v3 ou v2.
    // Aqui usaremos um exemplo de estrutura para a API v3 (Direct Payment / Web Checkout)
    const pagSeguroEmail = process.env.PAGSEGURO_EMAIL;
    const pagSeguroToken = process.env.PAGSEGURO_TOKEN;
    const isSandbox = process.env.NODE_ENV !== 'production';
    
    const baseUrl = isSandbox 
      ? 'https://ws.sandbox.pagseguro.uol.com.br' 
      : 'https://ws.pagseguro.uol.com.br';

    // Criação do registro de pagamento
    const paymentRecord = await Payment.create({
      userId: req.user.id,
      amount,
      provider: 'pagseguro',
      status: 'pending'
    });

    // Mock PagSeguro Checkout URL generation
    const mockCheckoutUrl = isSandbox 
      ? `https://sandbox.pagseguro.uol.com.br/v2/checkout/payment.html?code=MOCK_CODE_${paymentRecord._id}`
      : `https://pagseguro.uol.com.br/v2/checkout/payment.html?code=REAL_CODE_${paymentRecord._id}`;

    res.json({ 
      message: 'Integração PagSeguro simulada com sucesso', 
      paymentId: paymentRecord._id,
      checkoutUrl: mockCheckoutUrl,
      sandbox_warning: isSandbox ? 'Modo Sandbox ativado (MOCK)' : ''
    });
  } catch (error) {
    console.error('PagSeguro Error:', error);
    res.status(500).json({ message: 'Erro ao iniciar pagamento com PagSeguro' });
  }
});

// WEBHOOK: PagSeguro
router.post('/webhook/pagseguro', async (req, res) => {
  try {
    const { notificationCode, notificationType } = req.body;
    
    // In a real scenario, you would query PagSeguro API with `notificationCode`
    // to get the transaction details including the Status and Reference (Payment ID).
    
    // For mock purposes:
    console.log('PagSeguro Webhook received:', notificationCode);
    
    // Fake status update
    // await Payment.findOneAndUpdate({ _id: paymentId }, { status: 'succeeded' });

    res.status(200).send('OK');
  } catch (error) {
    console.error('Webhook Error:', error);
    res.status(500).send('Webhook fail');
  }
});

// WEBHOOK: Stripe
router.post('/webhook/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    await Payment.findOneAndUpdate(
      { transactionId: session.id },
      { status: 'succeeded' }
    );
  }

  res.json({ received: true });
});

export default router;
