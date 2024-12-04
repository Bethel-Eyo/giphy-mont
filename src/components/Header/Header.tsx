import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <Link to={"/"}>
        <h1 className="text-5xl font-bold tracking-tight cursor-pointe">GIPHY-MONT</h1>
      </Link>
    </nav>
  );
};

export default Header;
