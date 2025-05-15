import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from './Components/NavBar';
import News from './Components/News';
import Contact from './Components/Contact';
import Alert from './Components/Alert';
import Login from './Components/Login';
import ResetPassword from "./Components/ResetPassword";
import About from "./Components/About";
import Signup from './Components/Signup';
import Home from './Components/Home';
import Dashboard from './Components/Dashboard';
import Notes from './Components/Notes';
import LoadingBar from 'react-top-loading-bar'
import NoteState from './context/notes/NoteState';


const App = () => {
  const pageSize = 5;

  const [progress, setProgress] = useState(0)
  const [lang, setLang] = useState("en")
  const [country, setCountry] = useState("in")
  const [category, setCategory] = useState("general")
  const [dateRange, setDateRange] = useState("today");
  const [customFrom, setCustomFrom] = useState(null);
  const [customTo, setCustomTo] = useState(null);
  const [mode, setMode] = useState('light');

const toggleMode = () => {
  setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
};

  // setProgress(pr)
  const [alert, setAlert] = useState({ type: "", msg: "" })
  const showAlert = (msg, type) => {
    setAlert({
      msg: msg,
      type: type
    })
    setTimeout(() => {
      setAlert({ type: "", msg: "" })
    }, 2000);
  }
  return (
    <div>
      <NoteState>
        <BrowserRouter>
          <LoadingBar
            height={3}
            color='#f11946'
            progress={progress}
          />
          <NavBar  mode={mode} toggleMode={toggleMode} lang={lang} setLang={setLang} category={category} setCategory={setCategory} country={country} setCountry={setCountry} dateRange={dateRange}
            setDateRange={setDateRange} customFrom={customFrom} setCustomFrom={setCustomFrom} customTo={customTo} setCustomTo={setCustomTo} />
          <Alert alert={alert} />
          <div className={mode === 'dark' ? 'bg-dark text-white min-vh-100' : 'bg-light text-dark min-vh-100'}>
        <Routes>
          <Route path="Dashboard" element={<Dashboard />} />
          <Route
            path="/"
            element={
              <News
                mode={mode}
                setProgress={setProgress}
                lang={lang}
                pageSize={9}
                category={category}
                country={country}
                dateRange={dateRange}
                customFrom={customFrom}
                customTo={customTo}
              />
            }
          />
          <Route exact path="/notes" element={<Notes showAlert={showAlert} mode={mode}/>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="Home" element={<Home showAlert={showAlert} mode={mode}/>} />
          <Route path="/reset-password" element={<ResetPassword showAlert={showAlert} />} />
          <Route path="Login" element={<Login showAlert={showAlert} />} />
          <Route path="Signup" element={<Signup showAlert={showAlert} />} />
        </Routes>
      </div>
        </BrowserRouter>
      </NoteState>
    </div>
  )

}
export default App
