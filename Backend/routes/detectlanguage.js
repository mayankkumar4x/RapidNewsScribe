const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config({ path: './backend/.env' });

router.post('/', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required.' });
  }

  try {
    const response = await axios.post(
      'https://mayanklanguageservice.cognitiveservices.azure.com/text/analytics/v3.0/languages',
      {
        documents: [{ id: '1', text }]
      },
      {
        headers: {
          'Ocp-Apim-Subscription-Key': process.env.AZURE_Language_KEY,
          'Ocp-Apim-Subscription-Region': 'southeastasia',
          'Content-Type': 'application/json'
        }
      }
    );

    const language = response.data.documents?.[0]?.detectedLanguage?.iso6391Name || null;
    res.json(language);
  } catch (error) {
    console.error('Azure API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Language detection failed.' });
  }
});

module.exports = router;
