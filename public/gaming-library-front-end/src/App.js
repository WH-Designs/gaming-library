import Nav from "./Nav";
import "./App.scss";
import Games from "./Games";
import Footer from "./Footer";

function App() {
  return (
    <>
      <header>
        <article style={{ paddingBottom: ".7rem", paddingTop: ".7rem" }}>
          <Nav />
        </article>
      </header>
      <main>
        <div
          style={{
            display: "flex",
            gap: "25px",
          }}
        >
          <article>
            <Games title="All Games" filterValue="" property="" />
          </article>
          <article>
            <Games
              title="Completed Games"
              filterValue="100%"
              property="CompletionStatus"
            />
          </article>
        </div>
        <div
          style={{
            display: "flex",
            gap: "25px",
          }}
        >
          <article>
            <Games title="Beaten Games" filterValue="Beaten" property="CompletionStatus" />
          </article>
          <article>
            <Games
              title="Abandoned Games"
              filterValue="Abandoned"
              property="CompletionStatus"
            />
          </article>
        </div>
      </main>
      <footer>
        <article>
          <Footer />
        </article>
      </footer>
    </>
  );
}

export default App;
