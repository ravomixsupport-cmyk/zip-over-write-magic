import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// App is designed dark-first.
document.documentElement.classList.add("dark");

createRoot(document.getElementById("root")!).render(<App />);
