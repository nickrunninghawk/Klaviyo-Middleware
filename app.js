// server.mjs (or package.json "type": "module")

import express from "express";

const app = express();

// Simple routes
app.get("/", (_, res) => res.send("Hello from Render 🚀"));
app.get("/health", (_, res) => res.send("ok"));

app.post("/klaviyo", (req, res) => {
    // Process the webhook payload here 
    console.log("Received Klaviyo webhook:", req.body);
    console.log("Headers:", req.headers);
    res.status(200).send("Webhook received");
});

// Render provides PORT as an environment variable.
// Bind to 0.0.0.0 so it's reachable inside the container.
const PORT = process.env.PORT || 8080;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});

