import { useState, useEffect } from "react";
import "./signup.css";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
  const [data, setData] = useState({});
  const [clicked, setClicked] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    toast.info("signing up please wait!");
    setClicked(true);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/signup`, data)
      .then((res) => {
        if (res.data.message === "Email already exists") {
          toast.info("user already exists");
          setClicked(false);
        } else if (res.data.message === "User signup failed") {
          toast.error("signup failed");
          setClicked(false);
        } else {
          toast.success("signed up successfully");
          sessionStorage.setItem("mail", res.data.data.email);
          sessionStorage.setItem("id", res.data.data.id);
          history.replace("/");
        }
      })
      .catch((err) => {
        toast.error("something went wrong");
        setClicked(false);
      });
  };

  useEffect(() => {
    const mail = localStorage.getItem("mail");
    if (mail) {
      history.replace("/");
    }
  }, []);
  return (
    <div className="signup-container">
      <main className="form ">
        <header className="signup-header">SIGN UP</header>
        <input
          type="text"
          className="input"
          name="userName"
          placeholder="username"
          value={data.userName}
          onChange={handleChange}
        />
        <input
          type="email"
          className="input"
          name="email"
          placeholder="email"
          value={data.email}
          onChange={handleChange}
        />
        <input
          type="password"
          className="input"
          name="password"
          placeholder="password"
          value={data.password}
          onChange={handleChange}
        />
        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={clicked}
        >
          REGISTER
        </button>
        <p>
          Existing user?{" "}
          <Link className="signin-text" to="/login">
            login
          </Link>
        </p>
      </main>
    </div>
  );
};

export default Signup;
