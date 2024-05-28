import Nav from "./Nav";
import "./App.scss";
import Home from "./Home";
import Footer from "./Footer";
import NewGame from "./NewGame";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from "./logo.svg";
function App() {
  return (
    <BrowserRouter>
      <header>
        <article style={{ paddingBottom: ".7rem", paddingTop: ".7rem" }}>
          <Nav />
        </article>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="newgame" element={<NewGame />}></Route>
        </Routes>
      </main>
      <footer>
        <article>
          <Footer />
        </article>
      </footer>
    </BrowserRouter>
  );
}

export default App;
