import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SelectPage from "./pages/SelectPage";
import DashboardPage from "./pages/DashboardPage";
import styled from "styled-components";
import GlobalStyles from "./styles/globalStyles";
function App() {
  return (
    <AppContainer>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/select" element={<SelectPage />} />
          <Route path="/dashboard/:id" element={<DashboardPage />} />
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
