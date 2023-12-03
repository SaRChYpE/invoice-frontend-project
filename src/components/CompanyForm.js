import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const CompanyForm = () => {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    login: '',
    nip: '',
    city: '',
    zipCode: '',
    street: '',
    buildNumber: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/rest/company', {
        method: 'POST',
        body: JSON.stringify({
          login: formData.login,
          nip: formData.nip,
          address: {
            city: formData.city,
            zipCode: formData.zipCode,
            street: formData.street,
            buildNumber: formData.buildNumber,
            email: formData.email,
            phone: formData.phone,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('Company created:', responseData);
      history.push('/home');
    } catch (error) {
      console.error('Error creating company:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Login:
        <input type="text" name="login" value={formData.login} onChange={handleChange} />
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
        <input type="text" name="buildNumber" value={formData.buildNumber} onChange={handleChange} />
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
  );
};

export default CompanyForm;
