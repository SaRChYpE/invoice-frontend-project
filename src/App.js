// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import Home from "./components/Home"; // Importuj AuthProvider
import CompanyForm from "./components/CompanyForm";
import InvoiceForm from "./components/InvoiceForm";
import CustomerForm from "./components/CustomerForm";

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/rejestracja" element={<Registration />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create-company" element={<CompanyForm />} />
          <Route path="/create-invoice" element={<InvoiceForm />} />
          <Route path="/create-customer" element={<CustomerForm />} />
          {/* ... inne ścieżki i komponenty ... */}
        </Routes>
      </Router>
  );
};

export default App;
