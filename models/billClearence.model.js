import mongoose from "mongoose";

const billClearenceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: String,
      required: true,
    },
    depositAmount: {
      type: String,
      required: true,
      default: 0,
    },
    dueAmount: {
      type: String,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const BillClearence = mongoose.model("BillClearence", billClearenceSchema);

export default BillClearence;
