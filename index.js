import express from "express";
import cors from "cors";
import { route } from "./route/index.js";
import { corsOptionsDelegate } from "./config/cors.js";
import "./config/dotenv.js";

const app = express();
const port = process.env.PORT;

app.all("*", cors(corsOptionsDelegate), route);

app.listen(port, () => {
  console.log(`Server running at port ${port}...`);
});
