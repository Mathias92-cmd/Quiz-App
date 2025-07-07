import mongoose, { mongo } from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },

  // Systeme pour faire le classement des utilisateurs sur les différents quiz
  totalScore: { type: Number, default: 0 },
  totalQuizzes: { type: Number, default: 0 },
  bestScore: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  averageScore: { type: Number, default: 0 },
  experience: { type: Number, default: 0 },
});

const User = mongoose.models.user || mongoose.model("User", userSchema);

export default User;
