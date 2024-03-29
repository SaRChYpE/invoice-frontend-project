// CustomerForm.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './styles.css';

const CustomerForm = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');
  const [formData, setFormData] = useState({
    nip: '',
    address: {
      name: '',
      city: '',
      zipCode: '',
      street: '',
      buildingNumber: '',
      email: '',
      phone: '',
    },
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [name]: value,
      },
    });
  };

  const handleFormSubmit = async () => {
  try {
    if (!formData.nip || !formData.address.name || !formData.address.city || !formData.address.zipCode || !formData.address.street || !formData.address.buildingNumber || !formData.address.email || !formData.address.phone) {
      console.error('Please fill out all fields before submitting the form.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.address.email)) {
      console.error('Please enter a valid email address.');
      return;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.address.phone)) {
      console.error('Please enter a valid 10-digit phone number.');
      return;
    }

    const response = await fetch('http://localhost:8080/rest/customer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const customerData = await response.json();
      navigate("/customers");
      console.log('Customer created successfully. ID:', customerData.id);
    } else {
      console.error('An error occurred while creating the customer.');
    }
  } catch (error) {
    console.error('An error occurred while sending the request:', error);
  }
};

  return (
    <div className="customer-form-container">
      <div>
      <Navbar></Navbar>
      </div>
      <form className="form-container">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.address.name}
            onChange={handleAddressChange}
          />
        </label>

        <label>
          NIP:
          <input
            type="text"
            name="nip"
            value={formData.nip}
            onChange={handleInputChange}
          />
        </label>

        <h3>Address:</h3>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={formData.address.city}
            onChange={handleAddressChange}
          />
        </label>

        <label>
          Zip Code:
          <input
            type="text"
            name="zipCode"
            value={formData.address.zipCode}
            onChange={handleAddressChange}
          />
        </label>

        <label>
          Street:
          <input
            type="text"
            name="street"
            value={formData.address.street}
            onChange={handleAddressChange}
          />
        </label>

        <label>
          Building Number:
          <input
            type="text"
            name="buildingNumber"
            value={formData.address.buildingNumber}
            onChange={handleAddressChange}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.address.email}
            onChange={handleAddressChange}
          />
        </label>

        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={formData.address.phone}
            onChange={handleAddressChange}
          />
        </label>

        <button type="button" onClick={handleFormSubmit} className="button">
          Create Customer
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;
