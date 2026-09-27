import { createContext, useContext, useState, type ReactNode } from "react";
import type { Personnage } from "../types/starwars";

interface SelectionContextType {
  selection: Personnage[];
  ajouterSelection: (personnage: Personnage) => void;
  retirerSelection: (uid: string) => void;
  estSelectionne: (uid: string) => boolean;
}

const SelectionContext = createContext<SelectionContextType | undefined>(
  undefined
);

interface SelectionProviderProps {
  children: ReactNode;
}

export function SelectionProvider({ children }: SelectionProviderProps) {
  const [selection, setSelection] = useState<Personnage[]>([]);

  const ajouterSelection = (personnage: Personnage) => {
    setSelection((ancienneSelection) => {
      if (
        ancienneSelection.some(
          (personnageSelectionne) =>
            personnageSelectionne.uid === personnage.uid
        )
      ) {
        return ancienneSelection;
      }

      return [...ancienneSelection, personnage];
    });
  };

  const retirerSelection = (uid: string) => {
    setSelection((ancienneSelection) =>
      ancienneSelection.filter(
        (personnage) => personnage.uid !== uid
      )
    );
  };

  const estSelectionne = (uid: string) => {
    return selection.some((personnage) => personnage.uid === uid);
  };

  return (
    <SelectionContext.Provider
      value={{
        selection,
        ajouterSelection,
        retirerSelection,
        estSelectionne,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
}

export function useSelection() {
  const context = useContext(SelectionContext);

  if (context === undefined) {
    throw new Error(
      "useSelection doit être utilisé dans un SelectionProvider"
    );
  }

  return context;
}