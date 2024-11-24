import styled from "styled-components";
import newLogo from "../assets/newLogo.png";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
import { StateContext } from "../context/CustomContext";
import Logo from "../assets/logo.png";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Login() {
  const { userId } = useContext(StateContext);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const uuid = uuidv4();
    try {
      if (!userId) {
        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            data: { key: uuid, conversations: [] },
          }),
        };

        const response = await fetch(`${API_BASE_URL}/add`, options);
        if (response.status !== 200) {
          throw new Error("Bad Response");
        }
        localStorage.setItem("uuid", uuid);
      }
      navigate("/select");
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };
  return (
    <LoginContainer>
      <ImageLogo src={newLogo} alt="logo image" />
      <Section>
        <div>
          <p className="question">
            <img src={Logo} style={{ width: "30px", marginRight: "2px" }} />{" "}
            <span>What can I help with?</span>
          </p>
          <p
            style={{
              fontSize: "12px",
              color: "#72668a",
              padding: "5px",
            }}
          >
            Everything you need
          </p>
          <ButtonLogin onClick={handleLogin}>Begin</ButtonLogin>
        </div>
      </Section>
    </LoginContainer>
  );
}
const LoginContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const ImageLogo = styled.img`
  width: 100%;
  height: auto;
`;

const Section = styled.section`
  display: flex;
  font-family: "Poppins", sans-serif;
  width: auto;
  height: auto;
  padding: 10px;
  justify-content: start;
  flex-direction: column;
  align-items: start;
  margin-top: 25px;

  p {
    margin: 0px;
    padding: 5px;
  }

  .question {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`;

const ButtonLogin = styled.button`
  width: 62vw;
  height: 20px;
  margin-top: 20px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: #7615e1;
  color: white;
  border: none;
`;
export default Login;
