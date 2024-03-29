import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from "./Navbar";

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    axios.post('http://localhost:8080/rest/customer/find-all', {
      "filterHelper": {},
      "pageSize": itemsPerPage,
      "pageNumber": currentPage
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setCustomers(response.data.items);
      setTotalPages(Math.ceil(response.data.totalCount / itemsPerPage));
    })
    .catch(error => {
      console.error('Błąd podczas pobierania danych:', error);
    });
  }, [currentPage]);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <Navbar/>
      <div className="customer-pagination-container">
        {customers.map(customer => (
          <div key={customer.id} className="customer-item">
            <Link to={`/customer/${customer.id}`} className="customer-link">
              {customer.address.name || 'Nieznana nazwa'}
            </Link>
          </div>
        ))}

        <div className="pagination-buttons">
          {Array.from({ length: totalPages }, (_, i) => i ).map(pageNumber => (
            <button
              key={pageNumber }
              className="pagination-button"
              onClick={() => handlePageClick(pageNumber)}
            >
              {pageNumber + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomerList;
