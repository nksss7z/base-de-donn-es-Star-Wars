import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Accueil from "./pages/accueil";
import Personnages from "./pages/personnages";
import Selection from "./pages/selection";
import PersonnageDetail from "./pages/PersonnageDetail";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { SelectionProvider } from "./Context/selectioncontext";

function App() {
  return (
    <BrowserRouter>
      <SelectionProvider>
        <nav>
          <NavLink to="/">Accueil</NavLink>{" "}
          <NavLink to="/personnages">Personnages</NavLink>{" "}
          <NavLink to="/selection">Ma sélection</NavLink>{" "}
          <NavLink to="/contact">Contact</NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<Accueil />} />

          <Route path="/personnages" element={<Personnages />} />

          <Route
            path="/personnages/:id"
            element={<PersonnageDetail />}
          />

          <Route path="/selection" element={<Selection />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </SelectionProvider>
    </BrowserRouter>
  );
}

export default App;