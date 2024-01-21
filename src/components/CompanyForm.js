// CompanyForm.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "./Navbar";
import './styles.css'; // Dodaj import stylów

const CompanyForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    nip: '',
    city: '',
    zipCode: '',
    street: '',
    buildingNumber: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = sessionStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:8080/rest/company', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          nip: formData.nip,
          address: {
            name: formData.name,
            city: formData.city,
            zipCode: formData.zipCode,
            street: formData.street,
            buildingNumber: formData.buildingNumber,
            email: formData.email,
            phone: formData.phone,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
        console.log(token);
      } else {
        console.log(token);
        navigate('/home');
      }

      const responseData = await response.json();
      console.log('Company created:', responseData);
      navigate('/home');
    } catch (error) {
      console.error('Error creating company:', error);
    }
  };

  return (
    <div className="companyFormContainer">
      <div>
        <Navbar />
      </div>
      <div className="companyForm">
        <form onSubmit={handleSubmit}>
          <label>
            Nazwa:
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
          <br />
          <label>
            NIP:
            <input type="text" name="nip" value={formData.nip} onChange={handleChange} />
          </label>
          <br />
          <label>
            City:
            <input type="text" name="city" value={formData.city} onChange={handleChange} />
          </label>
          <br />
          <label>
            Zip Code:
            <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} />
          </label>
          <br />
          <label>
            Street:
            <input type="text" name="street" value={formData.street} onChange={handleChange} />
          </label>
          <br />
          <label>
            Build Number:
            <input type="text" name="buildingNumber" value={formData.buildingNumber} onChange={handleChange} />
          </label>
          <br />
          <label>
            Email:
            <input type="text" name="email" value={formData.email} onChange={handleChange} />
          </label>
          <br />
          <label>
            Phone:
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
          </label>
          <br />
          <button type="submit">Create Company</button>
        </form>
      </div>
    </div>
  );
};

export default CompanyForm;
