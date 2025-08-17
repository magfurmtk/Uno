import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/history", (req, res) => {
  const page = parseInt(req.query.page || 1);
  const data = JSON.parse(fs.readFileSync("./history.json"));
  const start = (page - 1) * 10;
  res.json(data.slice(start, start + 10));
});

app.get("/api/reward-graph", (req, res) => {
  const user = req.query.user?.toLowerCase();
  if (!user) return res.json([]);

  const all = JSON.parse(fs.readFileSync("./reward.json"));
  const filtered = all.filter((x) => x.user.toLowerCase() === user);
  res.json(filtered);
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`🚀 API Server running on port ${process.env.PORT || 3001}`);
});
