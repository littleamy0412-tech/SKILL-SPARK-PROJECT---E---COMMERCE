import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n.js";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import AUTHENTICATE from "./datas/Authentications.jsx";
import USERDATA from "./datas/User_data.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AUTHENTICATE>
      <USERDATA>
        <App />
      </USERDATA>
    </AUTHENTICATE>
  </BrowserRouter>
);
