import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SelectPage from "./pages/SelectPage";
import DashboardPage from "./pages/DashboardPage";
import styled from "styled-components";
import GlobalStyles from "./styles/globalStyles";
import ErrorPage from "./pages/ErrorPage";
function App() {
  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/select" element={<SelectPage />} />
            <Route path="/dashboard/:id" element={<DashboardPage />} />
            <Route path="/error" element={<ErrorPage />} />
          </Routes>
        </Router>
      </AppContainer>
    </>
  );
}

const AppContainer = styled.main`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
export default App;
