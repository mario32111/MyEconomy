import React from 'react';
import Home from './Home/Home';
import NavbarHome from './NavbarHome/NavbarHome'
import Footer from './Footer/Footer';
import Carousel from './Carousel/Carousel'

function Landing() {
    return (
        <>
            <NavbarHome />
            <Home />
            <div style={{ backgroundColor: '#121212' }}>
                <Carousel />
            </div>
            <Footer />
        </>
    );
};

export default Landing;
