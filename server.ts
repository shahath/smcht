import express from "express";
import path from "path";
import cors from "cors";
import jwt from "jsonwebtoken";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;
const SECRET_KEY = process.env.SECRET_KEY || "fallback_secret_key";

app.use(cors());
app.use(express.json());

// Basic In-Memory Database
const db = {
  users: [
    {
      id: "oba1999_admin",
      uniqueId: "admin_001",
      name: "Admin User",
      email: "admin@smc.edu",
      role: "admin",
      status: "approved",
      password: "password123", // very basic mock
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
    },
    {
      id: "oba2010_102",
      uniqueId: "102",
      name: "Nuwan Silva",
      email: "nuwan@example.com",
      role: "member",
      status: "approved",
      password: "password123",
      profileImage: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=400&q=80",
      batch: "2010",
      profession: "Medicine",
      location: "Kandy"
    },
    {
      id: "oba2015_245",
      uniqueId: "245",
      name: "Supun Fernando",
      email: "supun@example.com",
      role: "member",
      status: "approved",
      password: "password123",
      profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
      batch: "2015",
      profession: "Finance",
      location: "Dubai"
    }
  ],
  events: [
    {
      id: "evt_1",
      title: "Annual General Meeting 2026",
      date: "2026-08-15T18:00:00Z",
      description: "Join us for the Annual General Meeting to discuss upcoming PPA projects and elect the new executive committee. Followed by a fellowship dinner.",
      price: 1500, // Rs.
      attendees: []
    },
    {
      id: "evt_2",
      title: "OBA Cricket Encounter - Big Match",
      date: "2026-10-22T09:00:00Z",
      description: "The classic Past Pupils Cricket Match vs. our traditional rivals. Gather at the Hambantota main grounds to cheer for the old boys.",
      price: 500, // Rs.
      attendees: []
    },
    {
      id: "evt_3",
      title: "PPA Annual Get-Together",
      date: "2026-12-10T19:00:00Z",
      description: "A night of music, memories, and dancing. Live band performance and a buffet dinner for all past pupils of St. Mary's College.",
      price: 3000, // Rs.
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
const authenticate = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    const decoded: any = jwt.verify(token, SECRET_KEY);
    req.user = db.users.find((u) => u.id === decoded.id);
    if (!req.user) throw new Error("User not found");
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

const isAdmin = (req: any, res: any, next: any) => {
  if (req.user?.role !== "admin") return res.status(403).json({ error: "Forbidden" });
  next();
};

// Auth API
app.post("/api/auth/login", (req, res) => {
  const { uniqueId, password } = req.body;
  const user = db.users.find(u => u.uniqueId === uniqueId && u.password === password);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  if (user.status !== "approved") return res.status(403).json({ error: "Account is pending approval" });

  const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: "24h" });
  res.json({ token, user: { id: user.id, name: user.name, role: user.role, profileImage: user.profileImage, uniqueId: user.uniqueId, batch: user.batch } });
});

app.post("/api/auth/register", (req, res) => {
  const { uniqueId, name, email, password, batch } = req.body;
  if (db.users.find(u => u.uniqueId === uniqueId)) {
    return res.status(400).json({ error: "Unique ID already registered" });
  }
  
  const newUser = {
    id: `oba${batch}_${uniqueId}`,
    uniqueId,
    name,
    email,
    password,
    batch,
    role: "member",
    status: "pending",
    profileImage: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&q=80",
  };
  db.users.push(newUser);
  res.json({ message: "Registration submitted. Pending admin approval.", user: newUser });
});

// Admin API
app.get("/api/admin/users", authenticate, isAdmin, (req, res) => {
  res.json(db.users.map(({ password, ...u }) => u));
});

app.post("/api/admin/approve-user/:id", authenticate, isAdmin, (req, res) => {
  const user = db.users.find(u => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  user.status = "approved";
  res.json({ message: "User approved", user: { ...user, password: "" } });
});

// Directory API
app.get("/api/directory", authenticate, (req, res) => {
  const members = db.users
    .filter(u => u.status === "approved" && u.role === "member")
    .map(({ password, role, status, ...u }) => u);
  res.json(members);
});

// Events API
app.get("/api/events", authenticate, (req, res) => {
  res.json(db.events);
});

app.post("/api/events/:id/register", authenticate, (req, res) => {
  const event = db.events.find(e => e.id === req.params.id);
  if (!event) return res.status(404).json({ error: "Event not found" });
  
  if (!event.attendees.includes((req as any).user.id)) {
    event.attendees.push((req as any).user.id);
  }
  res.json({ message: "Successfully registered for event", event });
});

// Payment mock endpoint
app.post("/api/payment", authenticate, (req, res) => {
  const { amount, purpose } = req.body;
  // Mock successful payment
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

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
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
