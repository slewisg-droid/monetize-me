exports.handler = async () => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '',
    }),
  };
};
