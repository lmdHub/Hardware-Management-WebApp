import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    order_number: {
      type: String,
      required: true,
      unique: true, // ensures each order_number is unique
    },
    confirmationNumber: {
      type: String,
      required: true,
      unique: true, // ensures no duplicate confirmation numbers
    },
    hardware_serials: {
      type: [String], // array of serial numbers
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

export default mongoose.model("Order", orderSchema);
