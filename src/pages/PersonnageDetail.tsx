import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

interface DetailPersonnage {
  name: string;
  height?: string;
  mass?: string;
  hair_color?: string;
  skin_color?: string;
  eye_color?: string;
  birth_year?: string;
  gender?: string;
}

interface ReponseDetail {
  result: {
    properties: DetailPersonnage;
  };
}

function PersonnageDetail() {
  const { id } = useParams();

  const [personnage, setPersonnage] =
    useState<DetailPersonnage | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`https://www.swapi.tech/api/people/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error();
        }

        return response.json();
      })
      .then((data: ReponseDetail) => {
        setPersonnage(data.result.properties);
      })
      .catch(() => {
        setError("Personnage introuvable.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error || personnage === null) {
    return (
      <div>
        <h1>Personnage introuvable</h1>
        <Link to="/personnages">Retour aux personnages</Link>
      </div>
    );
  }

  return (
    <div>
      <h1>{personnage.name}</h1>

      <p>Taille : {personnage.height ?? "Non renseignée"}</p>
      <p>Poids : {personnage.mass ?? "Non renseigné"}</p>
      <p>Cheveux : {personnage.hair_color ?? "Non renseigné"}</p>
      <p>Yeux : {personnage.eye_color ?? "Non renseigné"}</p>
      <p>Année de naissance : {personnage.birth_year ?? "Non renseignée"}</p>
      <p>Genre : {personnage.gender ?? "Non renseigné"}</p>

      <Link to="/personnages">← Retour</Link>
    </div>
  );
}

export default PersonnageDetail;