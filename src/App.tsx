import { BrowserRouter, Routes, Route, NavLink, Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import { SelectionProvider } from "./Context/selectioncontext";
import "./App.css";

const Accueil = lazy(() => import("./pages/accueil"));
const Personnages = lazy(() => import("./pages/personnages"));
const Selection = lazy(() => import("./pages/selection"));
const PersonnageDetail = lazy(() => import("./pages/PersonnageDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <BrowserRouter>
      <SelectionProvider>
        <header className="main-header">
          <Link to="/" className="brand-logo">STAR WARS</Link>
          <nav>
            <NavLink to="/" end>Accueil</NavLink>
            <NavLink to="/personnages">Personnages</NavLink>
            <NavLink to="/selection">Ma sélection</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>
        </header>

        <main className="app-container">
          <Suspense fallback={<p style={{ textAlign: 'center', marginTop: '3rem', color: '#ffe81f' }}>Connexion au Holonet...</p>}>
            <Routes>
              <Route path="/" element={<Accueil />} />
              <Route path="/personnages" element={<Personnages />} />
              <Route path="/personnages/:id" element={<PersonnageDetail />} />
              <Route path="/selection" element={<Selection />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
      </SelectionProvider>
    </BrowserRouter>
  );
}

export default App;