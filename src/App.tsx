import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Accueil from "./pages/Accueil";
import Personnages from "./pages/Personnages";
import Selection from "./pages/Selection";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <NavLink to="/">Accueil</NavLink>{" "}
        <NavLink to="/personnages">Personnages</NavLink>{" "}
        <NavLink to="/selection">Ma sélection</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/personnages" element={<Personnages />} />
        <Route path="/selection" element={<Selection />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;