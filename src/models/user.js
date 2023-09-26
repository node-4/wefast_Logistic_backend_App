const mongoose = require('mongoose');
const OtpSchema = require('./schemas/otp.js');

// Define the schema for the User collection
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    phone_number: {
      type: String,
      unique: true,
    },
    country_code: {
      type: String,
      default: "+91",
    },
    email: {
      type: String,
    },
    profile_image: {
      type: String,
    },
    signup_process_complete: {
      type: Boolean,
      default: "false",
    },
    otp: {
      type: OtpSchema,
      select: false,
    },
    delivery_prefrences_completed: {
      type: Boolean,
      default: false,
    },
    delivery_for_business: {
      type: Boolean,
    },
    goods_type: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "good_type",
    },
    deliveries_per_week: {
      type: new mongoose.Schema(
        {
          lower: {
            type: Number,
          },
          upper: {
            type: Number,
          },
        },
        { _id: false }
      ),
    },
    device_token: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { versionKey: false },
    toObject: { versionKey: false },
  }
);

// Create and export the Mongoose model for the User collection
module.exports = {
  UserModel: mongoose.model("user", UserSchema)
};
