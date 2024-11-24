import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SelectPage from "./pages/SelectPage";
import DashboardPage from "./pages/DashboardPage";
import styled from "styled-components";
import GlobalStyles from "./styles/globalStyles";
import ErrorPage from "./pages/ErrorPage";
import { useEffect } from "react";
function App() {
  const location = useLocation();

  useEffect(() => {}, [location]);

  return (
    <>
      <GlobalStyles />
      <AppContainer
        isdashboard={location.pathname.includes("dashboard") ? "true" : "false"}
      >
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/select" element={<SelectPage />} />
          <Route path="/dashboard/:id" element={<DashboardPage />} />
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </AppContainer>
    </>
  );
}

const AppContainer = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: ${(props) =>
    props.isdashboard === "true" ? "start" : "center"};
  height: 100vh;
`;
export default App;
