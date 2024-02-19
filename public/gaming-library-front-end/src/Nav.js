import logo from "./logo.svg";

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
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">New Game</a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
