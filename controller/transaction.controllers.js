import Customer from "../models/customer.model.js";
import Transaction from "../models/transaction.model.js";
import Product from "../models/product.model.js";
import BillClearence from "../models/billClearence.model.js";

export const addTransaction = async (req, res) => {
  console.log(req.body);
  try {
    const {
      product,
      fullName,
      contactNumber,
      email,
      totalPrice,
      laborCharge,
      depositAmount,
      dueAmount,
      adhaarNumber,
      goldTaken,
      goldPrice,
      cgst,
      sgst,
      currentGoldPrice,
      currentSilverPrice,
    } = req.body;

    console.log(req.body);
    // Check if the customer exists by contact number
    let existingCustomer = await Customer.findOne({
      contactNumber: contactNumber,
    });

    // If customer does not exist, create a new customer
    if (!existingCustomer) {
      // Create a new customer instance
      existingCustomer = new Customer({
        fullName,
        contactNumber,
        email,
        adhaarNumber,
        dueAmount,
      });

      // Save the new customer
      existingCustomer = await existingCustomer.save();
    } else {
      // If customer exists, update the dueAmount
      existingCustomer.dueAmount = (
        parseFloat(existingCustomer.dueAmount) + parseFloat(dueAmount)
      ).toString();
      await existingCustomer.save();
    }

    // Create product documents
    const createdProducts = await Product.insertMany(product);

    // Extract product IDs
    const productIds = createdProducts.map((product) => product._id);

    // Create an array of product objects to be saved in the transaction
    const productsArray = createdProducts.map((product, index) => ({
      _id: productIds[index], // Use the created product's ID
      productName: product.productName,
      productPrice: product.productPrice,
      productWeight: product.productWeight,
      productType: product.productType,
    }));

    // Create a new transaction instance
    const newTransaction = new Transaction({
      customerId: existingCustomer._id, // Use the customer's model ID
      product: productsArray, // Use the modified product structure
      totalPrice,
      laborCharge,
      depositAmount,
      dueAmount,
      goldTaken,
      cgst,
      sgst,
      goldPrice,
      currentGoldPrice,
      currentSilverPrice,
    });

    // Save the transaction to the database
    const savedTransaction = await newTransaction.save();
    res
      .status(201)
      .json({ transaction: savedTransaction, customer: existingCustomer });
  } catch (error) {
    console.log("error in addTransaction controller", error);
    res.status(500).json({ message: error.message }); // Handle errors
  }
};

export const editTransaction = async (req, res) => {
  res.send("edit transaction");
};

export const getBillClearenceByContactNumber = async (req, res) => {
  try {
    const { contactNumber } = req.params;
    const billClearence = await BillClearence.find({ contactNumber });

    if (billClearence.length === 0) {
      return res
        .status(404)
        .json({ error: "Bill clearance transaction not found" });
    }

    return res.status(200).json(billClearence);
  } catch (error) {
    console.error("error in getBillClearenceByContactNumber", error);
    return res.status(500).json({ message: error.message });
  }
};

export const getAllTransactions = async (req, res) => {
  try {
    // Fetch all transactions from the database, sorted by createdAt field in descending order
    const transactions = await Transaction.find()
      .sort({ createdAt: -1 })
      .populate("customerId");

    res.status(200).json(transactions); // Send the transactions in the response
  } catch (error) {
    console.error("error in getAllTransaction controller", error);
    res.status(500).json({ message: error.message }); // Handle errors
  }
};

export const getAllBillClearence = async (req, res) => {
  try {
    const billClearence = await BillClearence.find().sort({ createdAt: -1 });
    res.status(200).json(billClearence);
  } catch (error) {
    console.error("error in getAllBillClearence controller", error);
    res.status(500).json({ message: error.message }); // Handle errors
  }
};

// export const getTransactionByAadhar = async (req, res) => {
//   try {
//     const { aadharNumber } = req.params;

//     // Find the customer by Aadhar number to get their ObjectId
//     const customer = await Customer.findOne({ aadharNumber });

//     if (!customer) {
//       return res.status(404).json({ error: "Customer not found" });
//     }

//     // Find transactions associated with the customer's ObjectId
//     const transactions = await Transaction.find({ customerId: customer._id });

//     res.status(200).json(transactions);
//   } catch (error) {
//     console.error("error in getTransactionById  aadhar", error);
//     res.status(500).json({ message: error.message }); // Handle errors
//   }
// };

export const getTransactionByPhone = async (req, res) => {
  try {
    const { contactNumber } = req.params;

    // Find the customer by Aadhar number to get their ObjectId
    const customer = await Customer.find({ contactNumber });

    if (customer.length === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }

    // Find transactions associated with the customer's ObjectId
    const transactions = await Transaction.find({ customerId: customer._id });

    res.status(200).json(transactions);
  } catch (error) {
    console.error("error in getTransactionById  aadhar", error);
    res.status(500).json({ message: error.message }); // Handle errors
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params; // Extract the transaction ID from the request parameters

    // Find the transaction by ID and delete it
    const deletedTransaction = await Transaction.findByIdAndDelete(id);

    if (!deletedTransaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction deleted successfully" }); // Send success message
  } catch (error) {
    console.error("Error in delete transaction:", error);
    res.status(500).json({ error: "Internal server error" }); // Handle server errors
  }
};

export const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params; // Extract the transaction ID from the request parameters

    // Find the transaction by ID and delete it
    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.status(200).json(transaction); // Send success message
  } catch (error) {
    console.error("Error in get transaction by transaction id:", error);
    res.status(500).json({ error: "Internal server error" }); // Handle server errors
  }
};

export const getCustomerDetails = async (req, res) => {
  try {
    const { contactNumber } = req.params;
    console.log("hello" + contactNumber);

    const customer = await Customer.findOne({ contactNumber });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ customer });
  } catch (error) {
    console.error("Error in getting customer details", error);
    res.status(500).json({ message: error.message });
  }
};

export const editCustomerDueAmount = async (req, res) => {
  try {
    const { contactNumber } = req.params;
    const { newDueAmount, depositAmount, dueAmount, name } = req.body;

    const customer = await Customer.findOne({ contactNumber });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    // Update the due amount
    customer.dueAmount = newDueAmount;
    const updatedCustomer = await customer.save();

    // Add a document to BillClearence collection
    const billClearence = new BillClearence({
      name: name, // Use customer.name or name from req.body if appropriate
      contactNumber: contactNumber,
      depositAmount: depositAmount || 0, // Use depositAmount from req.body or default to 0
      dueAmount: newDueAmount,
    });

    await billClearence.save();

    res.status(200).json({ customer: updatedCustomer });
  } catch (error) {
    console.error("Error in updating due amount", error);
    res.status(500).json({ message: error.message });
  }
};
