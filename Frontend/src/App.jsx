import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Inicio from "./Pages/Inicio";
import WhatsAppButton from "./components/WhatsAppButton";

function App() {
  return (
    <>
      <Navbar />
      <Inicio />
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default App;