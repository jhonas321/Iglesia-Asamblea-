import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";

import Inicio from "./Pages/Inicio";
import MinNiños from "./pages/MinNiños";
import MinJovenes from "./pages/MinJovenes";
import MinAlabanza from "./pages/MinAlabanza";
import Organigrama from "./pages/Organigrama";
import Reglamento from "./pages/Reglamento";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>

        <Route path="/" element={<Inicio />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ministerio-ninos" element={<MinNiños />} />
        <Route path="/ministerio-jovenes" element={<MinJovenes />} />
        <Route path="/ministerio-alabanza" element={<MinAlabanza />} />
        <Route path="/organigrama" element={<Organigrama />} />
        <Route path="/reglamento" element={<Reglamento />} />
      </Routes>

      <Footer />
      <WhatsAppButton />
    </BrowserRouter>
  );
}

export default App;
