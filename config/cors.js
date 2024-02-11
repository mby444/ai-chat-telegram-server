import "../config/dotenv.js";

const workerUrl = process.env.WORKER_URL;

export const corsOptionsDelegate = (req, callback) => {
  const allowlist = [workerUrl];
  const corsOptions = { origin: false };
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions.origin = true;
  }
  callback(null, corsOptions);
};
