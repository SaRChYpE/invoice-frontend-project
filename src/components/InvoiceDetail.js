import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ItemsList({ data }) {
  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          <h3>Faktura: {item.name}</h3>
          <p>Data utworzenia: {item.creationDate}</p>

          <h4>Informacje o kliencie:</h4>
          <p>NIP: {item.customerHelper.nip}</p>
          <p>Adres: {item.customerHelper.address.street}, {item.customerHelper.address.zipCode} {item.customerHelper.address.city}</p>

          <h4>Informacje o firmie:</h4>
          <p>Login: {item.companyHelper.login}</p>
          <p>NIP: {item.companyHelper.nip}</p>
          <p>Adres: {item.companyHelper.address.street}, {item.companyHelper.address.zipCode} {item.companyHelper.address.city}</p>

          <h4>Produkty:</h4>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nazwa</th>
                <th>Cena</th>
                <th>Stawka VAT</th>
                <th>Wartość brutto</th>
              </tr>
            </thead>
            <tbody>
              {item.items.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price.toFixed(2)}</td>
                  <td>{product.vatRate.toFixed(2)}%</td>
                  <td>{product.grossValue.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p>Suma netto: {item.sumNetValue.toFixed(2)}</p>
          <p>Suma brutto: {item.sumGrossValue.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}

const InvoiceDetail = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      console.error('Token nie jest dostępny w sessionStorage.');
      return;
    }

    fetch(`http://localhost:8080/rest/invoice/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
            throw new Error('Faktura nie istnieje.');
        }
        return response.json();
      })
      .then(data => setInvoice([data]))
      .catch(error => setError(error.message));
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!invoice) {
    return <div>Ładowanie...</div>;
  }

  return (
    <div>
      {/* Wyświetlanie elementów dla bieżącej strony */}
      <ItemsList data={invoice} />
    </div>
  );
}

export default InvoiceDetail;
