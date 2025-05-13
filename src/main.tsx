import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/App";
import { UserProvider } from "@/contexts/UserContext";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

createRoot(rootElement).render(
  <StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </StrictMode>
);
