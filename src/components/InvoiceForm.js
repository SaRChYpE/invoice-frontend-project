import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Navbar from "./Navbar";

const InvoiceForm = () => {
  const token = sessionStorage.getItem('token');
  const [customerList, setCustomerList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const navigate = useNavigate();

  const fetchCustomerList = async () => {
    try {
      const response = await fetch('http://localhost:8080/rest/customer/find-all', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          "filterHelper": {},
          "pageSize": 10,
          "pageNumber": 0
        })
      });

      if (response.ok) {
        const data = await response.json();
        setCustomerList(data.items);
      } else {
        console.error('Wystąpił błąd podczas pobierania listy klientów.');
      }
    } catch (error) {
      console.error('Wystąpił błąd podczas wysyłania zapytania:', error);
    }
  };

  useEffect(() => {
    fetchCustomerList();
  }, []); // Wywołaj tylko raz po zamontowaniu komponentu

  const handleCustomerChange = (event) => {
    setSelectedCustomer(event.target.value);
  };

  const isValidNumber = (value) => {
    return !isNaN(value);
  };

  const [formData, setFormData] = useState({
    name: '',
    customerHelper: {
      id: 1
    },
    items: [
      {
        name: '',
        price: 0,
        vatRate: 0
      }
    ]
  });

  const [errors, setErrors] = useState({
    name: '',
    items: []
  });

  const handleInputChange = (id, event) => {
    const { name, value } = event.target;
    const newItems = formData.items.map((item) =>
      item.id === id ? { ...item, [name]: value } : item
    );
    setFormData({
      ...formData,
      items: newItems
    });
  };

const handleAddItem = () => {
  const newItem = {
    name: '',
    price: 0,
    vatRate: 0,
    id: Date.now() // Użyj timestampu jako unikalnego id
  };

  setFormData({
    ...formData,
    items: [...formData.items, newItem]
  });
};

const handleRemoveItem = (id) => {
  const newItems = formData.items.filter((item) => item.id !== id);
  setFormData({
    ...formData,
    items: newItems
  });
};

  const handleFormSubmit = async () => {
    let formIsValid = true;

    const newErrors = {
      name: '',
      items: []
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Pole "Name" nie może być puste.';
      formIsValid = false;
    }

    const invalidItems = formData.items.filter(item => !isValidNumber(item.price) || !isValidNumber(item.vatRate));
    if (invalidItems.length > 0) {
      invalidItems.forEach((_, index) => {
        if (!newErrors.items[index]) {
          newErrors.items[index] = [];
        }
        newErrors.items[index].push('Pola "Price" i "VAT Rate" muszą być liczbami.');
      });
      formIsValid = false;
    }

    if (!formIsValid) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/rest/invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        navigate('/invoices');
        console.log('Faktura została utworzona pomyślnie.');
      } else {
        console.error('Wystąpił błąd podczas tworzenia faktury.');
      }
    } catch (error) {
      console.error('Wystąpił błąd podczas wysyłania zapytania:', error);
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className='invoice-form-container'>
        <form className='invoice-form'>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              setErrors({ ...errors, name: '' });
            }}
          />
          {errors.name && <p>{errors.name}</p>}
        </label>

        <label>
          Customer:
          <select
            name="customer"
            value={selectedCustomer}
            onChange={handleCustomerChange}
          >
            <option value="" disabled>Select a customer</option>
            {customerList.map(customer => (
              <option key={customer.id} value={customer.id}>{customer.address.name}</option>
            ))}
          </select>
        </label>

        <h3>Items:</h3>
        {formData.items.map((item, index) => (
          <div key={index}>
            <label>
              Item Name:
              <input
                type="text"
                name="name"
                value={item.name}
                onChange={(e) => handleInputChange(item.id, e)}
              />
              {errors.items && errors.items[index] && errors.items[index].map((err, errIndex) => (
                <p key={errIndex}>{err}</p>
              ))}
            </label>
            <label>
              Price:
              <input
                type="number"
                name="price"
                value={item.price}
                onChange={(e) => handleInputChange(item.id, e)}
              />
            </label>
            <label>
              VAT Rate:
              <input
                type="number"
                name="vatRate"
                value={item.vatRate}
                onChange={(e) => handleInputChange(item.id, e)}
              />
            </label>
            <button type="button" onClick={() => handleRemoveItem(item.id)}>
              Remove Item
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddItem}>
          Add Item
        </button>

        <button type="button" onClick={handleFormSubmit}>
          Submit
        </button>
      </form>
    </div>
    </div>
  );
};

export default InvoiceForm;
