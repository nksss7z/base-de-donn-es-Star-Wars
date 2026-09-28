import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelection } from '../Context/selectioncontext';

interface Character {
  name: string;
  url: string;
  gender: string;
  birth_year: string;
}

export default function Personnages() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [search, setSearch] = useState('');
  const [letterFilter, setLetterFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { selection, ajouterSelection, retirerSelection } = useSelection();

  useEffect(() => {
    fetch('https://swapi.py4e.com/api/people/')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Erreur');
        }
        return res.json();
      })
      .then((data) => {
        setCharacters(data.results || []);
        setLoading(false);
      })
      .catch(() => {
        setError('Impossible de charger les personnages.');
        setLoading(false);
      });
  }, []);

  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  const filteredCharacters = characters.filter((char) => {
    const matchesSearch = char.name.toLowerCase().includes(search.toLowerCase());
    const matchesLetter = letterFilter
      ? char.name.toLowerCase().startsWith(letterFilter.toLowerCase())
      : true;
    return matchesSearch && matchesLetter;
  });

  const getIdFromUrl = (url: string): string => {
    const parts = url.split('/').filter(Boolean);
    return parts[parts.length - 1];
  };

  const isSelected = (id: string) => {
    return selection ? selection.some((item) => String(item.id || item.uid) === String(id)) : false;
  };

  const handleToggle = (char: Character, id: string) => {
    if (isSelected(id)) {
      retirerSelection(id);
    } else {
      ajouterSelection({
        id,
        uid: id,
        name: char.name,
        birth_year: char.birth_year,
        gender: char.gender,
      });
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <p style={{ color: '#ffe81f', fontSize: '1.2rem' }}>
          Chargement des personnages...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <p style={{ color: '#ff6b6b', fontSize: '1.2rem' }}>
          {error}
        </p>
      </div>
    );
  }

  return (
    <div>
      <section className="hero-starwars">
        <h2 className="title-starwars" style={{ fontSize: '2.5rem' }}>PERSONNAGES</h2>
        <p className="subtitle-starwars">Base de données des individus répertoriés</p>

        <div className="search-container" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <input
            type="text"
            className="search-input"
            placeholder="Rechercher un personnage..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={letterFilter}
            onChange={(e) => setLetterFilter(e.target.value)}
            style={{
              padding: '0.6rem 1rem',
              borderRadius: '8px',
              border: '1px solid #ffe81f',
              background: '#000',
              color: '#ffe81f',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            <option value="">Toutes les lettres</option>
            {alphabet.map((letter) => (
              <option key={letter} value={letter}>
                {letter.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </section>

      <div className="characters-grid">
        {filteredCharacters.length > 0 ? (
          filteredCharacters.map((char) => {
            const id = getIdFromUrl(char.url);
            const selected = isSelected(id);

            return (
              <div key={id} className="character-card">
                <div>
                  <h3>{char.name}</h3>
                  <p><strong>Naissance :</strong> {char.birth_year}</p>
                  <p><strong>Genre :</strong> {char.gender}</p>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', alignItems: 'center' }}>
                  <Link
                    to={`/personnages/${id}`}
                    className="btn-detail"
                    style={{ flex: 1, textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}
                  >
                    Fiche →
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleToggle(char, id)}
                    style={{
                      padding: '0.5rem 0.8rem',
                      borderRadius: '6px',
                      border: selected ? '1px solid #eb212e' : '1px solid #ffe81f',
                      background: selected ? 'rgba(235, 33, 46, 0.25)' : 'rgba(255, 232, 31, 0.15)',
                      color: selected ? '#ff6b6b' : '#ffe81f',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {selected ? '★ Retirer' : '☆ Sélectionner'}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p style={{ textAlign: 'center', color: '#94a3b8', gridColumn: '1 / -1' }}>
            Aucun personnage trouvé dans la base.
          </p>
        )}
      </div>
    </div>
  );
}