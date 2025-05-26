const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const recommendRoutes = require("./routes/recommend");
const authRoutes = require("./routes/auth");
const faqRoutes = require("./routes/faq");
const questionnaireRoutes = require("./routes/questionnaire");
const userRoutes = require("./routes/user");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/recommend", recommendRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/questionnaire", questionnaireRoutes);
app.use("/api/users", userRoutes);

mongoose
  .connect("mongodb://localhost:27017/careerknow", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
