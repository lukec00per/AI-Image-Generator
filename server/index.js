require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

const { API_KEY } = process.env;

const configuration = new Configuration({
  apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/generate", async (req, res) => {
  console.log(API_KEY);
  const prompt = req.body.prompt;
  console.log(prompt);
  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "512x512",
    });
    console.log(response.data.data[0].url);
    res.send(response.data.data[0].url);
  } catch (err) {
    res.send(err.message);
  }
});

app.listen(5500, () => {
  console.log("server started");
});
