import React from 'react';
import { Link } from 'react-router-dom';

// Speech Functions
const getFullLangCode = (shortCode) => {
  const map = {
    'hi': 'hi-IN',
    'mr': 'mr-IN',
    'ta': 'ta-IN',
    'te': 'te-IN',
    'en': 'en-IN',
  };
  return map[shortCode] || 'en-IN';
};

const readAloud = (text, lang ) => {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;

  const voices = synth.getVoices();
  const matchedVoice = voices.find(voice => voice.lang === lang);
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  } else {
    console.warn(`No voice found for ${lang}, using default`);
  }

  synth.cancel(); // Stop previous speech
  synth.speak(utterance);
};


const stopSpeech = () => {
  window.speechSynthesis.cancel();
};

// News Card Component
const NewsItem = (props) => {
  let { title, description, imageUrl, url, author, publishedAt, name } = props;

  return (
    <div>
      <div className="card">
        <img
          src={imageUrl ? imageUrl : 'https://placeholder.com/100x54'}
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
            {title}
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
            {description}
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
            <small className="text-muted">
              By {author ? author : 'Unknown'} on{' '}
              {new Date(publishedAt).toGMTString()}
            </small>
          </p>

          <span
            className="position-absolute top-0 translate-middle badge rounded-pill bg-danger"
            style={{ left: '90%', zIndex: 1 }}
          >
            {name}
          </span>

          {/*  Voice Controls (Only Listen & Stop) */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
            <button
              className="btn btn-success btn-sm"
              onClick={() => readAloud(`${title}. ${description}`,getFullLangCode(props.lang))}
            >
              🔊 Listen
            </button>
            <button className="btn btn-danger btn-sm" onClick={stopSpeech}>
              🛑 Stop
            </button>
          </div>

          {/* 📖 Read & Save Buttons */}
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
