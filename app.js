import fs from "fs";
import https from "https";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Local HTTPS with mkcert ✅");
});

app.post("/partial-shipment", (req, res) => {
  res.send("Local HTTPS with mkcert ✅");
});

const key = fs.readFileSync("./server.key");
const cert = fs.readFileSync("./server.cert");

https.createServer({ key, cert }, app).listen(3000, () => {
  console.log("HTTPS server running at https://localhost:3000");
});
