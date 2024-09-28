import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaMoneyCheckAlt, FaRobot, FaCoins, FaRegListAlt, FaArrowCircleRight } from 'react-icons/fa';
import fondo1 from '../../../assets/img/fondo1.jpg'; // Primer fondo
import fondo2 from '../../../assets/img/fondo2.jpg'; // Segundo fondo
import fondo3 from '../../../assets/img/fondo3.jpg'; // Tercer fondo
import fondo4 from '../../../assets/img/fondo4.jpg'; // Primer fondo
import fondo5 from '../../../assets/img/fondo5.jpg'; // Segundo fondo
import { colors } from '../../colors'; // Importa el tema y los colores
import Grow from '@mui/material/Grow'; // Importa Grow de Material UI

// Estilos con styled-components
const HeroSection = styled.section`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  padding: 0 20px;
  background-color: rgba(0, 0, 0, 0.5); // Capa oscura con transparencia

  &::before {
    content: '';
    position: absolute;
    background-image: url(${props => props.background});
    background-size: cover;
    background-position: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1; // Asegura que el contenido esté encima de la capa
    transition: background-image 1s ease-in-out;
  }
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 10px;

  span {
    color: ${colors.Primario};
  }
`;

const SubHeading = styled.p`
  font-size: 1.2rem;
  margin-top: 10px;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 40px;
`;

const IconBox = styled.div`
  width: 150px;
  height: 150px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  color: ${colors.Blanco};
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
    transform: scale(1.05);
  }

  h3 {
    font-size: 1.2rem;
    margin-top: 10px;
  }

  a {
    text-decoration: none;
    color: white;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Icon = styled.div`
  font-size: 3rem;
`;

export const Home = () => {
  const [currentBackground, setCurrentBackground] = useState(0);
  const [checked, setChecked] = useState(true); // Estado para el control de la animación

  // Array de imágenes de fondo
  const backgrounds = [fondo1, fondo2, fondo3, fondo4, fondo5];

  // Hook para cambiar la imagen de fondo cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground((prev) => (prev + 1) % backgrounds.length);
    }, 3000);

    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, [backgrounds.length]);

  return (
    <HeroSection background={backgrounds[currentBackground]}>
      <Grow in={checked} timeout={1000}>
        <Heading>
          Mejora tu Salud Financiera con MyEconomy<span>.</span>
        </Heading>
      </Grow>
      <Grow in={checked} timeout={1000}>
        <SubHeading>Un conjunto de soluciones digitales que se adapta a tus objetivos financieros, perfectas para individuos y dueños de empresas.</SubHeading>
      </Grow>

      <IconContainer>
        {/* Aplica la animación Grow en cada IconBox */}
        <Grow in={checked} timeout={1000}>
          <IconBox>
            <Icon><FaMoneyCheckAlt /></Icon>
            <h3>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#">Monitorización de tus ingresos y gastos</a>
            </h3>
          </IconBox>
        </Grow>

        <Grow in={checked} timeout={1200}>
          <IconBox>
            <Icon><FaRobot /></Icon>
            <h3>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#">IA dedicada a las finanzas</a>
            </h3>
          </IconBox>
        </Grow>

        <Grow in={checked} timeout={1400}>
          <IconBox>
            <Icon><FaCoins /></Icon>
            <h3>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#">Inversiones automatizadas</a>
            </h3>
          </IconBox>
        </Grow>

        <Grow in={checked} timeout={1800}>
          <IconBox>
            <Icon><FaRegListAlt /></Icon>
            <h3>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#">Control de suscripciones y servicios</a>
            </h3>
          </IconBox>
        </Grow>

        <Grow in={checked} timeout={2000}>
          <IconBox>
            <Icon><FaArrowCircleRight /></Icon>
            <h3>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#">Ver más ...</a>
            </h3>
          </IconBox>
        </Grow>
      </IconContainer>
    </HeroSection>
  );
};

export default Home;
