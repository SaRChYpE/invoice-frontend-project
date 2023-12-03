import React, { useState } from 'react';

const InvoiceForm = () => {
  const [formData, setFormData] = useState({
    userLogin: 'danio',
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
    setFormData({
      ...formData,
      items: [...formData.items, { id: Date.now(), name: '', price: 0, vatRate: 0 }]
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
    try {
      const response = await fetch('http://localhost:8080/rest/invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
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
      <form>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </label>

        <h3>Items:</h3>
        {formData.items.map((item) => (
          <div key={item.id}>
            <label>
              Item Name:
              <input
                type="text"
                name="name"
                value={item.name}
                onChange={(e) => handleInputChange(item.id, e)}
              />
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
  );
};

export default InvoiceForm;
