import "../styles/ministries.css";
import { FaChild, FaUsers, FaMusic } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ministries = [
  {
    icon: <FaChild />,
    title: "Ministerio de Niños",
    text: "Formación bíblica y actividades para los más pequeños en un ambiente seguro y alegre.",
    image:
      "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=80",
    path: "/ministerio-ninos",
  },
  {
    icon: <FaUsers />,
    title: "Ministerio de Jóvenes",
    text: "Encuentros y enseñanzas para fortalecer la identidad, la fe y el propósito en Cristo.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
    path: "/ministerio-jovenes",
  },
  {
    icon: <FaMusic />,
    title: "Ministerio de Alabanza",
    text: "Adoramos a Dios con excelencia, pasión y reverencia a través de la música.",
    image:
      "https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&w=1200&q=80",
    path: "/ministerio-alabanza",
  },
];

function Ministries() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <section className="ministries" id="ministerios">
      <div className="section-title">
        <h2>Ministerios</h2>
        <p>
          Espacios diseñados para cada etapa de la vida y el crecimiento
          espiritual.
        </p>
      </div>

      <div className="ministries-wrapper">
        {ministries.map((item, index) => (
          <article
            className="ministry-card"
            key={index}
            onClick={() => handleNavigate(item.path)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleNavigate(item.path);
              }
            }}
          >
            <div className="ministry-image">
              <img src={item.image} alt={item.title} />
              <div className="overlay"></div>
            </div>

            <div className="ministry-info">
              <div className="ministry-content">
                <div className="ministry-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Ministries;