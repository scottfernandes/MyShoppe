import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const body = await request.json();

    const { cartItems } = body; 
    console.log(cartItems);
    
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      throw new Error("Cart is empty or invalid");
    }

    const lineItems = cartItems.map((item) => {
      console.log(item.title,item.price,item.image,item.quantity);
      
      if (!item.title || !item.price || !item.quantity || !item.image) {
        throw new Error(`Invalid item data: ${JSON.stringify(item)}`);
      }
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.title,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100), // Convert price to cents
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    return new Response(JSON.stringify({ id: session.id }), { status: 200 });
  } catch (error) {
    console.error("Stripe API Error:", error.message);
    return new Response(
      JSON.stringify({ error: "Failed to create session", details: error.message }),
      { status: 500 }
    );
  }
}
