import { useState } from "react";

const Search = () => {
    const [games, setGames] = useState([]);
    
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const payload = Object.fromEntries(formData);

    searchGames(payload);
  }

  async function searchGames(payload) {
    const property = "Title";
    const cursor = "";
    const filterValue = payload.title;

    const res = await fetch(
      `http://localhost:5000/games?property=${property}&filterValue=${filterValue}&startCursor=${cursor}&search=${true}`
    );
    const data = await res.json();

    let listGames = data.games.map((game) => (
      <article key={game.id} style={{ maxWidth: "820px" }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBottom: "0",
          }}
        >
          <h4 style={{ marginTop: "10px" }}>{game.title}</h4>
          <h5 style={{ marginTop: "10px" }}>{game.userScore} / 100</h5>
        </header>
        {game.completionStatus}
        <br />
        {game.hoursPlayed}
        <footer>
          <details>
            <summary>Review</summary>
            <p>{game.notes}</p>
          </details>
        </footer>
      </article>
    ));
    setGames(listGames);
  }

  return (
    <div
      style={{
        paddingLeft: "150px",
        paddingRight: "150px",
      }}
    >
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            Title
            <input name="title" placeholder="Minecraft" type="text" />
          </label>
        </fieldset>
        <input type="submit" value="Submit" />
      </form>
      <article>
        <div
          className="container"
          style={{
            maxHeight: "500px",
            overflowY: "auto",
              marginTop: "-30px",
              marginRight: "-100px"
          }}
          id="gamesContainer"
        >
          {games}
        </div>
      </article>
    </div>
  );
};

export default Search;
