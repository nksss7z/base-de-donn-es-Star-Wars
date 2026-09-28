import { Link } from 'react-router-dom';
import { useSelection } from '../Context/selectioncontext';

export default function Selection() {
  const { selection, retirerSelection } = useSelection();

  if (!selection || selection.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
        <h2 className="title-starwars" style={{ fontSize: '2rem' }}>MA SÉLECTION</h2>
        <p style={{ color: '#94a3b8', marginTop: '1rem' }}>
          Aucun personnage dans votre sélection pour le moment.
        </p>
        <Link to="/personnages" className="btn-detail" style={{ display: 'inline-block', marginTop: '1.5rem', padding: '0.8rem 1.5rem', textDecoration: 'none' }}>
          Explorer les personnages →
        </Link>
      </div>
    );
  }

  return (
    <div>
      <section className="hero-starwars">
        <h2 className="title-starwars" style={{ fontSize: '2.5rem' }}>MA SÉLECTION</h2>
        <p className="subtitle-starwars">Vos fiches enregistrées</p>
      </section>

      <div className="characters-grid">
        {selection.map((personnage) => {
          const charId = String(personnage.id || personnage.uid || '');
          return (
            <div key={charId} className="character-card">
              <div>
                <h3>{personnage.name}</h3>
                <p><strong>Naissance :</strong> {personnage.birth_year || 'Inconnu'}</p>
                <p><strong>Genre :</strong> {personnage.gender || 'Inconnu'}</p>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', alignItems: 'center' }}>
                <Link
                  to={`/personnages/${charId}`}
                  className="btn-detail"
                  style={{ flex: 1, textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}
                >
                  Fiche →
                </Link>

                <button
                  type="button"
                  onClick={() => retirerSelection(charId)}
                  style={{
                    padding: '0.5rem 0.8rem',
                    borderRadius: '6px',
                    border: '1px solid #eb212e',
                    background: 'rgba(235, 33, 46, 0.25)',
                    color: '#ff6b6b',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  ★ Retirer
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}