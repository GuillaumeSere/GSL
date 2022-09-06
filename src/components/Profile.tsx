import React from "react";
import { getCurrentUser } from "../services/auth.service";
import Home from "./Home/Home";

const Profile: React.FC = () => {
  const currentUser = getCurrentUser();
  return (
    <>
      <header className="jumbotron user-card">
        <h3>
        Bienvenue <strong>{currentUser.username}</strong> 
        </h3>
      </header>
      <Home />
    </>
  );
};
export default Profile;