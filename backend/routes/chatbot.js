const express = require("express");
const { GoogleAuth } = require("google-auth-library");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

// 서비스 계정 키 파일 경로
const SERVICE_ACCOUNT_PATH = "./home-protector-442506-aea1a1161927.json";

// 프로젝트 ID
const PROJECT_ID = "home-protector-442506";

// GoogleAuth 초기화
const auth = new GoogleAuth({
  keyFilename: SERVICE_ACCOUNT_PATH,
  scopes: ["https://www.googleapis.com/auth/cloud-platform"],
});

// POST 요청 처리
router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // 세션 ID 생성
    const sessionId = uuidv4();

    // GoogleAuth 클라이언트 생성
    const client = await auth.getClient();

    // Dialogflow API 요청
    const response = await client.request({
      url: `https://dialogflow.googleapis.com/v2/projects/${PROJECT_ID}/agent/sessions/${sessionId}:detectIntent`,
      method: "POST",
      data: {
        queryInput: {
          text: {
            text: message,
            languageCode: "ko", // 한국어 설정
          },
        },
      },
    });

    // Dialogflow 응답 처리
    const fulfillmentText = response.data.queryResult.fulfillmentText;
    res.json({ response: fulfillmentText });
  } catch (error) {
    console.error("Dialogflow API error:", error);
    res.status(500).json({ error: "Failed to fetch response from Dialogflow" });
  }
});

module.exports = router;
