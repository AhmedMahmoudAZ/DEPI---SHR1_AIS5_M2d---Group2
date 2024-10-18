import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <div className="bg-[#f9f6f1]">
    <StrictMode>
      <App />
    </StrictMode>
  </div>
);
