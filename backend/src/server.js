import express from "express";
import { ENV } from "./config/env.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const port = ENV.PORT || 3001;

app.get("/", (req, res) => res.send("Hello from server"));

// error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: err.message || "Internal server error" });
});

app.listen(port, () => {
  console.log("server is running on port", port);
});
