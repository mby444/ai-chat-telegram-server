import { Router } from "express";

export const route = Router();

route.all("*", (req, res) => {
  res
    .json({
      statusCode: 404,
    })
    .status(404);
});
