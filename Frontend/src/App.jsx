import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

import Inicio from "./Pages/Inicio";
import MinNiños from "./pages/MinNiños";
import MinJovenes from "./pages/MinJovenes";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/ministerio-ninos" element={<MinNiños />} />
        <Route path="/ministerio-jovenes" element={<MinJovenes />} />
      </Routes>

      <Footer />
      <WhatsAppButton />
    </BrowserRouter>
  );
}

export default App;
