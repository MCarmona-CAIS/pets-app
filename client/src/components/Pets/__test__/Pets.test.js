import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { handlers } from "../../../mocks/handlers";
import Pets from "../Pets";

const server = setupServer(...handlers);

beforeEach(() => render(<Pets />));
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("Pets", () => {
  test("should render the correct about cards", async () => {
    const cards = await screen.findAllByRole("article");
    expect(cards.length).toBe(5);
  });

  test("should filter for male cats", async () => {
    const cards = await screen.findAllByRole("article");
    userEvent.selectOptions(screen.getByLabelText(/gender/i), "male");
    const maleCards = screen.getAllByRole("article");

    expect(maleCards).toStrictEqual([cards[1], cards[3]]);
  });

  test("should filter for female cats", async () => {
    const cards = await screen.findAllByRole("article");
    userEvent.selectOptions(screen.getByLabelText(/gender/i), "female");
    const femaleCards = screen.getAllByRole("article");

    expect(femaleCards).toStrictEqual([cards[0], cards[2], cards[4]]);
  });

  test("should toggle heart status", async () => {
    const cards = await screen.findAllByRole("article");
    const card = within(cards[2]);
    const button = card.getByRole("button");
    userEvent.click(button);
    expect(card.getByAltText(/filled heart/i)).toBeInTheDocument();
    expect(card.queryByAltText(/outlined heart/i)).not.toBeInTheDocument();

    userEvent.click(button);
    expect(card.getByAltText(/outlined heart/i)).toBeInTheDocument();
    expect(card.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
  });

  test("should filter by male gender", async () => {
    const cards = await screen.findAllByRole("article");
    const select = screen.getByLabelText(/gender/i);
    userEvent.selectOptions(select, "male");

    expect(screen.getAllByRole("article")).toStrictEqual([cards[1], cards[3]]);
  });

  test("should filter by favorite", async () => {
    const cards = await screen.findAllByRole("article");
    userEvent.click(within(cards[2]).getByRole("button"));
    userEvent.click(within(cards[4]).getByRole("button"));

    const select = screen.getByLabelText(/favorite/i);
    userEvent.selectOptions(select, "favorite");

    expect(screen.getAllByRole("article")).toStrictEqual([cards[2], cards[4]]);
  });

  test("should filter not favorite female cats", async () => {
    const cards = await screen.findAllByRole("article");
    userEvent.click(within(cards[0]).getByRole("button"));
    userEvent.click(within(cards[4]).getByRole("button"));

    userEvent.selectOptions(screen.getByLabelText(/gender/i), "female");
    userEvent.selectOptions(screen.getByLabelText(/favorite/i), "not favorite");

    expect(screen.getAllByRole("article")).toStrictEqual([cards[2]]);
  });
});