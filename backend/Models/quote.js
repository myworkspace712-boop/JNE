import mongoose from 'mongoose';


const quoteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  product: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  status: { type: String, default: 'Pending' }, // Pending, Reviewed, Fulfilled
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Quote', quoteSchema);