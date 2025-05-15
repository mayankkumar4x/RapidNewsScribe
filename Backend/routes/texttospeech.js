const express = require('express');
const axios = require('axios');
// const fs = require('fs');
const builder = require('xmlbuilder');
const router = express.Router();
require('dotenv').config({ path: './backend/.env' });

const AZURE_TTS_KEY = process.env.AZURE_TTS_KEY;
const REGION = 'eastus'; // or your region

router.post('/', async (req, res) => {
  const { text, voice = 'en-US-JennyNeural' } = req.body;

  if (!text) return res.status(400).json({ error: 'Text is required.' });

  try {
    // Step 1: Get access token
    const tokenResponse = await axios.post(
      `https://${REGION}.api.cognitive.microsoft.com/sts/v1.0/issuetoken`,
      null,
      {
        headers: {
          'Ocp-Apim-Subscription-Key': AZURE_TTS_KEY,
          'Content-Length': '0'
        }
      }
    );

    const accessToken = tokenResponse.data;

    // Step 2: Create SSML body
    const ssml = builder
      .create('speak')
      .att('version', '1.0')
      .att('xml:lang', 'en-US')
      .ele('voice')
      .att('xml:lang', 'en-US')
      .att('name', voice)
      .txt(text)
      .end();

    // Step 3: Call TTS endpoint
    const audioResponse = await axios.post(
      `https://${REGION}.tts.speech.microsoft.com/cognitiveservices/v1`,
      ssml,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/ssml+xml',
          'X-Microsoft-OutputFormat': 'audio-16khz-32kbitrate-mono-mp3'
        },
        responseType: 'arraybuffer'
      }
    );

    // Step 4: Return audio buffer
    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': audioResponse.data.length
    });

    res.send(audioResponse.data);

  } catch (err) {
    console.error('Text-to-speech error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Text-to-speech failed.' });
  }
});

module.exports = router;
