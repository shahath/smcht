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

// In-memory DB (same shape as server.ts)
const db = {
  users: [
    {
      id: "oba1999_admin",
      uniqueId: "admin_001",
      name: "Admin User",
      email: "admin@smc.edu",
      role: "admin",
      status: "approved",
      password: "password123",
      profileImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80"
    },
    {
      id: "oba2005_76",
      uniqueId: "76",
      name: "Chaminda Perera",
      email: "chaminda@example.com",
      role: "member",
      status: "approved",
      password: "password123",
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      batch: "2005",
      profession: "Engineering",
      location: "Colombo"
    }
  ],
  events: [
    {
      id: "evt_1",
      title: "Annual General Meeting 2026",
      date: "2026-08-15T18:00:00Z",
      description: "Join us for the Annual General Meeting to discuss upcoming PPA projects and elect the new executive committee. Followed by a fellowship dinner.",
      price: 1500,
      attendees: []
    }
  ],
  paymentConfig: {
    bankDetails: {
      accountName: "St. Mary's College OBA",
      accountNumber: "1234567890",
      bankName: "Commercial Bank",
      branch: "Hambantota",
    },
    paymentGateway: {
      provider: "stripe",
      publicKey: "pk_test_123",
      secretKey: "sk_test_123",
      isActive: true
    }
  }
};

// Middleware
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

// Auth
app.post("/api/auth/login", (req, res) => {
  const { uniqueId, password } = req.body;
  const user = db.users.find(u => u.uniqueId === uniqueId && u.password === password);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  if (user.status !== "approved") return res.status(403).json({ error: "Account is pending approval" });

  const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: "24h" });
  res.json({ token, user: { id: user.id, name: user.name, role: user.role, profileImage: user.profileImage, uniqueId: user.uniqueId, batch: user.batch } });
});

// Directory
app.get("/api/directory", authenticate, (req, res) => {
  const members = db.users.filter(u => u.status === 'approved' && u.role === 'member').map(({ password, role, status, ...u }) => u);
  res.json(members);
});

// Events
app.get("/api/events", authenticate, (req, res) => {
  res.json(db.events);
});

app.post("/api/events/:id/register", authenticate, (req, res) => {
  const event = db.events.find(e => e.id === req.params.id);
  if (!event) return res.status(404).json({ error: "Event not found" });
  if (!event.attendees.includes(req.user.id)) event.attendees.push(req.user.id);
  res.json({ message: "Successfully registered for event", event });
});

// Payment mock endpoint
app.post("/api/payment", authenticate, (req, res) => {
  const { amount, purpose } = req.body;
  setTimeout(() => {
    res.json({ success: true, transactionId: `txn_${Math.random().toString(36).substr(2, 9)}`, message: `Payment of $${amount} for ${purpose} successful.` });
  }, 1000);
});

app.get("/api/admin/payment-config", authenticate, isAdmin, (req, res) => {
  res.json(db.paymentConfig);
});

app.post("/api/admin/payment-config", authenticate, isAdmin, (req, res) => {
  db.paymentConfig = { ...db.paymentConfig, ...req.body };
  res.json({ message: "Payment configuration updated successfully", config: db.paymentConfig });
});

app.get("/api/payment-config", authenticate, (req, res) => {
  res.json({
    bankDetails: db.paymentConfig.bankDetails,
    gatewayActive: db.paymentConfig.paymentGateway.isActive,
    provider: db.paymentConfig.paymentGateway.provider,
    publicKey: db.paymentConfig.paymentGateway.publicKey
  });
});

// Static / Vite handling
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: "spa" });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
