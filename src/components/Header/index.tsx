import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <div style={{ height: 50, backgroundColor: "#F0544F", width: "100vw" }}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1 style={{ color: "#fff", textAlign: "center", margin: 0 }}>
          PixelRacer
        </h1>
      </Link>
    </div>
  );
};

export default Header;
