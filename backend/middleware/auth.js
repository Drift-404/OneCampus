router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    console.log("📩 Register request received:", req.body);

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, user: { id: newUser._id, name, email, role } });
  } catch (err) {
    console.error("❌ Registration error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});
