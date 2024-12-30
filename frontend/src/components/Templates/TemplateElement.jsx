const TemplateElement = ({ plantilla, onDelete, onCreatePlan, type, onModify }) => {
  return (
    <div className="plantilla">
      <p className="plantillaNombre">{plantilla.nombre}</p>
      <p>{plantilla.transporte}</p>
      <div className="spacing"></div>
      <p>{plantilla.alojamiento}</p>
      <div className="spacing"></div>

      {plantilla.actividades && plantilla.actividades.length > 0 ? (
        <div>
          <ul>
            {plantilla.actividades.map((actividad, i) => (
              <li key={i}>{actividad}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No hay actividades disponibles.</p>
      )}

      <p className="plantillaPrecio">
        {plantilla.precio} €
      </p>

      {type === "plantilla" && (
        <button className="modifyButton" onClick={() => onModify(plantilla)}>
          Modificar
        </button>
      )}

      {onCreatePlan && (
        <button className="createPlanButton" onClick={onCreatePlan}>
          Crear Plan de Viaje
        </button>
      )}
      {onDelete && (
        <button className="deleteButton" onClick={onDelete}>
          Eliminar
        </button>
      )}
    </div>
  );
};

export default TemplateElement;

