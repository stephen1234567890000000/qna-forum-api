import express from "express";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Welcome to the QnA Forum API" });
});


app.use("/api/auth", authRoutes);

export default app;