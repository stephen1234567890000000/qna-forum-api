import express from "express";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import threadRoutes from "./routes/threads.routes";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Welcome to the QnA Forum API" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/threads", threadRoutes);

export default app;
