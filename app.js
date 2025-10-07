// server.mjs (or package.json "type": "module")

import express from "express";
import { Webhook } from "standardwebhooks";

const app = express();
const CLIENT_SECRET = "4a4f15c9e88d77553dbaa18bf101cc9ba6f5fce8bbba9c2f86f6984fac0ae074";
const webhook = new Webhook(Buffer.from(CLIENT_SECRET, "utf8").toString("base64"));

// Simple routes
app.get("/", express.raw({ type: "*/*" }), (_, res) => {

    res.send("Hello from Render 🚀")
});
app.get("/health", (_, res) => res.send("ok"));

app.post("/klaviyo", express.raw({ type: "*/*" }), (req, res) => {
    // Process the webhook payload here 
    console.log("Received Klaviyo webhook:", req.body);
    console.log("Headers:", req.headers);
    const isVerified = webhook.verify(req.headers, req.body)
    console.log("Webhook verified:", isVerified);


    res.status(200).send("Webhook received");
});

// Render provides PORT as an environment variable.
// Bind to 0.0.0.0 so it's reachable inside the container.
const PORT = process.env.PORT || 8080;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});

