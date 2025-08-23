import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['laptop', 'desktop', 'headset', 'mouse', 'keyboard', 'monitor', 'printer', 'other'],
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    serialNumber: {
        type: String,
        unique: true,
        required: true
    },
    purchaseDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ['available', 'assigned', 'maintenance', 'retired'],
        default: 'available'
    },
    assignedTo: {
        type: String
    },
    notes: {
        type: String
    }
}, { timestamps: true });

const Inventory = mongoose.model('Inventory', inventorySchema);

export default Inventory;