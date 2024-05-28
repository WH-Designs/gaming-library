import Nav from "./Nav";
import "./App.scss";
import Home from "./Home";
import Footer from "./Footer";
import NewGame from "./NewGame";
import Search from "./Search";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
          <Route path="search" element={<Search/>}></Route>
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
