// scroll.js

// Función para hacer scroll hasta el componente
const scrollToComponente = (ref) => {
    if (ref?.current) {
        ref.current.scrollIntoView({ behavior: 'smooth' });
    }
};

export { scrollToComponente };
