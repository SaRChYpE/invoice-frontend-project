import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './InvoiceDetail.css'; // Importuj arkusz stylów (InvoiceDetail.css)

function ItemsList({ data, onDelete }) {
  return (
    <div className="items-list-container">
      {data.map((item, index) => (
        <div key={index} className="invoice-item">
          <h3>Faktura: {item.name}</h3>
          <p>Data utworzenia: {item.creationDate}</p>

          <h4>Informacje o kliencie:</h4>
          <p>Nazwa: {item.customerHelper.address.name}</p>
          <p>NIP: {item.customerHelper.nip}</p>
          <p>Adres: {item.customerHelper.address.street}, {item.customerHelper.address.zipCode} {item.customerHelper.address.city} {item.customerHelper.address.country}</p>
          <p>Numer budynku: {item.customerHelper.address.buildingNumber}</p>
          <p>Email: {item.customerHelper.address.email}</p>
          <p>Telefon: {item.customerHelper.address.phone}</p>

          <h4>Informacje o firmie:</h4>
          <p>Nazwa: {item.companyHelper.address.name}</p>
          <p>NIP: {item.companyHelper.nip}</p>
          <p>Adres: {item.companyHelper.address.street}, {item.companyHelper.address.zipCode} {item.companyHelper.address.city} {item.companyHelper.address.country}</p>
          <p>Numer budynku: {item.companyHelper.address.buildingNumber}</p>
          <p>Email: {item.companyHelper.address.email}</p>
          <p>Telefon: {item.scompanyHelper.address.phone}</p>




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
      <button className="delete-button" onClick={onDelete}>
        Usuń fakturę
      </button>
    </div>
  );
}

const InvoiceDetail = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState([]);
  const [error, setError] = useState(null);
  const [isGenerated, setIsGenerated] = useState(false); // Nowy stan

  const generateInvoice = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/rest/invoice/${id}/generate`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log('Faktura została wygenerowana pomyślnie.');
        setIsGenerated(true); // Ustawienie stanu na true po wygenerowaniu faktury
      } else {
        console.error('Wystąpił błąd podczas generowania faktury.');
      }
    } catch (error) {
      console.error('Wystąpił błąd podczas wysyłania zapytania:', error);
    }
  };

  const downloadFile = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/rest/invoice/${id}/get-file`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Pobieranie pliku
        const blob = await response.blob();
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `invoice_${id}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      } else {
        console.error('Wystąpił błąd podczas pobierania pliku.');
      }
    } catch (error) {
      console.error('Wystąpił błąd podczas wysyłania zapytania:', error);
    }
  };

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

  const handleDelete = async () => {
    const token = sessionStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:8080/rest/invoice/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log('Faktura została usunięta.');
        // Dodaj ewentualne dodatkowe działania po usunięciu faktury
      } else {
        console.error('Wystąpił błąd podczas usuwania faktury.');
      }
    } catch (error) {
      console.error('Wystąpił błąd podczas wysyłania zapytania:', error);
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!invoice) {
    return <div className="loading-message">Ładowanie...</div>;
  }

  return (
    <div className="invoice-detail-container">
      {/* Wyświetlanie elementów dla bieżącej strony */}
           <ItemsList data={invoice} onDelete={handleDelete} />

      {/* Przycisk do generowania faktury */}
      <button className="generate-button" onClick={generateInvoice}>
        Generuj fakturę
      </button>

      {/* Przycisk do pobierania pliku (warunkowo renderowany) */}
      {isGenerated && (
        <button className="download-button" onClick={downloadFile}>
          Pobierz plik
        </button>


      )}
    </div>
  );
}

export default InvoiceDetail;
