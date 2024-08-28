import express from "express";
const router = express.Router();
import {
  getAllTransactions,
  // getTransactionByAadhar,
  addTransaction,
  editTransaction,
  deleteTransaction,
  getTransactionById,
  getTransactionByPhone,
  getCustomerDetails,
  editCustomerDueAmount,
  getBillClearenceByContactNumber,
  getAllBillClearence,
} from "../controller/transaction.controllers.js";

router.post("/create", addTransaction);
router.get("/", getAllTransactions);
router.get("/billClearence", getAllBillClearence);
router.get("/phone/:contactNumber", getTransactionByPhone);
router.get("/:contactNumber", getBillClearenceByContactNumber);
router.get("/one/:id", getTransactionById);
router.post("/edit/:id", editTransaction);
router.get("/delete/:id", deleteTransaction);
router.get("/customer/:contactNumber", getCustomerDetails);
router.post("/customer/dueAmount/:contactNumber", editCustomerDueAmount);

export default router;
