import mongoose from "mongoose";
import Product from "./product.model.js";

const transactionSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    product: [Product.schema], // Use the product schema directly
    totalPrice: {
      type: String,
      required: true,
    },
    laborCharge: {
      type: String,
      default: 0,
    },
    depositAmount: {
      type: String,
      default: 0,
    },
    dueAmount: {
      type: String,
      required: true,
    },
    goldTaken: {
      type: String,
      default: 0,
    },
    goldPrice: {
      type: String,
      default: 0,
    },
    cgst: {
      type: String,
      default: 0,
    },
    sgst: {
      type: String,
      default: 0,
    },
    currentGoldPrice: {
      type: String,
      default: 0,
    },
    currentSilverPrice: {
      type: String,
      default: 0,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
