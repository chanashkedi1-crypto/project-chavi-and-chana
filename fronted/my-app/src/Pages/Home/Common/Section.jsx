

export default function InfoSection({ title, fields }) {
  return (
    <div className="info-section">
      <h4>{title}</h4>

      {fields.map((field, index) => (
        <p key={index}>
          <b>{field.label}:</b>{" "}
          {field.value !== undefined && field.value !== null && field.value !== ""
            ? field.value
            : "—"}
        </p>
      ))}
    </div>
  );
}