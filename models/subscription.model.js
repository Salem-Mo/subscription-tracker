import mongoose from 'mongoose';
const subscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Subscription name is required"],
        trim: true,
        minLength: [3, "Subscription name must be at least 3 characters long"],
        maxLength: [50, "Subscription name must be at most 50 characters long"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price must be a positive number"]
    },
    currency: {
        type: String,
        required: [true, "Currency is required"],
        trim: true,
        uppercase: true,
        enum: ['USD', 'EUR', 'GBP', 'EGP'] ,
        default: 'USD'
    },
    frequency: {
        type: String,
        required: [true, "Frequency is required"],
        enum: ['daily', 'weekly', 'monthly', 'yearly'], 
        default: 'monthly'
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        trim: true,
        enum: ['sport', 'entertainment', 'education', 'health', 'technology', 'basic'], 
        default: 'basic'
    },
    paymentMethod: {
        type: String,
        required: [true, "Payment method is required"],
        enum: ['credit_card', 'paypal', 'bank_transfer'], 
        default: 'credit_card'
    },
    status: {
        type: String,
        required: [true, "Status is required"],
        enum: ['active', 'cancelled', 'expired', 'pending'], 
        default: 'active'
    },
    startDate: {
        type: Date,
        required: [true, "Start date is required"],
        validate: {
            validator: function(v) {
                return v <= new Date();
            },
            message: props => `Start date ${props.value} cannot be in the future!`
        },
        default: new Date()
    },
    renewalDate: {
        type: Date,
        validate: {
            validator: function(v) {
                return v > this.startDate;
            },
            message: props => `Renewal date ${props.value} must be after the start date!`
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User ID is required"],
        index: true
    },
}, {
    timestamps: true
});

subscriptionSchema.pre('save', function(next) {
    if(!this.renewalDate) {
        const frequencyMap = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + frequencyMap[this.frequency]);
    }
    if(this.renewalDate < new Date()) {
        this.status = 'expired';
    }
    next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;

