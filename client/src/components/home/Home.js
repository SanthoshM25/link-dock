import "../signup/signup.css";
import "./home.css";
import delIcon from "./delete.png";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const [links, setLinks] = useState([]);
  const [title, setTitle] = useState();
  const [data, setData] = useState({
    email: sessionStorage.getItem("mail"),
    linkTitle: "",
    link: "",
    title: title,
  });
  const history = useHistory();

  const getLink = () => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/get`, {
        id: sessionStorage.getItem("id"),
      })
      .then((res) => {
        setTitle(res.data.title);
        setLinks(res.data.links);
      })
      .catch((err) => {
        toast.error("something went wrong");
      });
  };

  const handleDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const addLink = () => {
    axios
      .patch(`${process.env.REACT_APP_BASE_URL}/update`, data)
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data);
          getLink();
          data.link = "";
          data.linkTitle = "";
        }
      })
      .catch((err) => {
        toast.error("something went wrong");
      });
  };

  const shareLink = () => {
    navigator.clipboard.writeText(
      `${process.env.REACT_APP_FRONT_URL}/${sessionStorage.getItem("id")}`
    );
    toast.info("link copied");
  };

  const handleDelete = (link) => {
    axios
      .patch(`${process.env.REACT_APP_BASE_URL}/delete`, {
        email: sessionStorage.getItem("mail"),
        linkTitle: link.title,
        link: link.link,
      })
      .then((res) => {
        getLink();
        if (res.data === "Deleted successfully") toast.success("link deleted");
      })
      .catch((err) => toast.error("something went wrong"));
  };

  useEffect(() => {
    const mail = sessionStorage.getItem("mail");
    if (!mail) {
      history.replace("/login");
    } else {
      getLink();
    }
  }, []);
  return (
    <div className="container">
      <div className="link-form-container">
        <input
          type="text"
          value={data.title}
          onChange={handleDataChange}
          name="title"
          placeholder="dock title"
          className="input"
        />
        <input
          type="text"
          value={data.linkTitle}
          onChange={handleDataChange}
          name="linkTitle"
          placeholder="link title"
          className="input"
        />
        <input
          type="text"
          value={data.link}
          onChange={handleDataChange}
          name="link"
          placeholder="link"
          className="input"
        />
        <div>
          <button className="submit-btn" onClick={addLink}>
            add link
          </button>
          <button className="submit-btn" onClick={shareLink}>
            share{" "}
          </button>
        </div>
      </div>

      <div className="link-container">
        <h2 className="link-username">{title}</h2>
        {links.map((link, index) => {
          return (
            <div className="link">
              {/* <div className="link-box" key={index}> */}
              <a
                className="link-box"
                key={index}
                href={link.link}
                target="_blank"
                rel="noreferrer"
              >
                {link.title}
              </a>
              {/* </div> */}
              <img
                src={delIcon}
                alt="delete"
                onClick={() => handleDelete(link)}
                className="delete-icon"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
