function IndicateursPays({ pays }) {
    return (
      <div className="indicateurs">
        <h3>Indicateurs</h3>
        <ul>
          <li>Population: {pays.population.toLocaleString()}</li>
          <li>Capitale: {pays.capital?.join(', ') || 'Inconnue'}</li>
          <li>Région: {pays.region}</li>
          <li>Langues: {Object.values(pays.languages || {}).join(', ')}</li>
        </ul>
      </div>
    );
  }
  
  export default IndicateursPays;