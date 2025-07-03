import { useState, useEffect } from 'react';
import { obtenirPaysParCode } from '../services/api';

function Frontieres({ codesFrontieres }) {
  const [paysFrontaliers, setPaysFrontaliers] = useState([]);
  const [chargement, setChargement] = useState(false);

  useEffect(() => {
    if (codesFrontieres?.length > 0) {
      setChargement(true);
      Promise.all(codesFrontieres.slice(0, 5).map(code => obtenirPaysParCode(code)))
        .then(resultats => {
          setPaysFrontaliers(resultats.filter(Boolean));
        })
        .finally(() => setChargement(false));
    }
  }, [codesFrontieres]);

  return (
    <div className="frontieres">
      <h3>Pays Frontaliers</h3>
      {chargement ? (
        <p>Chargement...</p>
      ) : (
        <div className="liste-frontieres">
          {paysFrontaliers.length > 0 ? (
            paysFrontaliers.map(pays => (
              <span key={pays.cca3} className="badge-frontiere">
                {pays.name.common}
              </span>
            ))
          ) : (
            <p>Aucun pays frontalier</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Frontieres;