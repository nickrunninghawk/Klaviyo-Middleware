// server.mjs (or package.json "type": "module")

import express from "express";

const app = express();

// Simple routes
app.get("/", (_, res) => res.send("Hello from Render 🚀"));
app.get("/health", (_, res) => res.send("ok"));

// Render provides PORT as an environment variable.
// Bind to 0.0.0.0 so it's reachable inside the container.
const PORT = process.env.PORT || 8080;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});

