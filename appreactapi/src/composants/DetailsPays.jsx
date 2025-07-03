import Frontieres from './Frontieres';
import IndicateursPays from './IndicateursPays';
import CarteMonnaies from './CarteMonnaies';

function DetailsPays({ pays, onFermer }) {
  return (
    <div className="details-pays">
      <button onClick={onFermer} className="bouton-fermer">
        ×
      </button>
      <h2>{pays.name.common}</h2>
      <img 
        src={pays.flags.png} 
        alt={`Drapeau de ${pays.name.common}`} 
        className="drapeau"
      />
      
      <div className="details-section">
        <IndicateursPays pays={pays} />
        <CarteMonnaies monnaies={pays.currencies} />
        <Frontieres codesFrontieres={pays.borders} />
      </div>
    </div>
  );
}

export default DetailsPays;