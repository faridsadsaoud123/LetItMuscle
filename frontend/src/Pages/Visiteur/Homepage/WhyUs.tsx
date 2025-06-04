import styled from "styled-components";
import img1 from "../../../assets/img1.svg";
import img2 from "../../../assets/img2.svg";
import img3 from "../../../assets/img3.svg";
const Container = styled.div`
  color: white;
  position: relative;
  width: 100%;
  height: 100%;
  font-family: "Poppins", sans-serif;
  margin: 30px 0px;
  display: flex;
  flex-direction: column;
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  gap: 30px;
`;
const Title = styled.h2`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  text-align: center;
  padding: 10px 0px;
  font-size: 20px;
  position: relative;
  font-weight: 800;

  &::after {
    content: " ";
    width: 280px;
    height: 3px;
    background-color: #fc8436;
    position: absolute;
    top: 45px;
    border-radius: 50px;
    left: 50%;
    transform: translateX(-50%);
  }
`;
const Groupe = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`;
const Icon = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
`;
const T1 = styled.h3`
  font-size: 15px;
  font-weight: 500;
  font-family: "Roboto", sans-serif;
  width: 100%;
  text-align: center;
`;
const Desc = styled.p`
  margin: 10px;
  font-size: 12px;
  font-weight: lighter;
  font-family: "Roboto", sans-serif;
  letter-spacing: 1px;
  text-align: justify;
`;

const WhyUs = () => {
  return (
    <Container>
      <Title>Pourquoi choisir Let It Muscle?</Title>
      <Wrapper>
        <Groupe>
          <Icon src={img1} alt="icon" />
          <T1>Des équipements modernes et de qualité</T1>
          <Desc>
            Profitez d'un environnement moderne et agréable, avec des
            équipements de pointe conçus pour optimiser vos performances et
            votre confort.
          </Desc>
        </Groupe>

        <Groupe>
          <Icon src={img2} alt="icon" />
          <T1>Un suivi personnalisé pour atteindre vos objectifs</T1>
          <Desc>
            Perdre du poids, Gagner en tonus musculaire, Améliorer votre
            endurance, Ou simplement vous détendre, 
          </Desc>
        </Groupe>

        <Groupe>
          <Icon src={img3} alt="icon" />
          <T1>Des cours variés pour tous les niveaux</T1>
          <Desc>
            Yoga, fitness, musculation, danse, et bien plus encore.Chaque
            activité est adaptée à tous les niveaux, des débutants aux sportifs
            confirmés.
          </Desc>
        </Groupe>
      </Wrapper>
    </Container>
  );
};

export default WhyUs;
