import express from "express";
import {
  getRanking,
  getUserStats,
  submitQuizResult,
} from "../controllers/quizController.js";

const router = express.Router();

// Route pour soumettre le résultat du quiz
router.post("/submit-result", submitQuizResult);

// Route pour obtenir les résultats d'un utilisateur
router.get("/stats/:userId", getUserStats);

// Route pour obtenir le classement de l'utilisateur
router.get("/ranking", getRanking);

export default router;
