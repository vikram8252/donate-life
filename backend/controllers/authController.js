import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ================= SIGNUP =================
export const signup = async (req, res) => {
  try {
    const { name, email, password, adminCode } = req.body;

    // ✅ validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ check existing user
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ assign role
    const role =
      adminCode && adminCode === process.env.ADMIN_CODE
        ? "admin"
        : "user";

    // ✅ create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // ✅ check JWT secret
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing in .env");
    }

    // ✅ generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      token,
      role: user.role,
      name: user.name,
    });

  } catch (err) {
    console.error("SIGNUP ERROR:", err); // 🔥 debug
    res.status(500).json({ message: err.message });
  }
};


// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ validation
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ check password exists
    if (!user.password) {
      throw new Error("User password missing in DB");
    }

    // ✅ compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ check JWT secret
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is missing in .env");
    }

    // ✅ generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      role: user.role,
      name: user.name,
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err); // 🔥 debug
    res.status(500).json({ message: err.message });
  }
};