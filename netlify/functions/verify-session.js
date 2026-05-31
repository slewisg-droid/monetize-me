const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { session_id } = event.queryStringParameters || {};

  if (!session_id) {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ valid: false, error: 'No session ID provided' }),
    };
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ['subscription'],
    });

    const valid =
      session.payment_status === 'paid' ||
      (session.subscription && session.subscription.status === 'active') ||
      (session.subscription && session.subscription.status === 'trialing');

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        valid,
        customer_email: session.customer_details?.email || '',
        customer_name: session.customer_details?.name || '',
        subscription_id: session.subscription?.id || '',
      }),
    };
  } catch (err) {
    console.error('Verify error:', err);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ valid: false, error: err.message }),
    };
  }
};
