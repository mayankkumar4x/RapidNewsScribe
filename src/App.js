import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from './Components/NavBar';
import News from './Components/News';
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
          <NavBar lang={lang} setLang={setLang} category={category} setCategory={setCategory} country={country} setCountry={setCountry} dateRange={dateRange}
            setDateRange={setDateRange} customFrom={customFrom} setCustomFrom={setCustomFrom} customTo={customTo} setCustomTo={setCustomTo} />
          <Alert alert={alert} />
          <Routes>
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="/" element={
              <News
                setProgress={setProgress}
                lang={lang}
                pageSize={9}
                category={category}
                country={country}
                dateRange={dateRange}
                customFrom={customFrom}
                customTo={customTo}
              />
            } />

            {/* <Route exact path="/" element={<News setProgress={setProgress} lang={lang} key="general" pageSize={9} category={category} country={country} dateRange={dateRange}
  customFrom={customFrom} customTo={customTo} />} />
            <Route exact path="/business" element={<News setProgress={setProgress} lang={lang} key="business" pageSize={9} category='business' country={country} dateRange={dateRange}
  customFrom={customFrom} customTo={customTo}  />} />
            <Route exact path="/entertainment" element={<News setProgress={setProgress} lang={lang} key="entertainment" pageSize={9} category='entertainment' country={country} dateRange={dateRange}
  customFrom={customFrom} customTo={customTo}  />} />
            <Route exact path="/health" element={<News setProgress={setProgress} lang={lang} key="health" pageSize={9} category='health' country={country} dateRange={dateRange}
  customFrom={customFrom} customTo={customTo}  />} />
            <Route exact path="/science" element={<News setProgress={setProgress} lang={lang} key="science" pageSize={9} category='science' country={country} dateRange={dateRange}
  customFrom={customFrom} customTo={customTo}  />} />
            <Route exact path="/sports" element={<News setProgress={setProgress} lang={lang} key="sports" pageSize={9} category='sports' country={country} dateRange={dateRange}
  customFrom={customFrom} customTo={customTo}  />} />
            <Route exact path="/technology" element={<News setProgress={setProgress} lang={lang} key="technology" pageSize={9} category='technology' country={country}  dateRange={dateRange}
  customFrom={customFrom} customTo={customTo} />} /> */}
            <Route exact path="/notes" element={<Notes showAlert={showAlert} />} />
            <Route path="/about" element={<About />} />
            <Route path="Home" element={<Home showAlert={showAlert} />} />
            <Route path="/reset-password" element={<ResetPassword showAlert={showAlert} />} />
            <Route path="Login" element={<Login showAlert={showAlert} />} />
            <Route path="Signup" element={<Signup showAlert={showAlert} />} />
          </Routes>
        </BrowserRouter>
      </NoteState>

    </div>
    // businessentertainmentgeneralhealthsciencesportstechnology
  )

}
export default App
