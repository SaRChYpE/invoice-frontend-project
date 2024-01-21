import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <div className={styles.navbarcontainer}>
      <ul className={styles.navbarlist}>
        <li className={styles.navbaritem}><Link to="/home" className={styles.navbarlink}>Home</Link></li>
        <li className={styles.navbaritem}><Link to="/create-company" className={styles.navbarlink}>Stwórz firmę</Link></li>
        <li className={styles.navbaritem}><Link to="/create-invoice" className={styles.navbarlink}>Stwórz fakturę</Link></li>
        <li className={styles.navbaritem}><Link to="/create-customer" className={styles.navbarlink}>Stwórz klienta</Link></li>
        <li className={styles.navbaritem}><Link to="/invoices" className={styles.navbarlink}>Faktury</Link></li>
        <li className={styles.navbaritem}><Link to="/customers" className={styles.navbarlink}>Klienci</Link></li>
        <li className={styles.navbaritem}><LogoutButton /></li>
      </ul>
    </div>
  );
};

export default Navbar;
