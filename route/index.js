import { Router } from "express";

export const route = Router();

route.all("/", (req, res) => {
  res.sendStatus(200);
});

route.all("*", (req, res) => {
  res
    .json({
      status: "fail",
      statusCode: 404,
      message: "",
      errorMessage: "not found",
    })
    .status(404);
});
