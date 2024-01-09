// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useContext} from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import Home from "./components/Home"; // Importuj AuthProvider
import CompanyForm from "./components/CompanyForm";
import InvoiceForm from "./components/InvoiceForm";
import CustomerForm from "./components/CustomerForm";
import {AuthProvider} from "./components/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import InvoiceDetail from "./components/InvoiceDetail";
import CustomerDetails from "./components/CustomerDetails";
import InvoiceList from "./components/InvoiceList";



const App = () => {

  return (
      <AuthProvider>
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/rejestracja" element={<Registration />} />
                <Route path="/home" element={<PrivateRoute><Home/></PrivateRoute>}  />
                <Route path="/create-company" element={<PrivateRoute><CompanyForm/></PrivateRoute>}  />
                <Route path="/create-invoice" element={<PrivateRoute><InvoiceForm /></PrivateRoute>} />
                <Route path="/create-customer" element={<PrivateRoute><CustomerForm /></PrivateRoute>} />
                <Route path="/invoices/:id" element={<PrivateRoute><InvoiceDetail /></PrivateRoute>} />
                <Route path="/customer/:login" element={<PrivateRoute><CustomerDetails /></PrivateRoute>} />
                <Route path="/invoices/" element={<PrivateRoute><InvoiceList></InvoiceList></PrivateRoute>} />
            {/* ... inne ścieżki i komponenty ... */}
            </Routes>
         </Router>
      </AuthProvider>
  );
};

export default App;
