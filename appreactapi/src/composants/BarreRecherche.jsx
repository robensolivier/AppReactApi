import { useState } from 'react';

function BarreRecherche({ onRecherche }) {
  const [termeRecherche, setTermeRecherche] = useState('');

  const soumettreRecherche = (e) => {
    e.preventDefault();
    onRecherche(termeRecherche);
  };

  return (
    <form className="barre-recherche" onSubmit={soumettreRecherche}>
      <input
        type="text"
        placeholder="Rechercher un pays..."
        value={termeRecherche}
        onChange={(e) => setTermeRecherche(e.target.value)}
      />
      <button type="submit">Rechercher</button>
      <button 
        type="button" 
        onClick={() => {
          setTermeRecherche('');
          onRecherche('');
        }}
      >
        Réinitialiser
      </button>
    </form>
  );
}

export default BarreRecherche;