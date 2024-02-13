// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Investments from './components/Investments';
import Reports from './components/Reports';
import Settings from './components/Settings';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes> {/* Updated from Switch to Routes */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/investments" element={<Investments />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}
export default App;
