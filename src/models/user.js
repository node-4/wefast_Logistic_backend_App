const mongoose = require('mongoose');
const OtpSchema = require('./schemas/otp.js');
const mongoosePaginate = require("mongoose-paginate");
const mongooseAggregatePaginate = require("mongoose-aggregate-paginate");
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
      default: "",
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
    refferalCode: { type: String, },
    refferUserId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    joinUser: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    delivery_for_business: {
      type: Boolean,
    },
    goods_type: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "good_type",
    },
    location: {
      type: {
        type: String,
        default: "Point"
      },
      coordinates: {
        type: [Number],
        default: [0, 0]
      },
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

UserSchema.plugin(mongoosePaginate);
UserSchema.plugin(mongooseAggregatePaginate);
// Create and export the Mongoose model for the User collection
module.exports = {
  UserModel: mongoose.model("user", UserSchema)
};
