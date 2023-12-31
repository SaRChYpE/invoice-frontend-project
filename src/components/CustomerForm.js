import React, { useState } from 'react';

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    login: '',
    nip: '',
    address: {
      city: '',
      zipCode: '',
      street: '',
      buildNumber: '',
      email: '',
      phone: ''
    }
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [name]: value
      }
    });
  };

  const handleFormSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8080/rest/customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      // Obsługa odpowiedzi
      if (response.ok) {
        const customerData = await response.json();
        console.log('Klient został utworzony pomyślnie. ID:', customerData.id);
        // Dalsza obsługa utworzonego klienta
      } else {
        console.error('Wystąpił błąd podczas tworzenia klienta.');
      }
    } catch (error) {
      console.error('Wystąpił błąd podczas wysyłania zapytania:', error);
    }
  };

  return (
    <div>
      <form>
        <label>
          Login:
          <input
            type="text"
            name="login"
            value={formData.login}
            onChange={handleInputChange}
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
            name="buildNumber"
            value={formData.address.buildNumber}
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

        <button type="button" onClick={handleFormSubmit}>
          Create Customer
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;
