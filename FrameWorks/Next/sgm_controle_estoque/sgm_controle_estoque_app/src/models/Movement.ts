import mongoose from 'mongoose';

const MovementSchema = new mongoose.Schema({
  type: { type: String, enum: ['entry', 'exit'], required: true },
  qty: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default mongoose.models.Movement || mongoose.model('Movement', MovementSchema);
