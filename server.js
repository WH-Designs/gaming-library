const express = require("express");
const cors = require("cors");
const { getVideoGames, getCompletedGames } = require("./services/notion");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.static("public/gaming-library-front-end/build"));

app.get("/games", async (req, res) => {
  try {
    const data = await getVideoGames(
      req.query.property,
      req.query.filterValue,
      req.query.startCursor
    );
    res.json({games:data.games, next_cursor:data.next_cursor});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred' });
  }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



// const express = require("express");
// const { getVideoGames, getCompletedGames } = require("./services/notion");
// const PORT = process.env.PORT || 5000;
// const HOST = process.env.HOST || "localhost";

// const app = express();

// app.use(express.static("public/gaming-library-front-end/build"));

// app.listen(PORT, console.log(`Server started on port ${PORT}`));

// app.get("/games", async (req, res) => {
//   const data = await getVideoGames(
//     req.query.property,
//     req.query.filterValue,
//     req.query.startCursor
//   );
//   res.json({games:data.games, next_cursor:data.next_cursor});
// });