import styled from "styled-components";
import hero from "../../../assets/hero.png";
import Navbar from "../../../components/Navbar";
import Nosunivers from "./Nosunivers";
import Footer from "../../../components/Footer/Footer";
import PricingSection from "./Abonnement";
import WhyUsSection from "./WhyUsSection";
import HeroSection from "../../../components/HeroSection";
const Container = styled.div`
  position: relative;
  background-color: black;
  min-width: 100vw;
  min-height: 100vh;
  left: 0;
  top: 0;
  margin-bottom: 10px;
`;

const Wrapper = styled.div`
  position: relative;
  background-color: #a32727;
  width: 100%;
  height: 90vh;
  margin-bottom: 10px;
`;

const Cover = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  background: url(image.png);
`;

const Group = styled.div`
  position: absolute;
  top: 50%;
  color: white;
  width: 50%;
  font-family: "Poppins", sans-serif;
  left: 5%;
`;

const Title = styled.div`
  text-align: start;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 15px;
`;

const Paragraph = styled.div`
  width: 100%;
  object-fit: cover;
  font-size: 300;
  line-height: 1.6;
`;

const FooterWrapper = styled.div`
  flex-shrink: 0;
`;

const Div = styled.div`
  height: 80px;
  width: 100%;
  margin-top: 20vh;
`;

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <WhyUsSection />
      <PricingSection />
      <Footer />
    </div>
  );
}
