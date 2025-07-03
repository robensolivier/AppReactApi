function AffichageErreur({ message, onReessayer }) {
    return (
      <div className="affichage-erreur">
        <div className="message-erreur">
          <span role="img" aria-label="Erreur">⚠️</span>
          <p>{message}</p>
        </div>
        {onReessayer && (
          <button onClick={onReessayer} className="bouton-reessayer">
            Réessayer
          </button>
        )}
      </div>
    );
  }
  
  export default AffichageErreur;