import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 100
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    durationInMonths: {
        type: Number,
        required: true,
        min: 1
    },
    currency: {
        type: String,
        required: true,
        trim: true,
        enum: ['USD', 'EUR', 'GBP', 'JPY', 'CAD'],
        default: 'USD'
    },
    frequency: {
        type: String,
        required: true,
        trim: true,
        enum: ['Monthly', 'Yearly', 'Weekly'],
        default: 'Monthly'
    },
    category: {
        type: String,
        required: true,
        trim: true,
        enum: ['Basic', 'Standard', 'Premium'],
        default: 'Basic'
    },
    status: {
        type: String,
        required: true,
        trim: true,
        enum: ['Active', 'Inactive', 'Pending'],
        default: 'Active'
    },
    startDate: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return value >= new Date();
            },
            message: 'Start date must be today or in the future.'
        }
    },
    renewalDate: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return value > this.startDate;
            },
            message: 'Renewal date must be after the start date.'
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

// Auto populate renewalDate before save
subscriptionSchema.pre('save', function(next) {
    if (!this.renewalDate) {
        const renewalPeriod = {
            weekly: 7,
            monthly: 30,
            yearly: 365
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + (renewalPeriod[this.frequency.toLowerCase()] || 30));
    }
    next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
