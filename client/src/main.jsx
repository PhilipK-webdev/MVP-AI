import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { StateProvider } from "./context/State.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StateProvider>
      <App />
    </StateProvider>
  </BrowserRouter>
);
