import {
  describe,
  expect,
  test,
  vi,
  beforeEach,
} from "vitest";

import {
  render,
  screen,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import { BrowserRouter } from "react-router-dom";

import Personnages from "../pages/personnages";
import Contact from "../pages/Contact";

import {
  SelectionProvider,
  useSelection,
} from "../Context/selectioncontext";

const personnages = [
  {
    uid: "1",
    name: "Luke Skywalker",
    url: "https://www.swapi.tech/api/people/1",
  },
  {
    uid: "2",
    name: "Darth Vader",
    url: "https://www.swapi.tech/api/people/2",
  },
  {
    uid: "3",
    name: "R2-D2",
    url: "https://www.swapi.tech/api/people/3",
  },
];

const reponseAPI = {
  message: "ok",
  total_records: 3,
  total_pages: 1,
  previous: null,
  next: null,
  results: personnages,
};

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("Personnages", () => {
  test("1 - affiche les personnages", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => reponseAPI,
      })
    );

    render(
      <BrowserRouter>
        <SelectionProvider>
          <Personnages />
        </SelectionProvider>
      </BrowserRouter>
    );

    expect(
      await screen.findByText("Luke Skywalker")
    ).toBeTruthy();

    expect(
      screen.getByText("Darth Vader")
    ).toBeTruthy();
  });

  test("2 - affiche le chargement", () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation(
        () => new Promise(() => {})
      )
    );

    render(
      <BrowserRouter>
        <SelectionProvider>
          <Personnages />
        </SelectionProvider>
      </BrowserRouter>
    );

    expect(
      screen.getByText(
        "Chargement des personnages..."
      )
    ).toBeTruthy();
  });

  test("3 - affiche une erreur", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(
        new Error()
      )
    );

    render(
      <BrowserRouter>
        <SelectionProvider>
          <Personnages />
        </SelectionProvider>
      </BrowserRouter>
    );

    expect(
      await screen.findByText(
        "Impossible de charger les personnages."
      )
    ).toBeTruthy();
  });

  test("4 - recherche un personnage", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => reponseAPI,
      })
    );

    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <SelectionProvider>
          <Personnages />
        </SelectionProvider>
      </BrowserRouter>
    );

    await screen.findByText(
      "Luke Skywalker"
    );

    const input =
      screen.getByPlaceholderText(
        "Rechercher un personnage..."
      );

    await user.type(input, "Luke");

    expect(
      screen.getByText(
        "Luke Skywalker"
      )
    ).toBeTruthy();

    expect(
      screen.queryByText(
        "Darth Vader"
      )
    ).toBeNull();
  });

  test("5 - filtre par lettre", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => reponseAPI,
      })
    );

    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <SelectionProvider>
          <Personnages />
        </SelectionProvider>
      </BrowserRouter>
    );

    await screen.findByText(
      "Luke Skywalker"
    );

    const select =
      screen.getByRole("combobox");

    await user.selectOptions(
      select,
      "l"
    );

    expect(
      screen.getByText(
        "Luke Skywalker"
      )
    ).toBeTruthy();

    expect(
      screen.queryByText(
        "Darth Vader"
      )
    ).toBeNull();
  });
});

describe("Contact", () => {
  test("6 - affiche le formulaire", () => {
    render(<Contact />);

    expect(
      screen.getByLabelText("Nom")
    ).toBeTruthy();

    expect(
      screen.getByLabelText("Email")
    ).toBeTruthy();

    expect(
      screen.getByLabelText("Message")
    ).toBeTruthy();
  });

  test("7 - affiche le message de succès", async () => {
    const user = userEvent.setup();

    render(<Contact />);

    await user.type(
      screen.getByLabelText("Nom"),
      "Nini"
    );

    await user.type(
      screen.getByLabelText("Email"),
      "test@test.fr"
    );

    await user.type(
      screen.getByLabelText("Message"),
      "Bonjour"
    );

    await user.click(
      screen.getByRole("button", {
        name: "Envoyer",
      })
    );

    expect(
      screen.getByText(
        "Votre message a bien été envoyé !"
      )
    ).toBeTruthy();
  });
});

describe("Selection", () => {
  test("8 - ajoute et retire un personnage", async () => {
    const user = userEvent.setup();

    function TestSelection() {
      const {
        selection,
        ajouterSelection,
        retirerSelection,
      } = useSelection();

      return (
        <>
          <button
            onClick={() =>
              ajouterSelection(
                personnages[0]
              )
            }
          >
            Ajouter
          </button>

          <button
            onClick={() =>
              retirerSelection(
                personnages[0].uid
              )
            }
          >
            Retirer
          </button>

          <p>{selection.length}</p>
        </>
      );
    }

    render(
      <SelectionProvider>
        <TestSelection />
      </SelectionProvider>
    );

    expect(
      screen.getByText("0")
    ).toBeTruthy();

    await user.click(
      screen.getByRole("button", {
        name: "Ajouter",
      })
    );

    expect(
      screen.getByText("1")
    ).toBeTruthy();

    await user.click(
      screen.getByRole("button", {
        name: "Retirer",
      })
    );

    expect(
      screen.getByText("0")
    ).toBeTruthy();
  });
});