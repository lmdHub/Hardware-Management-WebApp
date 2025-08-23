import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    confirmationNumber: {
        type: String,
        required: true,
        unique: true
    },
    items: [
        {
            inventoryItem: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Inventory",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }
        }
    ],
    orderedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["awaiting_shipment", "shipped", "in_transit", "delivered", "returned", "cancelled"],
        default: "awaiting_shipment"
    }
});

export default mongoose.model("Order", orderSchema);