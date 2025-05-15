import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const NavBar = (props) => {
  let history = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    history("/login");
  };

  const token = localStorage.getItem("token");
  let userEmail = "";

  if (token) {
    try {
      const decoded = jwtDecode(token);
      userEmail = decoded.user.email;
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  const truncateEmail = (email) => {
    const [user, domain] = email.split("@");
    if (user.length <= 4) return email;
    return `${user.substring(0, 4)}***@${domain}`;
  };
  const handleCategoryChange = (cat) => {
    props.setCategory(cat);
    history("/");
  };

  const handleLanguageChange = (event) => {
    props.setLang(event.target.value);
  };

  const handleCountryChange = (event) => {
    props.setCountry(event.target.value);
  };

  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark px-3 custom-navbar">
      <Link className="navbar-brand fw-bold text-light" to="/">
        NewsApp
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="Dashboard">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">Contact Us</Link>
          </li>
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="categoryDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Categories
            </a>
            <ul className="dropdown-menu custom-dropdown" aria-labelledby="categoryDropdown">
              <li><button className="dropdown-item" onClick={() => handleCategoryChange("general")}>General</button></li>
              <li><button className="dropdown-item" onClick={() => handleCategoryChange("business")}>Business</button></li>
              <li><button className="dropdown-item" onClick={() => handleCategoryChange("entertainment")}>Entertainment</button></li>
              <li><button className="dropdown-item" onClick={() => handleCategoryChange("health")}>Health</button></li>
              <li><button className="dropdown-item" onClick={() => handleCategoryChange("science")}>Science</button></li>
              <li><button className="dropdown-item" onClick={() => handleCategoryChange("sports")}>Sports</button></li>
              <li><button className="dropdown-item" onClick={() => handleCategoryChange("technology")}>Technology</button></li>
            </ul>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/notes">Notes</Link>
          </li>
        </ul>

        <div className="d-flex align-items-center">
          {/* <select
            className="form-select form-select-sm mx-2 custom-language-select"
            value={props.lang}
            onChange={handleLanguageChange}
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="ta">Tamil</option>
            <option value="te">Telugu</option>
            <option value="mr">Marathi</option>
          </select> */}

          <select
            className="form-select form-select-sm mx-2 custom-language-select"
            value={props.country}
            onChange={handleCountryChange}
          >
            <option value="in">India</option>
            <option value="us">United States</option>
            <option value="gb">United Kingdom</option>
            <option value="pk">Pakistan</option>
            <option value="cn">China</option>
            <option value="bd">Bangladesh</option>
            <option value="ru">Russia</option>
            <option value="ae">United Arab Emirates</option>
            <option value="sa">Saudi Arabia</option>
            <option value="au">Australia</option>
            <option value="ca">Canada</option>
            <option value="sg">Singapore</option>
            <option value="np">Nepal</option>
            <option value="lk">Sri Lanka</option>
            <option value="af">Afghanistan</option>
            <option value="jp">Japan</option>
            <option value="de">Germany</option>
          </select>


          <div className="dropdown mx-2">
          </div>
          <button
            className="btn btn-outline-light mx-2 custom-btn"
            onClick={props.toggleMode}
          >
            {props.mode === 'dark' ? '☀️ Light' : '🌙 Dark'}
          </button>
          {!token ? (
            <div className="d-flex">
              <Link className="btn btn-outline-light mx-2 custom-btn" to="/Login">
                Login
              </Link>
              <Link className="btn btn-primary custom-btn" to="/Signup">
                SignUp
              </Link>
            </div>
          ) : (
            <div className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-white"
                href="#"
                id="userDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {truncateEmail(userEmail)}
              </a>
              <ul className="dropdown-menu dropdown-menu-end custom-dropdown bg-white">
                <li className="dropdown-item-text text-muted">
                  {userEmail}
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button className="dropdown-item text-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}

        </div>
      </div>

      {/* Inline CSS */}
      <style>
        {`
          .custom-navbar {
            box-shadow: 0px 4px 10px rgba(255, 255, 255, 0.1);
          }

          .custom-dropdown {
            background-color: #343a40;
            border: none;
            min-width: 160px;
          }

          .custom-dropdown .dropdown-item {
            color: white;
            transition: 0.3s;
          }

          .custom-dropdown .dropdown-item:hover {
            background-color: #495057 !important;
          }

          .custom-language-select {
            background-color: #212529;
            color: white;
            border: 1px solid white;
            cursor: pointer;
            width: 100px; /* Fixed width */
            font-size: 14px;
            text-align: center;
          }

          .custom-language-select:focus {
            outline: none;
            border-color: lightgray;
          }

          .custom-btn {
            padding: 6px 15px;
            border-radius: 20px;
            transition: all 0.3s ease-in-out;
          }

          .custom-btn:hover {
            transform: scale(1.05);
          }
        `}
      </style>
    </nav>
  );
};

export default NavBar;
