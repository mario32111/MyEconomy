import React from 'react';
import styled from 'styled-components';
import fondo3 from '../../../assets/img/fondo3.jpg';

// Estilos con styled-components
const HeroSection = styled.section`
  background-image: url(${fondo3});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  padding: 0 20px;
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 10px;

  span {
    color: #ffc107;
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
  color: #ffc107;
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
    transform: scale(1.05);
  }

  i {
    font-size: 3rem;
    margin-bottom: 10px;
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

const Icon = styled.i`
  font-size: 3rem;
`;

const Home = () => {
  return (
    <HeroSection>
      <Heading>
        Powerful Digital Solutions With GP<span>.</span>
      </Heading>
      <SubHeading>We are a team of talented digital marketers</SubHeading>

      <IconContainer>
        <IconBox>
          <Icon className="bi bi-binoculars" />
          <h3><a href="#">Lorem Ipsum</a></h3>
        </IconBox>
        <IconBox>
          <Icon className="bi bi-bullseye" />
          <h3><a href="#">Dolor Sitema</a></h3>
        </IconBox>
        <IconBox>
          <Icon className="bi bi-fullscreen-exit" />
          <h3><a href="#">Sedare Perspiciatis</a></h3>
        </IconBox>
        <IconBox>
          <Icon className="bi bi-card-list" />
          <h3><a href="#">Magni Dolores</a></h3>
        </IconBox>
        <IconBox>
          <Icon className="bi bi-gem" />
          <h3><a href="#">Nemos Enimade</a></h3>
        </IconBox>
      </IconContainer>
    </HeroSection>
  );
};

export default Home;
