import express from "express";
import {
  fetchUser,
  login,
  logout,
  register,
} from "../controllers/authController.js";

const router = express.Router();

// Route pour register
router.post("/register", register);

// Route pour le login
router.post("/login", login);

// Route pour le logout
router.post("/logout", logout);

// Router pour l'affichage des utilisateurs
router.get("/fetch-user", fetchUser);

export default router;
