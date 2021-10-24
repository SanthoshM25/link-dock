import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../home/home.css";

const Links = () => {
  const { id } = useParams();
  const [links, setLinks] = useState([]);
  const [title, setTitle] = useState();

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/get`, {
        id: id,
      })
      .then((res) => {
        setTitle(res.data.title);
        setLinks(res.data.links);
      })
      .catch((err) => {
        toast.error("something went wrong");
      });
  }, []);

  return (
    <div className="link-container">
      <h2 className="link-username">{title}</h2>
      {links.map((link, index) => {
        return (
          <a
            href={link.link}
            target="_blank"
            rel="noreferrer"
            className="link-box"
            key={index}
          >
            {link.title}
          </a>
        );
      })}
    </div>
  );
};

export default Links;
