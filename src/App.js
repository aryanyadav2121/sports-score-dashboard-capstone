import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Home,
  Trophy,
  BarChart3,
  User,
  CreditCard,
  ShieldCheck,
  Menu,
  X,
  ChevronRight,
  RefreshCw,
  Database,
} from "lucide-react";

import "./App.css";

function App() {
  // =========================
  // MAIN STATES
  // =========================

  const [activeSection, setActiveSection] = useState("Dashboard");
  const [activeSport, setActiveSport] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);

  // Login states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Scores
  const [scores, setScores] = useState([]);
  const [loadingScores, setLoadingScores] = useState(false);

  // =========================
  // FETCH MONGODB DATA
  // =========================

  const fetchScores = async () => {
    setLoadingScores(true);

    try {
      const response = await axios.get(
        "http://localhost:5001/api/items"
      );

      setScores(response.data);
    } catch (error) {
      console.log("Could not fetch scores:", error);
    }

    setLoadingScores(false);
  };

  useEffect(() => {
    fetchScores();
  }, []);

  // =========================
  // NAVIGATION
  // =========================

  const changeSection = (section) => {
    setActiveSection(section);
    setMenuOpen(false);
  };

  // =========================
  // LOGIN
  // =========================

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setLoginMessage("Please enter username and password.");
      return;
    }

    setLoginLoading(true);
    setLoginMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5001/api/users/login",
        {
          username: username,
          password: password,
        }
      );

      setLoginMessage(
        response.data.message ||
          "Login details saved in MongoDB."
      );

      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);

      setLoginMessage(
        "Unable to connect to the MongoDB backend."
      );
    }

    setLoginLoading(false);
  };

  // =========================
  // DASHBOARD
  // =========================

  const renderDashboard = () => {
    return (
      <>
        <section className="hero">
          <div className="hero-content">
            <span className="section-label">
              LIVE SPORTS PLATFORM
            </span>

            <h1>
              Sports Score
              <br />
              <span>Dashboard</span>
            </h1>

            <p>
              Track live scores, explore statistics,
              manage your account and experience
              integrated sports technology.
            </p>

            <button
              className="hero-button"
              onClick={() => changeSection("Sports")}
            >
              Explore Sports
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="hero-icon">
            <Trophy size={130} />
          </div>
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <Trophy size={28} />
            <h3>3</h3>
            <p>Sports</p>
          </div>

          <div className="stat-card">
            <BarChart3 size={28} />
            <h3>Live</h3>
            <p>Statistics</p>
          </div>

          <div className="stat-card">
            <Database size={28} />
            <h3>MongoDB</h3>
            <p>Database</p>
          </div>

          <div className="stat-card">
            <ShieldCheck size={28} />
            <h3>Secure</h3>
            <p>Architecture</p>
          </div>
        </section>

        <section className="matches-section">
          <div className="section-heading">
            <div>
              <span className="section-label">
                PLATFORM
              </span>

              <h2>Integrated Sports Technology</h2>
            </div>
          </div>

          <div className="cards">
            <div className="card">
              <Trophy size={30} />

              <h3>Live Scores</h3>

              <p>
                View sports scores using data retrieved
                from the Express and MongoDB backend.
              </p>
            </div>

            <div className="card">
              <User size={30} />

              <h3>User Login</h3>

              <p>
                Register and login through the integrated
                React and Node.js system.
              </p>
            </div>

            <div className="card">
              <CreditCard size={30} />

              <h3>SportsPay</h3>

              <p>
                Explore the integrated Stripe test payment
                demonstration.
              </p>
            </div>
          </div>
        </section>
      </>
    );
  };

  // =========================
  // SPORTS
  // =========================

  const renderSports = () => {
    const sports = [
      {
        name: "Cricket",
        icon: "🏏",
        description:
          "Track cricket matches and scores.",
      },
      {
        name: "Football",
        icon: "⚽",
        description:
          "Follow football matches and results.",
      },
      {
        name: "Basketball",
        icon: "🏀",
        description:
          "View basketball match information.",
      },
    ];

    return (
      <section className="matches-section">
        <div className="section-heading">
          <div>
            <span className="section-label">
              SPORTS
            </span>

            <h2>Sports Dashboard</h2>
          </div>

          <button
            className="refresh-button"
            onClick={fetchScores}
          >
            <RefreshCw size={17} />
            Refresh
          </button>
        </div>

        <div className="filter-buttons">
          {["All", "Cricket", "Football", "Basketball"].map(
            (sport) => (
              <button
                key={sport}
                className={
                  activeSport === sport
                    ? "filter active"
                    : "filter"
                }
                onClick={() => setActiveSport(sport)}
              >
                {sport}
              </button>
            )
          )}
        </div>

        <div className="cards">
          {sports
            .filter(
              (sport) =>
                activeSport === "All" ||
                activeSport === sport.name
            )
            .map((sport) => (
              <div className="card" key={sport.name}>
                <div className="sport-icon">
                  {sport.icon}
                </div>

                <h3>{sport.name}</h3>

                <p>{sport.description}</p>

                <button
                  className="hero-button"
                  onClick={() =>
                    setActiveSport(sport.name)
                  }
                >
                  View Scores
                  <ChevronRight size={17} />
                </button>
              </div>
            ))}
        </div>

        <div className="section-heading score-heading">
          <div>
            <span className="section-label">
              MONGODB DATA
            </span>

            <h2>Stored Match Data</h2>
          </div>
        </div>

        {loadingScores ? (
          <p>Loading scores...</p>
        ) : scores.length === 0 ? (
          <div className="card">
            <Database size={30} />

            <h3>No match data found</h3>

            <p>
              Add match data through the existing
              MongoDB backend to display it here.
            </p>
          </div>
        ) : (
          <div className="cards">
            {scores.map((item, index) => (
              <div className="card" key={item._id || index}>
                <h3>{item.team || "Team"}</h3>

                <div className="score">
                  {item.score || "0"}
                </div>

                <p>
                  Status:{" "}
                  {item.status || "Not Available"}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    );
  };

  // =========================
  // STATISTICS
  // =========================

  const renderStatistics = () => {
    return (
      <section className="matches-section">
        <div className="section-heading">
          <div>
            <span className="section-label">
              ANALYTICS
            </span>

            <h2>Scores & Statistics</h2>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <BarChart3 size={28} />
            <h3>{scores.length}</h3>
            <p>Stored Matches</p>
          </div>

          <div className="stat-card">
            <Trophy size={28} />
            <h3>3</h3>
            <p>Supported Sports</p>
          </div>

          <div className="stat-card">
            <Database size={28} />
            <h3>MongoDB</h3>
            <p>Database</p>
          </div>

          <div className="stat-card">
            <ShieldCheck size={28} />
            <h3>API</h3>
            <p>Backend Connected</p>
          </div>
        </div>

        <div className="card">
          <BarChart3 size={35} />

          <h3>Performance Overview</h3>

          <p>
            The dashboard uses React components,
            Axios API requests, Express.js and MongoDB
            to manage and display sports information.
          </p>
        </div>
      </section>
    );
  };

  // =========================
  // LOGIN
  // =========================

  const renderLogin = () => {
    return (
      <section className="matches-section">
        <div className="section-heading">
          <div>
            <span className="section-label">
              ACCOUNT
            </span>

            <h2>Login / Registration</h2>
          </div>
        </div>

        <div
          className="card"
          style={{
            maxWidth: "520px",
            marginTop: "25px",
          }}
        >
          <User size={40} />

          <h3>SportsHub Account</h3>

          <p>
            Login using your SportsHub account.
            Your details are sent to the existing
            MongoDB backend.
          </p>

          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              style={{
                width: "100%",
                marginTop: "20px",
                padding: "13px",
                borderRadius: "10px",
                border:
                  "1px solid rgba(255,255,255,0.1)",
                background:
                  "rgba(255,255,255,0.05)",
                color: "white",
                outline: "none",
                boxSizing: "border-box",
              }}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              style={{
                width: "100%",
                marginTop: "12px",
                padding: "13px",
                borderRadius: "10px",
                border:
                  "1px solid rgba(255,255,255,0.1)",
                background:
                  "rgba(255,255,255,0.05)",
                color: "white",
                outline: "none",
                boxSizing: "border-box",
              }}
            />

            <button
              type="submit"
              className="hero-button"
              style={{ marginTop: "20px" }}
              disabled={loginLoading}
            >
              {loginLoading
                ? "Connecting..."
                : "Login"}

              <ChevronRight size={18} />
            </button>
          </form>

          {loginMessage && (
            <p
              style={{
                marginTop: "18px",
                color:
                  loginMessage.includes("Unable")
                    ? "#f87171"
                    : "#4ade80",
              }}
            >
              {loginMessage}
            </p>
          )}
        </div>
      </section>
    );
  };

  // =========================
  // SPORTSPAY
  // =========================

  const renderPayment = () => {
    return (
      <section className="matches-section">
        <div className="section-heading">
          <div>
            <span className="section-label">
              PAYMENT
            </span>

            <h2>SportsPay</h2>
          </div>
        </div>

        <div className="card">
          <CreditCard size={40} />

          <h3>Stripe Test Checkout</h3>

          <p>
            This section represents the payment gateway
            integration developed for Experiment 8.
          </p>

          <p>
            The payment demonstration uses Stripe
            test mode.
          </p>

          <a
            href="http://localhost:3003"
            target="_blank"
            rel="noreferrer"
            className="hero-button"
            style={{
              display: "inline-flex",
              textDecoration: "none",
              marginTop: "15px",
            }}
          >
            Open SportsPay
            <ChevronRight size={18} />
          </a>
        </div>
      </section>
    );
  };

  // =========================
  // SECURITY
  // =========================

  const renderSecurity = () => {
    return (
      <section className="matches-section">
        <div className="section-heading">
          <div>
            <span className="section-label">
              SECURITY
            </span>

            <h2>Security & HTTPS</h2>
          </div>
        </div>

        <div className="cards">
          <div className="card">
            <ShieldCheck size={35} />

            <h3>SSL / HTTPS</h3>

            <p>
              HTTPS protects communication between
              users and web servers through encryption.
            </p>
          </div>

          <div className="card">
            <ShieldCheck size={35} />

            <h3>Secure Communication</h3>

            <p>
              SSL certificates help establish secure
              communication between the browser and
              server.
            </p>
          </div>

          <div className="card">
            <ShieldCheck size={35} />

            <h3>Deployment Security</h3>

            <p>
              The project can be deployed using secure
              HTTPS-enabled hosting services.
            </p>
          </div>
        </div>
      </section>
    );
  };

  // =========================
  // ABOUT
  // =========================

  const renderAbout = () => {
    return (
      <section className="matches-section">
        <div className="section-heading">
          <div>
            <span className="section-label">
              PROJECT
            </span>

            <h2>About Sports Score Dashboard</h2>
          </div>
        </div>

        <div className="card">
          <h3>Capstone Project</h3>

          <p>
            Sports Score Dashboard is an integrated
            web application developed using modern
            web technologies.
          </p>

          <p>
            The project combines HTML, CSS, JavaScript,
            React.js, Axios, Node.js, Express.js,
            Mongoose and MongoDB.
          </p>

          <p>
            Additional concepts include payment
            gateway integration, Git/GitHub deployment
            and web security.
          </p>
        </div>
      </section>
    );
  };

  // =========================
  // SELECT SECTION
  // =========================

  const renderSection = () => {
    switch (activeSection) {
      case "Sports":
        return renderSports();

      case "Statistics":
        return renderStatistics();

      case "Login":
        return renderLogin();

      case "SportsPay":
        return renderPayment();

      case "Security":
        return renderSecurity();

      case "About":
        return renderAbout();

      default:
        return renderDashboard();
    }
  };

  // =========================
  // SIDEBAR
  // =========================

  const menuItems = [
    {
      name: "Dashboard",
      icon: <Home size={19} />,
    },
    {
      name: "Sports",
      icon: <Trophy size={19} />,
    },
    {
      name: "Statistics",
      icon: <BarChart3 size={19} />,
    },
    {
      name: "Login",
      icon: <User size={19} />,
    },
    {
      name: "SportsPay",
      icon: <CreditCard size={19} />,
    },
    {
      name: "Security",
      icon: <ShieldCheck size={19} />,
    },
    {
      name: "About",
      icon: <Database size={19} />,
    },
  ];

  // =========================
  // FINAL PAGE
  // =========================

  return (
    <div className="app">
      <aside
        className={
          menuOpen
            ? "sidebar open"
            : "sidebar"
        }
      >
        <div className="sidebar-header">
          <div className="logo">
            <Trophy size={25} />

            <span>SportsHub</span>
          </div>

          <button
            className="close-menu"
            onClick={() => setMenuOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={
                activeSection === item.name
                  ? "nav-item active"
                  : "nav-item"
              }
              onClick={() =>
                changeSection(item.name)
              }
            >
              {item.icon}

              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <p>SBL-AWT Capstone</p>
          <small>Sports Score Dashboard</small>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <button
            className="menu-button"
            onClick={() => setMenuOpen(true)}
          >
            <Menu size={24} />
          </button>

          <div>
            <span className="topbar-title">
              {activeSection}
            </span>
          </div>
        </header>

        <div className="page-content">
          {renderSection()}
        </div>
      </main>
    </div>
  );
}

export default App;