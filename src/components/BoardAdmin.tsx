import React, { useState, useEffect } from "react";
import { getUserBoard } from "../services/user.service";

const BoardAdmin: React.FC = () => {

  const [content, setContent] = useState<string>("");
  
  useEffect(() => {
    getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setContent(_content);
      }
    );
  }, []);
  return (
    <div className="container">
      <header className="jumbotron admin-card">
        <h3>Admin {content}</h3>
      </header>
    </div>
  );
};
export default BoardAdmin;