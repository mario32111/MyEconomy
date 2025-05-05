// src/shared/components/Layout/MainLayout.jsx
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = ({ children }) => (
  <div>
    <Navbar />
    <main>{children}</main>
    <Footer />
  </div>
);
export default MainLayout;