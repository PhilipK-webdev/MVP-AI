import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineStock } from "react-icons/ai";
import { FaDumbbell, FaBuilding, FaMusic, FaRandom } from "react-icons/fa";
import { BiBitcoin, BiChip, BiCart } from "react-icons/bi";
import Logo from "../assets/logo.png";
import styled from "styled-components";
import { StateContext } from "../context/state.jsx";
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
          <FaDumbbell
            title={icon.key}
            style={{ height: "2em", width: "2em" }}
          />
        );
      case "investments":
        return (
          <AiOutlineStock
            style={{ height: "2em", width: "2em" }}
            title="investments"
          />
        );
      case "real_estate":
        return (
          <FaBuilding
            title="Real Estate"
            style={{ height: "2em", width: "2em" }}
          />
        );
      case "music":
        return (
          <FaMusic title="Music" style={{ height: "2em", width: "2em" }} />
        );
      case "cryptocurrency":
        return (
          <BiBitcoin
            title="Cryptocurrency"
            style={{ height: "2em", width: "2em" }}
          />
        );
      case "tech":
        return <BiChip title="Tech" style={{ height: "2em", width: "2em" }} />;
      case "shopping":
        return (
          <BiCart title="Shopping" style={{ height: "2em", width: "2em" }} />
        );
      default:
        return (
          <FaRandom title="Random" style={{ height: "2em", width: "2em" }} />
        );
    }
  };

  return (
    <SelectContainer>
      <ImageLogo src={Logo} alt="logo image" />
      <Title>Topics</Title>

      <Box>
        {config &&
          config.length > 0 &&
          config.map((data) => {
            return Object.keys(data).map((key) => {
              return (
                <BoxIcon
                  onClick={(e) => goToDashboard(e, data[key].id)}
                  key={data[key].id}
                >
                  {renderIcon(data[key])}
                </BoxIcon>
              );
            });
          })}
      </Box>
    </SelectContainer>
  );
}

const SelectContainer = styled.main`
  padding: 20px;
  font-family: "Poppins", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.header`
  width: 200px;
  heigth: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: white;
  padding: 10px;
  color: #7615e1;
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
  background: #7615e1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
`;

export default Select;
