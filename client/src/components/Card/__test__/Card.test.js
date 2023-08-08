import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Card from "../Card";

const cardProps = {
  name: "Sydney",
  phone: "111-111-1111",
  email: "laith@hotmail.com",
  image: { url: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60", alt: "cute cat" },
  favorite: false,
  setFavorite: jest.fn()
};

describe("Card", () => {
  test("should show name of cat", () => {
    render(<Card { ...cardProps } />);
    expect(screen.getByRole("heading", { name: /sydney/i })).toBeInTheDocument();
  });

  test("should show phone number", () => {
    render(<Card { ...cardProps } />);
    expect(screen.getByText(/111-111-1111/i)).toBeInTheDocument();
  });

  test("should show email", () => {
    render(<Card { ...cardProps } />);
    expect(screen.getByText(/laith@hotmail.com/i)).toBeInTheDocument();
  });

  test("should show image with correct src", () => {
    render(<Card { ...cardProps } />);
    expect(screen.getByAltText(/cute cat/i).src).toBe(cardProps.image.url);
  });

  test("should show outlined heart", () => {
    render(<Card { ...cardProps } />);
    expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
    expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
  });

  test("should show filled heart", () => {
    render(<Card { ...cardProps } favorite={true} />);
    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();
    expect(screen.queryByAltText(/outlined heart/i)).not.toBeInTheDocument();
  });
});