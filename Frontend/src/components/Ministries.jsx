import "../styles/ministries.css";
import {
  FaChild,
  FaUsers,
  FaMusic,
  FaUserTie,
  FaHandsPraying,
  FaHandHoldingHeart,
} from "react-icons/fa6";

const ministries = [
  {
    icon: <FaChild />,
    title: "Ministerio de Niños",
    text: "Formación bíblica y actividades para los más pequeños en un ambiente seguro y alegre.",
  },
  {
    icon: <FaUsers />,
    title: "Ministerio de Jóvenes",
    text: "Encuentros y enseñanzas para fortalecer la identidad, la fe y el propósito en Cristo.",
  },
  {
    icon: <FaMusic />,
    title: "Ministerio de Alabanza",
    text: "Adoramos a Dios con excelencia, pasión y reverencia a través de la música.",
  },
  {
    icon: <FaUserTie />,
    title: "Líderes Locales",
    text: "Formación y acompañamiento para fortalecer el liderazgo espiritual dentro de la iglesia.",
  },
  {
    icon: <FaHandsPraying />,
    title: "Oración",
    text: "Espacios especiales para interceder, buscar a Dios y fortalecer la vida espiritual.",
  },
  {
    icon: <FaHandHoldingHeart />,
    title: "Servicio Social",
    text: "Apoyo a familias y acciones solidarias para impactar positivamente a nuestra comunidad.",
  },
];

function Ministries() {
  return (
    <section className="ministries" id="ministerios">
      <div className="section-title">
        <span className="section-badge">Nuestra Iglesia</span>
        <h2>Ministerios</h2>
        <p>
          Espacios diseñados para cada etapa de la vida y el crecimiento espiritual.
        </p>
      </div>

      <div className="ministries-grid">
        {ministries.map((item, index) => (
          <div className="ministry-card" key={index}>
            <div className="ministry-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Ministries;