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

async function getVideoGames(property, filterValue, startCursor, search) {
  let payload = {};
  if (search === "true") {
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
        title: {
          contains: filterValue,
        },
      },
    };
  } else {
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

async function createGame(title, date, favorite, source) {
  const response = await notion.pages.create({
    parent: {
      type: "database_id",
      database_id: databaseId,
    },
    properties: {
      Title: {
        title: [
          {
            text: {
              content: title,
            },
          },
        ],
      },
      ReleaseDate: {
        date: {
          start: date,
        },
      },
      Favorite: {
        select: {
          name: favorite,
        },
      },
      Sources: {
        multi_select: [
          {
          name: source,
        },
      ],
      },
      CompletionStatus: {
        select: {
          name: "Not Played",
        },
      },
      Platforms: {
        multi_select: [
          {
          name: "PC (Windows)",
        },
      ],
      },
      TimePlayed: {
        number: 0
      },
    },
  });
  return response;
}

module.exports = {
  getVideoGames: getVideoGames,
  createGame: createGame
};
