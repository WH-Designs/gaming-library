const dotenv = require("dotenv").config();
const { Client } = require("@notionhq/client");

// Initializing a client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const databaseId = process.env.DATABASE_ID;

const listDatabase = async () => {
  const response = await notion.databases.retrieve({ database_id: databaseId });
};

// listDatabase();

async function getVideoGames(property, filterValue, startCursor) {
  let payload = {};
  if (property === "") {
    if (startCursor === "") {
      
      payload = {
        database_id: databaseId,
        sorts: [
          {
            property: "Title",
            direction: "ascending",
          },
        ],
      };
    } else {
      
      payload = {
        database_id: databaseId,
        start_cursor: startCursor,
        sorts: [
          {
            property: "Title",
            direction: "ascending",
          },
        ],
      };
    }
  } else {
    if (startCursor == null) {
      payload = {
        database_id: databaseId,
        sorts: [
          {
            property: "Title",
            direction: "ascending",
          },
        ],
        filter: {
          property: property,
          select: {
            equals: filterValue,
          },
        },
      };
    } else {
      payload = {
        database_id: databaseId,
        sorts: [
          {
            property: "Title",
            direction: "ascending",
          },
        ],
        filter: {
          property: property,
          select: {
            equals: filterValue,
          },
        },
      };
    }
  }

  const { results, next_cursor } = await notion.databases.query(payload);
  const games = results.map((page) => {
    // console.log(page.properties);
    return {
      id: page.id,
      title: page.properties.Title.title[0].plain_text,
      completionStatus: page.properties.CompletionStatus.select.name,
      hoursPlayed: page.properties.HoursPlayed.formula.string,
      userScore:
        page.properties.UserScore.number === null
          ? 0
          : page.properties.UserScore.number,
      favorite: page.properties.Favorite.select.name,
      notes:
        page.properties.Notes.rich_text.length === 0
          ? ""
          : page.properties.Notes.rich_text[0].text.content,
      releaseDate: page.properties.ReleaseDate.date,
    };
  });

  return { games: games, next_cursor: next_cursor };
}

// async function getCompletedGames() {
//   const payload = {
//     database_id: databaseId,
//     sorts: [
//       {
//         property: "Title",
//         direction: "ascending",
//       },
//     ],
//     filter: {
//       property: "CompletionStatus",
//       select: {
//         equals: "Completed" || "Beaten",
//       },
//     },
//   };

//   const { results } = await notion.databases.query(payload);

//   const games = results.map((page) => {
//     // console.log(page.properties);
//     console.log(page.properties.CompletionStatus);
//     return {
//       id: page.id,
//       title: page.properties.Title.title[0].plain_text,
//       completionStatus: page.properties.CompletionStatus.select.name,
//       hoursPlayed: page.properties.HoursPlayed.formula.string,
//       userScore:
//         page.properties.UserScore.number === null
//           ? 0
//           : page.properties.UserScore.number,
//       favorite: page.properties.Favorite.select.name,
//       notes:
//         page.properties.Notes.rich_text.length === 0
//           ? ""
//           : page.properties.Notes.rich_text[0].text.content,
//       releaseDate: page.properties.ReleaseDate.date,
//     };
//   });

//   return games;
// }

module.exports = {
  getVideoGames: getVideoGames,
};
