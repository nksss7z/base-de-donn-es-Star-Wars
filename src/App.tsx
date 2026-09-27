import { useEffect, useState } from "react";
import type { Personnage, ReponsePersonnages } from "./types/starwars";

function App() {
  const [personnages, setPersonnages] = useState<Personnage[]>([]);

  useEffect(() => {
    fetch("https://www.swapi.tech/api/people?page=1&limit=12")
      .then((response) => response.json())
      .then((data: ReponsePersonnages) => {
        setPersonnages(data.results);
      });
  }, []);

  return (
    <div>
      <h1>Star Wars</h1>
      <p>Catalogue de personnages Star Wars</p>

      <h2>Personnages</h2>

      {personnages.map((personnage) => (
        <p key={personnage.uid}>
          {personnage.name}
        </p>
      ))}
    </div>
  );
}

export default App;