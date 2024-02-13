import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null); // Used for editing

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch('http://localhost:5001/transactions');
      if (response.ok) {
        const transactions = await response.json();
        setRecentTransactions(transactions.slice(0, 3));
      }
    };
    fetchTransactions();
  }, []);

  const navigate = useNavigate();

  // Define redirectToTransactions
  const redirectToTransactions = () => {
    navigate('/transactions');
  };

  const handleDelete = async (transactionId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this transaction?");
    if (confirmDelete) {
      await fetch(`http://localhost:5001/transactions/${transactionId}`, { method: 'DELETE' });
      setRecentTransactions(recentTransactions.filter(t => t._id !== transactionId));
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
  };

  const handleUpdateTransaction = async (e) => {
    e.preventDefault();
    if (editingTransaction) {
      const response = await fetch(`http://localhost:5001/transactions/${editingTransaction._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingTransaction),
      });
      if (response.ok) {
        const updatedTransaction = await response.json();
        setRecentTransactions(
          recentTransactions.map(t => t._id === editingTransaction._id ? updatedTransaction : t)
        );
        setEditingTransaction(null); // Reset editing state
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingTransaction({ ...editingTransaction, [name]: value });
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <div>Total Balance: ${balance}</div>
      <div>Total Income: ${income}</div>
      <div>Total Expenses: ${expenses}</div>
  
      <h3>Recent Transactions</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {recentTransactions.map(transaction => (
            <tr key={transaction._id}>
              <td>{transaction.date}</td>
              <td>${transaction.amount}</td>
              <td>{transaction.description}</td>
              <td>
                <button onClick={() => handleEdit(transaction)}>Edit</button>
                <button onClick={() => handleDelete(transaction._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  
      <button onClick={redirectToTransactions}>Add +</button>
  
      {/* Conditional rendering for editing form */}
      {editingTransaction && (
        <form onSubmit={handleUpdateTransaction}>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            name="date"
            id="date"
            value={editingTransaction.date}
            onChange={handleInputChange}
            required
          />
  
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            name="amount"
            id="amount"
            value={editingTransaction.amount}
            onChange={handleInputChange}
            required
          />
  
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="description"
            id="description"
            value={editingTransaction.description}
            onChange={handleInputChange}
            required
          />
  
          <button type="submit">Update Transaction</button>
        </form>
      )}
    </div>
  );
}

export default Dashboard;