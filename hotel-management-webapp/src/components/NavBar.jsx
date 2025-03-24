import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="bg-blue-600 p-4">
      <ul className="flex space-x-4 text-white">
        <li><Link to="/">Gestión de Hoteles</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;