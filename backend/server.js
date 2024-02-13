// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a simple schema and model for Transactions
const transactionSchema = new mongoose.Schema({
  date: String,
  amount: Number,
  description: String,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// Route to get all transactions
app.get('/transactions', async (req, res) => {
  const transactions = await Transaction.find();
  res.json(transactions);
});

// Route to add a new transaction
app.post('/transactions', async (req, res) => {
  const newTransaction = new Transaction(req.body);
  await newTransaction.save();
  res.json(newTransaction);
});

app.delete('/transactions/:id', async (req, res) => {
    try {
      await Transaction.findByIdAndDelete(req.params.id);
      res.status(200).send('Transaction deleted');
    } catch (error) {
      res.status(500).send('Error deleting transaction');
    }
});

app.put('/transactions/:id', async (req, res) => {
    try {
      const updatedTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedTransaction);
    } catch (error) {
      res.status(500).send('Error updating transaction');
    }
});

// Start the server
const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server running on port ${port}`));
