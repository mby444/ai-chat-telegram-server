import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDB } from "./database/connection.js";
import { route } from "./route/index.js";
import { corsOptionsDelegate } from "./config/cors.js";
import { route as chatRoute } from "./route/chat.js";
import "./config/dotenv.js";

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use("/chat", cors(corsOptionsDelegate), chatRoute);
app.use("*", cors(corsOptionsDelegate), route);

connectDB(() => {
  app.listen(port, () => {
    console.log(`Server running at port ${port}...`);
  });
});
