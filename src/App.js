// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
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
import CustomerList from "./components/CustomerList";
import WelcomePage from "./components/WelcomePage";



const App = () => {

  return (
      <AuthProvider>
        <Router>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/home" element={<PrivateRoute><Home markdown={'test'}/></PrivateRoute>}  />
                <Route path="/create-company" element={<PrivateRoute><CompanyForm/></PrivateRoute>}  />
                <Route path="/create-invoice" element={<PrivateRoute><InvoiceForm /></PrivateRoute>} />
                <Route path="/create-customer" element={<PrivateRoute><CustomerForm /></PrivateRoute>} />
                <Route path="/invoices/:id" element={<PrivateRoute><InvoiceDetail /></PrivateRoute>} />
                <Route path="/customer/:id" element={<PrivateRoute><CustomerDetails /></PrivateRoute>} />
                <Route path="/invoices" element={<PrivateRoute><InvoiceList></InvoiceList></PrivateRoute>} />
                <Route path="/customers" element={<PrivateRoute><CustomerList></CustomerList></PrivateRoute>} />
            </Routes>
         </Router>
      </AuthProvider>
  );
};

export default App;
