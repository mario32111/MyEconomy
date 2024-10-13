import React from 'react';
import { Parallax } from 'react-parallax';
import tuImagen from '../assets/img/fondo1.jpg'; // Ajusta la ruta según la ubicación de tu imagen

const ParallaxComponent = () => {
  return (
    <div>
      <Parallax bgImage={tuImagen} strength={300}>
        <div style={{ height: 500, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h1 style={{ color: 'white', textAlign: 'center' }}>
            ¡Bienvenido al Efecto Parallax!
          </h1>
        </div>
      </Parallax>

      <div style={{ height: '100vh', backgroundColor: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <h1>Sección de Contenido</h1>
        <p>Este es el contenido después del parallax.</p>
      </div>
    </div>
  );
};

export default ParallaxComponent;
