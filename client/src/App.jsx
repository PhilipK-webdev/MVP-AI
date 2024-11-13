import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SelectPage from "./pages/SelectPage";
import DashboardPage from "./pages/DashboardPage";
import styled from "styled-components";
import GlobalStyles from "./styles/globalStyles";
function App() {
  // const [count, setCount] = useState(0);

  useEffect(() => {
    //getConfig();
  }, []);

  // const getConfig = async () => {
  //   const response = await fetch("/api/config");
  //   const result = await response.json();
  //   console.log(result);
  // };
  return (
    <AppContainer>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/select" element={<SelectPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </Router>
    </AppContainer>
  );
}

const AppContainer = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
`;
export default App;
