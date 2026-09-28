import { Link } from 'react-router-dom';

export default function Accueil() {
  return (
    <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
      <section className="hero-starwars">
        <h1 className="title-starwars">HOLOCRON GALACTIQUE</h1>
        <p className="subtitle-starwars" style={{ marginTop: '1rem', color: '#e2e8f0' }}>
          Bienvenue sur l'archive ultime de la galaxie Star Wars.
        </p>
        <p style={{ maxWidth: '600px', margin: '1.5rem auto', color: '#94a3b8', fontSize: '1.1rem', lineHeight: '1.6' }}>
          Explorez les profils des héros, des Sith et des créatures légendaires. Conservez vos fiches préférées dans votre sélection personnelle.
        </p>

        <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            to="/personnages"
            style={{
              padding: '0.9rem 2rem',
              background: '#ffe81f',
              color: '#000',
              fontWeight: 'bold',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '1.1rem',
              boxShadow: '0 0 15px rgba(255, 232, 31, 0.4)',
              transition: 'all 0.3s ease'
            }}
          >
            Explorer les personnages →
          </Link>
          <Link
            to="/selection"
            style={{
              padding: '0.9rem 2rem',
              background: 'rgba(46, 156, 202, 0.15)',
              border: '1px solid #2e9cca',
              color: '#2e9cca',
              fontWeight: 'bold',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '1.1rem',
              transition: 'all 0.3s ease'
            }}
          >
            Voir ma sélection
          </Link>
        </div>
      </section>
    </div>
  );
}