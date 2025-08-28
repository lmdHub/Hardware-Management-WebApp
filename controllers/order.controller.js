import Order from "../Models/order.model.js";

// Helper to generate random alphanumeric strings
function generateRandomString(prefix, length = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}-${result}`;
}

// Controller to create a new order
export const createOrder = async (req, res) => {
  try {
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ error: "Quantity must be at least 1" });
    }

    // Generate order number
    const order_number = generateRandomString("ORD");

    // Generate confirmation number
    const confirmationNumber = generateRandomString("CONF");

    // Generate hardware serials
    const hardware_serials = [];
    for (let i = 0; i < quantity; i++) {
      hardware_serials.push(generateRandomString("SN"));
    }

    // Create and save order
    const newOrder = new Order({
      order_number,
      confirmationNumber,
      hardware_serials,
      quantity,
    });

    await newOrder.save();

    return res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
