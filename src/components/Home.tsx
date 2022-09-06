import React, { useState, useEffect } from "react";
import { getPublicContent } from "../services/user.service";
import  background  from "../images/background.png";

const Home: React.FC = () => {
  const [content, setContent] = useState<string>("");
  useEffect(() => {
    getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, []);
  return (
    <div className="content">
    <div className="content-text">
        <h2>Veuillez vous connecter<br/> pour localiser<br/> des restaurants<br/> proche de<br/>votre position</h2>
        <img className="background" src={background} alt="" />
    </div>
   <div className="card-bg"></div>
  </div>
  );
};
export default Home;