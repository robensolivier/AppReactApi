import { useState, useEffect, useCallback } from 'react';
import BarreRecherche from './composants/BarreRecherche';
import ListePays from './composants/ListePays';
import AffichageErreur from './composants/AffichageErreur';
import DetailsPays from './composants/DetailsPays';
import { obtenirTousPays, obtenirPaysParNom, obtenirPaysParCode } from './services/api';
import './App.css';

function App() {
  const [pays, setPays] = useState([]);
  const [paysSelectionne, setPaysSelectionne] = useState(null);
  const [erreur, setErreur] = useState(null);
  const [chargement, setChargement] = useState(false);

  const gererErreur = useCallback((err) => {
    setPays([]);
    if (err.message === 'NON_TROUVE') {
      setErreur('Aucun pays trouvé avec ce nom. Veuillez essayer une autre recherche.');
    } else if (err.message === 'Failed to fetch') {
      setErreur('Impossible de se connecter à l\'API. Vérifiez votre connexion internet.');
    } else {
      setErreur('Les données reçues sont incomplètes ou corrompues.');
    }
  }, []);

  const chargerTousPays = useCallback(async () => {
    setChargement(true);
    try {
      const donnees = await obtenirTousPays();
      setPays(donnees);
      setErreur(null);
    } catch (err) {
      gererErreur(err);
    } finally {
      setChargement(false);
    }
  }, [gererErreur]);

  useEffect(() => {
    chargerTousPays();
  }, [chargerTousPays]);

  const rechercherPays = async (termeRecherche) => {
    if (!termeRecherche.trim()) {
      chargerTousPays();
      return;
    }

    setChargement(true);
    try {
      const donnees = await obtenirPaysParNom(termeRecherche);
      if (donnees.length === 0) {
        throw new Error('NON_TROUVE');
      }
      setPays(donnees);
      setErreur(null);
    } catch (err) {
      gererErreur(err);
    } finally {
      setChargement(false);
    }
  };

  const chargerDetailsPays = async (codePays) => {
    setChargement(true);
    try {
      const donnees = await obtenirPaysParCode(codePays);
      setPaysSelectionne(donnees);
    } catch (err) {
      gererErreur(err);
    } finally {
      setChargement(false);
    }
  };

  return (
    <div className="app">
      <h1>Informations sur les pays</h1>
      <BarreRecherche onRecherche={rechercherPays} />
      {chargement && <p className="chargement">Chargement en cours...</p>}
      {erreur && <AffichageErreur message={erreur} onReessayer={chargerTousPays} />}
      
      {!chargement && !erreur && (
        <div className="conteneur-principal">
          <ListePays 
            pays={pays} 
            onSelectionPays={chargerDetailsPays} 
          />
          {paysSelectionne && (
            <DetailsPays 
              pays={paysSelectionne} 
              onFermer={() => setPaysSelectionne(null)} 
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;