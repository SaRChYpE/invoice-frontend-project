import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Upewnij się, że używasz react-router-dom
import './InvoiceList.css';

function PaginationExample() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage] = useState(10); // liczba elementów na stronę

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    axios.post('http://localhost:8080/rest/invoice/find-all', {
      "filterHelper": {},
      pageNumber: currentPage,
      pageSize: itemsPerPage
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      setItems(response.data.items);
      setTotalPages(Math.ceil(response.data.totalItems / itemsPerPage));
    })
    .catch(error => {
      console.error('Błąd podczas pobierania danych:', error);
    });
  }, [currentPage, itemsPerPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* Wyświetlanie nazwy faktury dla bieżącej strony */}
      {items.map(invoice => (
        <div key={invoice.id}>
          <h2>
            <Link to={`/invoices/${invoice.id}`}>
              {invoice.name}
            </Link>
          </h2>
        </div>
      ))}

      {/* Nawigacja stronami */}
      <div>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
          <button key={pageNumber} onClick={() => paginate(pageNumber)}>
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PaginationExample;
