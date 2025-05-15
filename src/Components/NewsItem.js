import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {API_URL} from '../api';
const languageToVoiceMap = {
  af: 'af-ZA-AdriNeural',           // Afrikaans
  ar: 'ar-SA-HamedNeural',          // Arabic
  bn: 'bn-IN-TanishaaNeural',       // Bengali (India)
  de: 'de-DE-KatjaNeural',          // German
  en: 'en-US-JennyNeural',          // English (US)
  es: 'es-ES-ElviraNeural',         // Spanish (Spain)
  fr: 'fr-FR-DeniseNeural',         // French (France)
  gu: 'gu-IN-DhwaniNeural',         // Gujarati (India)
  hi: 'hi-IN-SwaraNeural',          // Hindi
  id: 'id-ID-GadisNeural',          // Indonesian
  it: 'it-IT-ElsaNeural',           // Italian
  ja: 'ja-JP-NanamiNeural',         // Japanese
  kn: 'kn-IN-SapnaNeural',          // Kannada (India)
  ko: 'ko-KR-SunHiNeural',          // Korean
  ml: 'ml-IN-SobhanaNeural',        // Malayalam (India)
  mr: 'mr-IN-AarohiNeural',         // Marathi (India)
  nl: 'nl-NL-ColetteNeural',        // Dutch
  pa: 'pa-IN-GurpreetNeural',       // Punjabi (India)
  pt: 'pt-BR-FranciscaNeural',      // Portuguese (Brazil)
  ru: 'ru-RU-DariyaNeural',         // Russian
  ta: 'ta-IN-PallaviNeural',        // Tamil (India)
  te: 'te-IN-ShrutiNeural',         // Telugu (India)
  th: 'th-TH-PremwadeeNeural',      // Thai
  tr: 'tr-TR-EmelNeural',           // Turkish
  ur: 'ur-PK-AsadNeural',           // Urdu (Pakistan)
  zh: 'zh-CN-XiaoxiaoNeural',       // Chinese (Mandarin, Simplified)
  he: 'he-IL-AvriNeural',
  kn: 'kn-IN-SapnaNeural',
  or: 'or-IN-MadhurNeural',  // Odia (India)
  as: 'as-IN-DibyaNeural'    // Assamese (India)
};
let currentAudio=null;
const playTextToSpeech = async (text) => {
  const langCode = (await detectLanguage(text))?.trim();
  const voice = languageToVoiceMap[langCode] || 'en-US-JennyNeural';
  // console.log("Detected:", langCode, "Voice:", voice);

  const response = await fetch('http://localhost:5000/api/text-to-speech', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, voice })
  });

  const blob = await response.blob();
  const audioUrl = URL.createObjectURL(blob);
  
  // Stop previous audio if playing
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  currentAudio = new Audio(audioUrl);
  currentAudio.play();
};


const stopSpeech = () => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
};

// const readAloud = (text, lang) => {
//   const synth = window.speechSynthesis;
//   const utterance = new SpeechSynthesisUtterance(text);
//   utterance.lang = lang;
//   const voices = synth.getVoices();
//   const matchedVoice = voices.find((voice) => voice.lang === lang);
//   if (matchedVoice) utterance.voice = matchedVoice;
//   synth.cancel();
//   synth.speak(utterance);
// };

// const stopSpeech = () => {
//   window.speechSynthesis.cancel();
// };

const detectLanguage = async (text) => {
  const res = await axios.post('http://localhost:5000/api/detect-language', { text });
  // console.log(res.data);
  return res.data;
};

const translateText = async (text, targetLang) => {
  const response = await axios.post(API_URL + '/api/translate', {
    text,
    toLang: targetLang,
  });
  return response.data[0]?.translations?.[0]?.text || text;
};


const NewsItem = (props) => {
  const { title, description, imageUrl, url, author, publishedAt, name, mode } = props;

  const [selectedLang, setSelectedLang] = useState('');
  const [translatedTitle, setTranslatedTitle] = useState(title);
  const [translatedDesc, setTranslatedDesc] = useState(description);

  useEffect(() => {
    const runTranslation = async () => {
      if (selectedLang !== '') {
        const newTitle = await translateText(title, selectedLang);
        const newDesc = await translateText(description, selectedLang);
        setTranslatedTitle(newTitle);
        setTranslatedDesc(newDesc);
      } else {
        setTranslatedTitle(title);
        setTranslatedDesc(description);
      }
    };
    runTranslation();
  }, [selectedLang, title, description]);

  const styleSheet = `
    .card-dark {
      background-color: rgb(40, 44, 49);
      color: white;
      border: 1px solid #444;
    }
  `;

  return (
    <div>
      <style>{styleSheet}</style>
      <div className={`card ${mode === 'dark' ? 'card-dark' : 'bg-light text-dark'}`}>
        <img
          src={imageUrl || 'https://placeholder.com/100x54'}
          className="card-img-top"
          alt="..."
          style={{
            width: '100%',
            aspectRatio: '1 / 0.65',
            objectFit: 'cover',
          }}
        />
        <div className="card-body">
          <h5
            className="card-title"
            style={{
              minHeight: '48px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {translatedTitle}
          </h5>

          <p
            className="card-text"
            style={{
              minHeight: '72px',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {translatedDesc}
          </p>

          <p
            className="card-text"
            style={{
              minHeight: '48px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            <small className={mode === 'dark' ? 'text-light' : 'text-muted'}>
              By {author || 'Unknown'} on {new Date(publishedAt).toGMTString()}
            </small>
          </p>

          <span
            className={`position-absolute top-0 translate-middle badge rounded-pill ${mode === 'dark' ? 'bg-danger text-light' : 'bg-danger text-light'}`}
            style={{ left: '90%', zIndex: 1 }}
          >
            {name}
          </span>

          {/* 🔽 Language Dropdown */}
          <div style={{ marginBottom: '10px' }}>
            <select
              value={selectedLang}
              onChange={(e) => setSelectedLang(e.target.value)}
              className={`form-select form-select-sm ${mode === 'dark' ? 'bg-dark text-light' : ''}`}
            >
              <option value="">Select Language</option>
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="mr">Marathi</option>
              <option value="ta">Tamil</option>
              <option value="te">Telugu</option>
              <option value="kn">Kannada</option>
              <option value="gu">Gujarati</option>
              <option value="ml">Malayalam</option>
              <option value="pa">Punjabi</option>
              <option value="bn">Bengali</option>
              <option value="or">Odia</option>
              <option value="ur">Urdu</option>
              <option value="as">Assamese</option>
            </select>
          </div>

          {/* 🎧 Listen / Stop */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
            <button
              className="btn btn-success btn-sm"
              onClick={() =>
                playTextToSpeech(`${translatedTitle}. ${translatedDesc}`)
                //readAloud(`${translatedTitle}. ${translatedDesc}`, 'mr-IN')
                // readAloud(`${translatedTitle}. ${translatedDesc}`, getFullLangCode(selectedLang))
              }
            >
              🔊 Listen
            </button>
            <button className="btn btn-danger btn-sm" onClick={stopSpeech}>
              🛑 Stop
            </button>
          </div>

          {/* 📖 Read / Save */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '8px',
              marginTop: '8px',
            }}
          >
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
              style={{
                borderRadius: '20px',
                padding: '5px 15px',
                fontWeight: 'bold',
              }}
            >
              Read More
            </a>

            <Link
              to="/Home"
              state={{ newsUrl: url }}
              className="btn btn-outline-secondary btn-sm"
              style={{
                borderRadius: '20px',
                padding: '5px 15px',
                fontWeight: 'bold',
              }}
            >
              Save News
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
