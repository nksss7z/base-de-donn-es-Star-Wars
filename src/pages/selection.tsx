import { Link } from "react-router-dom";
import { useSelection } from "../context/SelectionContext";

function Selection() {
  const { selection, retirerSelection } = useSelection();

  return (
    <div>
      <h1>Ma sélection</h1>

      {selection.length === 0 ? (
        <p>Vous n'avez aucun personnage dans votre sélection.</p>
      ) : (
        selection.map((personnage) => (
          <div key={personnage.uid}>
            <h2>{personnage.name}</h2>

            <Link to={`/personnages/${personnage.uid}`}>
              Voir le détail
            </Link>

            <br />

            <button onClick={() => retirerSelection(personnage.uid)}>
              Retirer
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Selection;