import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
    },
    adhaarNumber: {
      type: String,
    },
    dueAmount: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
