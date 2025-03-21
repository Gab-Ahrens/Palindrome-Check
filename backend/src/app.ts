import express from "express";
import cors from "cors";
import palindromeRoutes from "./routes/palindromeRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", palindromeRoutes);

app.get("/", (_req, res) => {
  res.json({ message: "Backend server is running!" });
});

export default app;
