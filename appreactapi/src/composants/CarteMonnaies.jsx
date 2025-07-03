function CarteMonnaies({ monnaies }) {
    if (!monnaies) return <p>Aucune information monétaire disponible</p>;
  
    return (
      <div className="monnaies">
        <h3>Monnaies</h3>
        <ul>
          {Object.entries(monnaies).map(([code, info]) => (
            <li key={code}>
              {info.name} ({info.symbol || '?'}) - {code}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default CarteMonnaies;