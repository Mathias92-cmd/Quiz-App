import User from "../models/user.models.js";

export const updateUserStats = async (
  userId,
  newScore,
  totalQuestions,
  difficulty
) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("Utilisateur non trouvé ! ");
    }

    const xpGained = calculateXP(newScore, totalQuestions, difficulty);

    user.totalScore += newScore;
    user.totalQuizzes += 1;
    user.averageScore = user.totalScore / user.totalQuizzes;
    user.experience += xpGained;
    user.level = calculateLevel(user.experience);
    await user.save();
    return { user, xpGained };
  } catch (error) {
    throw new Error(
      `Erreur lors de la mise à jour des statistiques de l'utilisateur : ${error.message}`
    );
  }
};

export const calculateXP = (score, totalQuestions, difficulty) => {
  const baseXP = (score / totalQuestions) * 100;

  const difficultyMultiplier = {
    easy: 1,
    medium: 1.5,
    hard: 2.25,
  };
  // On prend le multiplicateur en fonction de sa difficulté , 1 par default
  const multiplier = difficultyMultiplier[difficulty] || 1;
  return Math.round(baseXP * multiplier);
};

export const calculateLevel = (totalXP) => {
  let level = 1;
  let xpRequired = 100; // On a besoin de 100 xp pour passer au niveau 2
  let currentXP = totalXP;

  // Tant que l'utilisateur a assez d'XP pour passer au niveau suivant
  while (currentXP >= xpRequired) {
    // On soustrait l'XP requis pour passer au niveau suivant
    currentXP -= xpRequired;
    level++;
    xpRequired = Math.round(xpRequired * 1.2);
  }

  return level;
};

export const getXPForNextLevel = (currentLevel) => {
  let xpRequired = 100;
  for (let i = 1; i < currentLevel; i++) {
    xpRequired = Math.round(xpRequired * 1.2);
  }
  return xpRequired;
};

export const getUserProgression = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("Utilisateur non trouvé ! ");
    }

    const currentLevel = user.level;
    const xpForNextLevel = getXPForNextLevel(currentLevel);

    let xpUsed = 0;
    let xpRequired = 100; // XP requis pour le niveau 2
    for (let i = 1; i < currentLevel; i++) {
      xpUsed += xpRequired;
      xpRequired = Math.round(xpRequired * 1.2);
    }

    const xpInCurrentLevel = user.experience - xpUsed;
    const progressPercentage = (xpInCurrentLevel / xpForNextLevel) * 100;
    return {
      currentLevel,
      experience: user.experience,
      xpForNextLevel: xpForNextLevel,
      progressPercentage: Math.round(progressPercentage),
    };
  } catch (error) {
    throw new Error(
      `Erreur lors de la récupération de la progression de l'utilisateur : ${error.message}`
    );
  }
};
