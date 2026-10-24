import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  // Explicitly set to false by default
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: { type: String, required: false },
  verificationTokenExpires: { type: Date }
}, { timestamps: true });

const user = mongoose.model('User', userSchema);

export default user;