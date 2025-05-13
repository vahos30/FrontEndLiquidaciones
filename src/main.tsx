import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import '../style/main.scss';
import '../style/liquidation.scss';
import '../style/Loading.scss';
import '../style/tabs.scss';

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
