const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const chatbotRoutes = require("./routes/chatbot");

const app = express();

// 미들웨어 설정
app.use(bodyParser.json());
app.use(cors());

// 라우트 설정
app.use("/api/chatbot", chatbotRoutes);

// 서버 실행
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
