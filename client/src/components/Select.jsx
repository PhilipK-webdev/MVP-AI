import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import newLogo from "../assets/newLogo.png";
import styled from "styled-components";
import { StateContext } from "../context/CustomContext";
import Sport from "../assets/training.gif";
import ShoppingCart from "../assets/shopping-cart.gif";
import Music from "../assets/music.gif";
import Investment from "../assets/investment.gif";
import Tech from "../assets/coding.gif";
import Building from "../assets/building.gif";
import Beauty from "../assets/blush.gif";
import Bitcoin from "../assets/bitcoin.gif";
function Select() {
  const navigate = useNavigate();
  const { config, setSelectedId } = useContext(StateContext);
  const goToDashboard = (e, id) => {
    e.preventDefault();
    setSelectedId(id);
    navigate(`/dashboard/${id}`);
  };

  const renderIcon = (icon) => {
    switch (icon.key) {
      case "sports_and_fitness":
        return (
          <img
            src={Sport}
            alt={icon.key}
            style={{
              width: "50px",
              height: "50px",
            }}
          />
        );
      case "investments":
        return (
          <img
            src={Investment}
            alt={icon.key}
            style={{
              width: "50px",
              height: "50px",
            }}
          />
        );
      case "real_estate":
        return (
          <img
            src={Building}
            alt={icon.key}
            style={{
              width: "50px",
              height: "50px",
            }}
          />
        );
      case "music":
        return (
          <img
            src={Music}
            alt={icon.key}
            style={{
              width: "50px",
              height: "50px",
            }}
          />
        );
      case "cryptocurrency":
        return (
          <img
            src={Bitcoin}
            alt={icon.key}
            style={{
              width: "50px",
              height: "50px",
            }}
          />
        );
      case "tech":
        return (
          <img
            src={Tech}
            alt={icon.key}
            style={{
              width: "50px",
              height: "50px",
            }}
          />
        );
      case "shopping":
        return (
          <img
            src={ShoppingCart}
            alt={icon.key}
            style={{
              width: "50px",
              height: "50px",
            }}
          />
        );
      default:
        return (
          <img
            src={Beauty}
            alt={icon.key}
            style={{
              width: "50px",
              height: "50px",
            }}
          />
        );
    }
  };
  const data = config[0]?.topics;
  return (
    <SelectContainer>
      <ImageLogo src={newLogo} alt="logo image" />
      <Title>What are you looking for?</Title>
      <Box>
        {data &&
          data.length > 0 &&
          data.map((d) => {
            return (
              <BoxIcon onClick={(e) => goToDashboard(e, d.id)} key={d.id}>
                {renderIcon(d)}
              </BoxIcon>
            );
          })}
      </Box>
    </SelectContainer>
  );
}

const SelectContainer = styled.main`
  font-family: "Poppins", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.header`
  heigth: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: rgba(50, 50, 50, 0.3);
  padding: 10px;
  color: white;
  font-weight: bold;
`;

const Box = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 columns */
  grid-template-rows: repeat(4, 1fr); /* 4 rows */
  gap: 10px;
  margin-top: 20px;
`;

const ImageLogo = styled.img`
  width: 50%;
  height: auto;
`;

const BoxIcon = styled.div`
  border-radius: 10px;
  width: 100px;
  height: 80px;
  //background: #7615e1;
  background-color: rgba(90, 61, 125, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
`;

export default Select;
