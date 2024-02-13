import React, { useState, useEffect } from 'react';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({ date: '', amount: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      const response = await fetch('http://localhost:5001/transactions');
      if (response.ok) {
        const fetchedTransactions = await response.json();
        setTransactions(fetchedTransactions);
      }
    };
    fetchTransactions();
  }, []);

  const addOrUpdateTransaction = async (e) => {
    e.preventDefault();
    const endpoint = editingId ? `http://localhost:5001/transactions/${editingId}` : 'http://localhost:5001/transactions';
    const method = editingId ? 'PUT' : 'POST';

    const response = await fetch(endpoint, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTransaction),
    });

    if (response.ok) {
      const transactionData = await response.json();
      if (editingId) {
        setTransactions(transactions.map(t => t._id === editingId ? transactionData : t));
        setEditingId(null);
      } else {
        setTransactions([...transactions, transactionData]);
      }
      setNewTransaction({ date: '', amount: '', description: '' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({ ...newTransaction, [name]: value });
  };

  const handleEdit = (transaction) => {
    setEditingId(transaction._id);
    setNewTransaction({ date: transaction.date, amount: transaction.amount, description: transaction.description });
  };

  const handleDelete = async (transactionId) => {
    // Show a confirmation dialog
    const confirmDelete = window.confirm("Are you sure you want to delete this transaction?");
    if (confirmDelete) {
      const response = await fetch(`http://localhost:5001/transactions/${transactionId}`, { method: 'DELETE' });
      if (response.ok) {
        setTransactions(transactions.filter(t => t._id !== transactionId));
      }
    }
  };


  return (
    <div>
      <h2>Transactions</h2>
      <form onSubmit={addOrUpdateTransaction}>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          name="date"
          value={newTransaction.date}
          onChange={handleInputChange}
          required
        />
        
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          name="amount"
          value={newTransaction.amount}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="description">Description:</label>
        <input
          type="text"
          name="description"
          value={newTransaction.description}
          onChange={handleInputChange}
          required
        />

        <button type="submit">{editingId ? 'Update' : 'Add'} Transaction</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>Date (year-month-day)</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
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
    </div>
  );
}

export default Transactions;
