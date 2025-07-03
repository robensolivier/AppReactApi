import { useState } from 'react';
import DetailsPays from './DetailsPays';

function ListePays({ pays }) {
  const [paysSelectionne, setPaysSelectionne] = useState(null);

  if (!pays || pays.length === 0) {
    return <p>Aucun pays à afficher.</p>;
  }

  return (
    <div className="liste-pays">
      {paysSelectionne ? (
        <DetailsPays 
          pays={paysSelectionne} 
          onRetour={() => setPaysSelectionne(null)} 
        />
      ) : (
        <div className="grille-pays">
          {pays.map((pays) => (
            <div 
              key={pays.cca3} 
              className="carte-pays"
              onClick={() => setPaysSelectionne(pays)}
            >
              <img 
                src={pays.flags.png} 
                alt={`Drapeau de ${pays.name.common}`} 
              />
              <h3>{pays.name.common}</h3>
              <p>Capitale: {pays.capital?.[0] || 'Inconnue'}</p>
              <p>Population: {pays.population.toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ListePays;