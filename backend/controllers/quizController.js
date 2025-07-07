import User from "../models/user.models.js";
import {
  getUserProgression,
  updateUserStats,
} from "../service/updateUserStats.js";

export const submitQuizResult = async (req, res) => {
  try {
    const { userId, score, totalQuestions, difficulty } = req.body;

    if (!userId || !score || !totalQuestions || !difficulty) {
      return res.status(400).json({
        success: false,
        message: "Données manquantes",
      });
    }

    const result = await updateUserStats(
      userId,
      score,
      totalQuestions,
      difficulty
    );

    res.status(200).json({
      success: true,
      message: "Résultat du quizz enregistrée ",
      data: {
        user: result.user,
        xpGained: result.xpGained,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserStats = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select("-password");
    const progression = await getUserProgression(userId);

    res.status(200).json({
      success: false,
      data: {
        user,
        progression,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRanking = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const ranking = await User.find()
      .sort({ totalScore: -1 })
      .limit(parseInt(limit))
      .select("username totalScore level averageScore totalQuizzes");

    res.status(200).json({
      success: true,
      data: ranking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
