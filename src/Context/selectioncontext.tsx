import { createContext, useContext, useState, type ReactNode } from 'react';

export interface SelectedCharacter {
  id?: string;
  uid?: string;
  name: string;
  birth_year?: string;
  gender?: string;
  url?: string;
  [key: string]: any;
}

interface SelectionContextType {
  selection: SelectedCharacter[];
  ajouterSelection: (item: SelectedCharacter) => void;
  retirerSelection: (id: string) => void;
  clearSelection: () => void;
}

const SelectionContext = createContext<SelectionContextType | undefined>(undefined);

export const SelectionProvider = ({ children }: { children: ReactNode }) => {
  const [selection, setSelection] = useState<SelectedCharacter[]>([]);

  const ajouterSelection = (item: SelectedCharacter) => {
    setSelection((prev) => {
      const itemId = String(item.id || item.uid || '');
      if (prev.some((char) => String(char.id || char.uid) === itemId)) {
        return prev;
      }
      return [...prev, { ...item, id: itemId, uid: itemId }];
    });
  };

  const retirerSelection = (id: string) => {
    setSelection((prev) =>
      prev.filter((char) => String(char.id || char.uid) !== String(id))
    );
  };

  const clearSelection = () => {
    setSelection([]);
  };

  return (
    <SelectionContext.Provider
      value={{ selection, ajouterSelection, retirerSelection, clearSelection }}
    >
      {children}
    </SelectionContext.Provider>
  );
};

export const useSelection = () => {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error("useSelection doit être utilisé dans un SelectionProvider");
  }
  return context;
};