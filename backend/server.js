const express = require("express");
const session = require("express-session");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");
const path = require("path");

// ROUTES
const authRoutes = require("./routes/authRoutes")

const app = express();
const port = process.env.PORT || 5000;
const { prisma } = require("./constants/config");
const PrismaStore = require("./lib/index")(session);

// Cors
app.use(
  cors({
    origin: ["http://localhost:3005", "http://localhost:5000"],
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD", "DELETE", "PATCH"],
    credentials: true,
  })
);

// Session
app.use(
  session({
    name: "sess",
    secret: "secret",
    resave: "false",
    saveUninitialized: false,
    store: new PrismaStore({ client: prisma }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ROUTES
app.use("/api", authRoutes)

app.listen(port, () => {
  console.log(`SERVER RUNNING : ${port}`);
});
