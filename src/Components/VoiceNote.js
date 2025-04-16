import React, { useState, useRef } from "react";

const VoiceNotes = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [text, setText] = useState("");
  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);

  // Start recording
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);

    mediaRecorder.current.ondataavailable = (event) => {
      audioChunks.current.push(event.data);
    };

    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
      setAudioURL(URL.createObjectURL(audioBlob));
    };

    audioChunks.current = [];
    mediaRecorder.current.start();
    setIsRecording(true);
  };

  // Stop recording
  const stopRecording = () => {
    mediaRecorder.current.stop();
    setIsRecording(false);
  };

  // Speech-to-text using Web Speech API
  const startSpeechToText = () => {
    const recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event) => {
      setText(event.results[0][0].transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };
  };

  return (
    <div className="container text-center mt-4">
      <h3>🎙 Voice Notes</h3>
      
      <button onClick={isRecording ? stopRecording : startRecording} className="btn btn-danger m-2">
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>

      <button onClick={startSpeechToText} className="btn btn-primary m-2">
        Convert to Text
      </button>

      {audioURL && (
        <div className="mt-3">
          <h5>🔊 Recorded Audio:</h5>
          <audio controls src={audioURL}></audio>
        </div>
      )}

      {text && (
        <div className="mt-3">
          <h5>📝 Transcribed Text:</h5>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
};

export default VoiceNotes;
