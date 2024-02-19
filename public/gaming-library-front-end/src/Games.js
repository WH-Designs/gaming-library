import { useEffect, useState } from "react";
import "./Games.scss";

const Games = (props) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  const title = props.title;
  const property = props.property;
  const filterValue = props.filterValue;

  const getGamesData = async () => {
    
    const res = await fetch(`http://localhost:5000/games?property=${property}&filterValue=${filterValue}`);
    const data = await res.json();
    setLoading(false);
    return data;
  };

  useEffect(() => {
    (async () => {
      let games = await getGamesData();

      let listGames = games.map((game) => (
        <article key={game.id} style={{ maxWidth: "620px" }}>
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
    })()
  });

  return (
    <div style={{ paddingBottom: "10px" }}>
      <h1>{title}</h1>
      {loading && (
        <a href="#" aria-busy="true">
          Fetching Games
        </a>
      )}
      <div
        className="container"
        style={{
          maxHeight: "500px",
          overflowY: "auto",
          paddingRight: "15px",
          paddingLeft: "12px",
          marginTop: "-30px",
        }}
        id="gamesContainer"
      >
        {games}
      </div>
    </div>
  );
};

export default Games;
