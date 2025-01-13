import express from "express";
import { register, login, logout } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register); // This will handle POST requests to /api/auth/register
router.post("/login", login);
router.post("/logout", logout);

export default router;
