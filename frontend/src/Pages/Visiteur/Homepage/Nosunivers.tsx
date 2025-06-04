import { Component } from "react";
import styled from "styled-components";
import l1 from "../../../assets/l1.png";
import l2 from "../../../assets/l2.jpg";

const Container = styled.div`
  position: relative;
  padding-top: 10px;
  width: 100%;
  height: 90vh;
  background: #000;
  margin: 10px 0;
`;

const Wrapper = styled.div`
  background-color: aqua;
  width: 100%;
  height: 100%;
  display: flex;
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
  color: white;
  margin: 10px 0;

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

const Left = styled.div`
  background: #6cb21d;
  flex: 1;
  z-index: 9;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const Right = styled.div`
  background: #ada730;
  flex: 2;
  height: 100%;
  width: 100%;
  position: relative;
`;

const Left1 = styled.div`
  flex: 1;
  background-color: blue;
  height: 100%;
  width: 100%;
  position: relative;
`;
// const Left2 = styled.div`
//   flex: 1;
//   background-color: brown;
//   width: 100%;
//   height: 100%;
// `;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Btn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 32px;
  gap: 10px;
  color: white;
  font-weight: 500;
  background: #ea7e38;
  border-radius: 8px;
  margin: 20px 0px;
`;
const Info1 = styled.div`
  color: white;
  font-family: "Roboto", sans-serif, sans-serif;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Info2 = styled.div`
  color: white;
  font-family: "Roboto", sans-serif;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const T = styled.h2`
  font-weight: 600;
  font-size: 20px;
  font-family: "Poppins", sans-serif;
`;

export default class Nosunivers extends Component {
  render() {
    return (
      <>
        <Container>
          <Title>Explore nos univers</Title>
          <Wrapper>
            <Left>
              <Left1>
                <Image src={l1} alt="image" />
                <Info1>
                  <T>Coaching en ligne</T>
                  <Btn>S'inscrire</Btn>
                </Info1>
              </Left1>
            </Left>
            <Right>
              <Info2>
                <T>Cours Collectifs</T>
                <Btn>S'inscrire</Btn>
              </Info2>
              <Image src={l2} alt="image" />
            </Right>
          </Wrapper>
        </Container>
      </>
    );
  }
}
