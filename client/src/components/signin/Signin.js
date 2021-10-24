import { useState, useEffect } from "react";
import "../signup/signup.css";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Signin = () => {
  const [data, setData] = useState({});
  const [clicked, setClicked] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    toast.info("logging in please wait!");
    setClicked(true);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/signin`, data)
      .then((res) => {
        if (res.data.message === "Email/Password wrong") {
          toast.error("enter valid details");
          setClicked(false);
        } else {
          toast.success("logged in successfully");
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
        <header className="signup-header">LOG IN</header>
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
          LOG IN
        </button>
        <p>
          New user?{" "}
          <Link className="signin-text" to="/signup">
            register
          </Link>
        </p>
      </main>
    </div>
  );
};

export default Signin;
