const allowlist = ["https://ai-chat-telegram.bimayudha161.workers.dev/"];

export const corsOptionsDelegate = (req, callback) => {
  const corsOptions = { origin: false };
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions.origin = true;
  }
  callback(null, corsOptions);
};
