import styled from "styled-components";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
function Login() {
  const currentData = new Date().getFullYear();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/select");
  };
  return (
    <LoginContainer>
      <ImageLogo src={Logo} alt="logo image" />
      <Section>
        <div>
          <p>{currentData}</p>
          <p>What can I help with?</p>
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
  margin-top: -50px;
`;

const ImageLogo = styled.img`
  width: 50%;
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
