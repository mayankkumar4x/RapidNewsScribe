const express = require('express');
const axios = require('axios');
const router = express.Router();



router.post('/', async (req, res) => {
  const { text, toLang } = req.body;

  
  const key = process.env.AZURE_TRANSLATOR_KEY;
  const region = process.env.AZURE_TRANSLATOR_REGION;
  
  const endpoint = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0';

  try {
    const response = await axios.post(`${endpoint}&to=${toLang}`, 
      [{ Text: text }],
      {
        headers: {
          'Ocp-Apim-Subscription-Key': key,
          'Ocp-Apim-Subscription-Region': region,
          'Content-type': 'application/json'
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Translation error:', error.response?.data || error.message);
    res.status(500).send('Translation failed');
  }
});

module.exports = router;
