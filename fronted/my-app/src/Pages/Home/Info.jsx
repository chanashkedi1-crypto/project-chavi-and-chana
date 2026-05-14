import { useContext } from "react";
import { UserContext } from "../../Hooks/UserContext.jsx";
import Section from "./Common/Section.jsx";
import "../../CSS/Info.css";

export default function Info({ onClose }) {
  const { user } = useContext(UserContext);
  if (!user || !user.id) return null;

  return (
    <div className="info-overlay" onClick={onClose}>
      <div className="info-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>

        <h2>User Profile</h2>
        <Section
          title="General"
          fields={[
            { label: "ID", value: user.id },
            { label: "Full Name", value: user.name },
            { label: "Email", value: user.email },
          ]}
        />
      </div>
    </div>
  );
}