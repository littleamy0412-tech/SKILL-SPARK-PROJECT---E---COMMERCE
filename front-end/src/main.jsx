import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n.js";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import AUTHENTICATE from "./datas/Authentications.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AUTHENTICATE>
      <App />
    </AUTHENTICATE>
  </BrowserRouter>
);
