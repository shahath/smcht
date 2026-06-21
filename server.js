import express from "express";
import path from "path";
import cors from "cors";
import jwt from "jsonwebtoken";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY || "fallback_secret_key";

app.use(cors());
app.use(express.json());

const db = {
  users: [
    { id: "oba1999_admin", uniqueId: "admin_001", name: "Admin User", email: "admin@smc.edu", role: "admin", status: "approved", password: "password123", profileImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80" }
  ],
  events: [],
  paymentConfig: {}
};

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = db.users.find((u) => u.id === decoded.id);
    if (!req.user) throw new Error("User not found");
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") return res.status(403).json({ error: "Forbidden" });
  next();
};

app.post("/api/auth/login", (req, res) => {
  const { uniqueId, password } = req.body;
  const user = db.users.find((u) => u.uniqueId === uniqueId && u.password === password);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  if (user.status !== "approved") return res.status(403).json({ error: "Account is pending approval" });
  const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: "24h" });
  res.json({ token, user: { id: user.id, name: user.name, role: user.role, profileImage: user.profileImage, uniqueId: user.uniqueId } });
});

app.get("/api/payment-config", authenticate, (req, res) => {
  res.json({});
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: "spa" });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
