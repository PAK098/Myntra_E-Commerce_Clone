const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.payment = async (req, res) => {
  const { userEmail, finalPayment, items } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.title,
          },
          unit_amount: Math.round(
            item.price * (1 - item.discountPercentage / 100) * 100
          ), // amount in paise
        },
        quantity: 1,
      })),
      mode: "payment",
      customer_email: userEmail,
      success_url: "http://localhost:8080/bag",
      cancel_url: "http://localhost:8080/bag",
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Error creating payment session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
