import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

import { lazy, Suspense } from "react";

import { SelectionProvider } from "./Context/selectioncontext";

const Accueil = lazy(() => import("./pages/accueil"));
const Personnages = lazy(() => import("./pages/personnages"));
const Selection = lazy(() => import("./pages/selection"));
const PersonnageDetail = lazy(
  () => import("./pages/PersonnageDetail")
);
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

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

        <Suspense fallback={<p>Chargement...</p>}>
          <Routes>
            <Route path="/" element={<Accueil />} />

            <Route
              path="/personnages"
              element={<Personnages />}
            />

            <Route
              path="/personnages/:id"
              element={<PersonnageDetail />}
            />

            <Route
              path="/selection"
              element={<Selection />}
            />

            <Route
              path="/contact"
              element={<Contact />}
            />

            <Route
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </Suspense>
      </SelectionProvider>
    </BrowserRouter>
  );
}

export default App;