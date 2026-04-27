import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    password: { type: String, required: true, select: false },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    image: { type: String, required: true, trim: true },

    country: { type: String, trim: true },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    emailVerificationCodeHash: {
      type: String,
      select: false,
      default: null,
    },

    emailVerificationExpires: {
      type: Date,
      default: null,
    },
    
    passwordResetCodeHash: {
  type: String,
  select: false,
  default: null,
},

passwordResetExpires: {
  type: Date,
  default: null,
},
 
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

export default User;
