import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

import { HelmetProvider } from "react-helmet-async";

import "./index.css";
import { router } from "./Routes/Routes.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="max-w-screen-xl mx-auto">
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </div>
  </StrictMode>
);
