import { Schema,model } from "mongoose";
const userSchema = new Schema({
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    firstName:String,
    lastName:String,
    resetPasswordOTP: Number,
    OTPepires: Date,
    password: {
      type: String,
      required: true,
    },
  });
  
  userSchema.index({ email: 1, username: 1 , unique: true });

  const User = model("User", userSchema);
  export default User;