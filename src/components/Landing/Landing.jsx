import React, { useEffect, useRef } from 'react';
import Home from './Home/Home';
import NavbarHome from './NavbarHome/NavbarHome';
import Footer from './Footer/Footer';
import Carousel from './Carousel/Carousel';
import { scrollToComponente } from './scroll';
import { TodoContext } from '../TodoContext';

function Landing() {
    const {openHome, setOpenHome, openServices, setOpenServices, openContact, setOpenContact} = React.useContext(TodoContext)

    // Crear referencias para los componentes
    const homeRef = useRef(null);
    const servicesRef = useRef(null);
    const contactRef = useRef(null);

    // useEffect para detectar cambios en los estados y hacer scroll
    useEffect(() => {
        if (openHome) {
            scrollToComponente(homeRef);
            setOpenHome(false);
        } else if (openServices) {
            scrollToComponente(servicesRef);
            setOpenServices(false);

        } else if (openContact) {
            scrollToComponente(contactRef);
            setOpenContact(false);
        }
    }, [openHome, openServices, openContact]);

    return (
        <>
            <NavbarHome />

            {/* Componente Home con ref */}
            <div ref={homeRef}>
                <Home />
            </div>

            {/* Otros componentes con referencias */}
            <div ref={servicesRef} style={{ backgroundColor: '#121212' }}>
                <Carousel />
            </div>

            <div ref={contactRef}>
                <Footer />
            </div>
        </>
    );
}

export default Landing;
