import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CustomerDetail.css';

const CustomerDetails = () => {
  const { login } = useParams(); // Pobieranie loginu z URL
  const [customerData, setCustomerData] = useState(null);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem('token'); // Pobieranie tokena z sesji

  useEffect(() => {
    // Sprawdzanie czy token istnieje
    if (!token) {
      setError('Brak autoryzacji. Zaloguj się.');
      return;
    }

    // Wykonanie zapytania GET do endpointu z podanym loginem
    fetch(`http://localhost:8080/rest/customer/get-all/${login}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Nie udało się pobrać danych klienta.');
        }
        return response.json();
      })
      .then(data => {
        setCustomerData(data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, [login, token]);

  if (error) {
    return <div>Błąd: {error}</div>;
  }

if (!customerData || customerData.length === 0) {
  return <div>Ładowanie...</div>;
}

const singleCustomerData = customerData[0]; // Pobranie pierwszego obiektu z tablicy

return (
  <div className="customer-container">
    <h2>Dane klienta</h2>
    <p>NIP: {singleCustomerData.nip}</p>
    <p>Adres:</p>
    <ul>
      <li>Nazwa: {singleCustomerData.address ? (singleCustomerData.address.name || 'Brak danych') : 'Brak danych'}</li>
      <li>Kraj: {singleCustomerData.address ? singleCustomerData.address.country : 'Brak danych'}</li>
      <li>Miasto: {singleCustomerData.address ? singleCustomerData.address.city : 'Brak danych'}</li>
      <li>Kod pocztowy: {singleCustomerData.address ? singleCustomerData.address.zipCode : 'Brak danych'}</li>
      <li>Ulica: {singleCustomerData.address ? singleCustomerData.address.street : 'Brak danych'}</li>
      <li>Numer budynku: {singleCustomerData.address ? (singleCustomerData.address.buildingNumber || 'Brak danych') : 'Brak danych'}</li>
      <li>Email: {singleCustomerData.address ? (singleCustomerData.address.email || 'Brak danych') : 'Brak danych'}</li>
      <li>Telefon: {singleCustomerData.address ? (singleCustomerData.address.phone || 'Brak danych') : 'Brak danych'}</li>
    </ul>
  </div>
);

};

export default CustomerDetails;
