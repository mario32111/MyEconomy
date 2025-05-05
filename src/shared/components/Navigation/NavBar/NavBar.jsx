import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
import MobileMenu from './MobileMenu';
import NotificationsMenu from './NotificationsMenu';
import UserMenu from './UserMenu';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();

  // Función para obtener la ruta de navegación (breadcrumb)
  const getBreadcrumb = () => {
    const path = location.pathname;
    const segments = path.split('/').filter(segment => segment !== '');

    const breadcrumbMap = {
      'dashboard': 'Dashboard',
      'finance': 'Finanzas',
      'expense-tracker': 'Seguimiento de Gastos',
      'education': 'Educación',
      'profile': 'Perfil',
    };

    return segments.map(segment => breadcrumbMap[segment] || segment);
  };

  // Función para determinar la descripción de la página actual
  const getCurrentPageDescription = () => {
    const path = location.pathname;

    if (path.includes('/finance/expense-tracker')) {
      return 'Visualiza y gestiona tus finanzas personales';
    } else if (path.includes('/dashboard')) {
      return 'Resumen de tu situación financiera';
    } else if (path.includes('/finance')) {
      return 'Gestiona tus finanzas personales';
    } else if (path.includes('/education')) {
      return 'Aprende sobre finanzas personales';
    } else if (path.includes('/profile')) {
      return 'Gestiona tu perfil y preferencias';
    } else {
      return '';
    }
  };

  const breadcrumb = getBreadcrumb();
  const currentPageDescription = getCurrentPageDescription();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        {/* Sección izquierda - Logo y menú móvil */}
        <div className={styles.navbarLeft}>
          <button 
            className={styles.mobileMenuButton}
            onClick={() => setMobileMenuOpen(true)}
          >
            <svg className={styles.menuIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>

          <div className={styles.breadcrumbContainer}>
            <Link to="/" className={styles.logoText}>MyEconomy</Link>

            {breadcrumb.length > 0 && (
              <>
                {breadcrumb.map((item, index) => (
                  <div key={index} className={styles.breadcrumbItem}>
                    <span className={styles.breadcrumbSeparator}>&gt;</span>
                    <span className={styles.breadcrumbText}>{item}</span>
                  </div>
                ))}
              </>
            )}
          </div>

          {currentPageDescription && (
            <p className={styles.currentPageDescription}>{currentPageDescription}</p>
          )}
        </div>

        {/* Sección derecha - Acciones */}
        <div className={styles.navbarRight}>
          <button 
            className={styles.notificationsButton}
            onClick={() => setNotificationsOpen(!notificationsOpen)}
          >
            <svg className={styles.notificationIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
            </svg>
          </button>

          <button 
            className={styles.userButton}
            onClick={() => setUserMenuOpen(!userMenuOpen)}
          >
            <div className={styles.userAvatar}>
              <span>JD</span>
            </div>
          </button>
        </div>
      </div>

      {/* Menús desplegables */}
      {mobileMenuOpen && (
        <MobileMenu onClose={() => setMobileMenuOpen(false)} />
      )}

      {notificationsOpen && (
        <NotificationsMenu onClose={() => setNotificationsOpen(false)} />
      )}

      {userMenuOpen && (
        <UserMenu onClose={() => setUserMenuOpen(false)} />
      )}
    </nav>
  );
};

export default Navbar;