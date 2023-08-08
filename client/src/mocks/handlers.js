import { rest } from "msw";
import cats from "./cats.json";

export const handlers = [
  rest.get("http://localhost:4000/cats", (rep, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(cats)
    );
  })
];