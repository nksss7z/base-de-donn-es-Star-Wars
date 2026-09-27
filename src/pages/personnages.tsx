import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type {
  Personnage,
  ReponsePersonnages,
} from "../types/starwars";
import { useSelection } from "../Context/SelectionContext";

function Personnages() {
  const [personnages, setPersonnages] = useState<Personnage[]>([]);
  const [recherche, setRecherche] = useState("");
  const [lettre, setLettre] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const {
    ajouterSelection,
    retirerSelection,
    estSelectionne,
  } = useSelection();

  useEffect(() => {
    fetch(
      "https://www.swapi.tech/api/people?page=1&limit=12"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }

        return response.json();
      })
      .then((data: ReponsePersonnages) => {
        setPersonnages(data.results);
      })
      .catch(() => {
        setError(
          "Impossible de charger les personnages."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const personnagesFiltres = personnages.filter(
    (personnage) => {
      const correspondRecherche =
        personnage.name
          .toLowerCase()
          .includes(recherche.toLowerCase());

      const correspondLettre =
        lettre === "" ||
        personnage.name
          .toLowerCase()
          .startsWith(lettre.toLowerCase());

      return (
        correspondRecherche &&
        correspondLettre
      );
    }
  );

  if (loading) {
    return (
      <p>Chargement des personnages...</p>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Personnages Star Wars</h1>

      <input
        type="text"
        placeholder="Rechercher un personnage..."
        value={recherche}
        onChange={(event) =>
          setRecherche(event.target.value)
        }
      />

      <select
        value={lettre}
        onChange={(event) =>
          setLettre(event.target.value)
        }
      >
        <option value="">
          Toutes les lettres
        </option>
        <option value="a">A</option>
        <option value="b">B</option>
        <option value="c">C</option>
        <option value="d">D</option>
        <option value="l">L</option>
        <option value="r">R</option>
      </select>

      {personnagesFiltres.length === 0 ? (
        <p>Aucun personnage trouvé.</p>
      ) : (
        personnagesFiltres.map((personnage) => {
          const selectionne =
            estSelectionne(personnage.uid);

          return (
            <div key={personnage.uid}>
              <h2>{personnage.name}</h2>

              <Link
                to={`/personnages/${personnage.uid}`}
              >
                Voir le détail
              </Link>

              <br />

              <button
                onClick={() => {
                  if (selectionne) {
                    retirerSelection(
                      personnage.uid
                    );
                  } else {
                    ajouterSelection(personnage);
                  }
                }}
              >
                {selectionne
                  ? "⭐ Retirer de ma sélection"
                  : "☆ Ajouter à ma sélection"}
              </button>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Personnages;