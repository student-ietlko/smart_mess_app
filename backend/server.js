// const express = require("express");
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const cors = require("cors");

// const app = express();
// app.use(express.json());
// app.use(cors());

// // === MongoDB Connection ===
// mongoose.connect("mongodb+srv://smartmess_user:SmartMess123@mywebappcluster.jbfkivh.mongodb.net/userlogin?appName=mywebappCluster", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("✅ MongoDB connected"))
// .catch(err => console.error("❌ MongoDB connection error:", err));

// // === Define User Schema ===
// const userSchema = new mongoose.Schema({
//   rollNumber: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// // === Model ===
// const User = mongoose.model("User", userSchema);

// // === ROUTES ===

// // ➤ Signup route
// app.post("/signup", async (req, res) => {
//   try {
//     const { rollNumber, password } = req.body;

//     // Validation
//     if (!rollNumber || !password)
//       return res.status(400).json({ message: "All fields are required" });

//     // Check if user already exists
//     const existingUser = await User.findOne({ rollNumber });
//     if (existingUser)
//       return res.status(400).json({ message: "User already exists" });

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Save new user
//     const newUser = new User({ rollNumber, password: hashedPassword });
//     await newUser.save();

//     res.status(201).json({ message: "User registered successfully!" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // ➤ Default route
// app.get("/", (req, res) => {
//   res.send("Smart Mess Backend Running ✅");
// });

// // === Start Server ===
// const PORT = 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// === MongoDB Connection ===
// ⚠️ Use %40 instead of @ in the password if it contains '@'
mongoose
  .connect(
    "mongodb+srv://smartmess_user:SmartMess123@mywebappcluster.jbfkivh.mongodb.net/userlogin?appName=mywebappCluster"
  )
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// === Define User Schema ===
const userSchema = new mongoose.Schema({
  rollNumber: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// === Model ===
const User = mongoose.model("User", userSchema);

// === ROUTES ===

// ➤ Signup Route
app.post("/signup", async (req, res) => {
  try {
    let { rollNumber, password } = req.body;

    // Trim whitespace
    rollNumber = rollNumber.trim();
    password = password.trim();

    // Validation
    if (!rollNumber || !password)
      return res.status(400).json({ message: "All fields are required" });

    if (rollNumber.length !== 13 || isNaN(rollNumber))
      return res
        .status(400)
        .json({ message: "Roll Number must be a 13-digit number" });

    // Check if user already exists
    const existingUser = await User.findOne({ rollNumber });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = new User({ rollNumber, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "✅ User registered successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ➤ Login Route
app.post("/login", async (req, res) => {
  try {
    let { rollNumber, password } = req.body;

    // Trim whitespace
    rollNumber = rollNumber.trim();
    password = password.trim();

    // Find user
    const user = await User.findOne({ rollNumber });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid password" });

    res.status(200).json({ message: "✅ Login successful!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

const issueSchema = new mongoose.Schema({
  category: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  isUrgent: { type: Boolean, default: false },
  userRollNo: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Issue = mongoose.model("Issue", issueSchema);

// ➤ POST route (submit issue)
app.post("/hostel-issue", async (req, res) => {
  try {
    const { category, location, description, isUrgent, userRollNo } = req.body;

    if (!category || !location || !description) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    const newIssue = new Issue({
      category,
      location,
      description,
      isUrgent,
      userRollNo,
    });

    await newIssue.save();
    res.status(201).json({ message: "✅ Issue reported successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while submitting issue" });
  }
});

// ➤ GET route (optional: to see all issues)
app.get("/hostel-issue", async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching issues" });
  }
});

// ➤ Default Route
app.get("/", (req, res) => {
  res.send("Smart Mess Backend Running ✅");
});

// === Start Server ===
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
