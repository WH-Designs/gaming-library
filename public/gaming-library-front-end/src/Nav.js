import logo from "./logo.svg";
import search from "./search.svg";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <img
            src={logo}
            alt="Logo"
            style={{
              width: "80px",
              height: "80px",
            }}
          />
        </li>
        <li
          style={{
            fontSize: "30pt",
          }}
        >
          &nbsp;
          <strong>Gaming Library</strong>
        </li>
      </ul>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="newgame">New Game</Link>
        </li>
        <li>
          <Link to="search">
            <img
              src={search}
              alt="search"
              style={{
                width: "30px",
                height: "30px",
              }}
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
