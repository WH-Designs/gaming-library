import Games from "./Games";

const Home = () => {
  return (
    <>
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
          <Games
            title="Beaten Games"
            filterValue="Beaten"
            property="CompletionStatus"
          />
        </article>
        <article>
          <Games
            title="Abandoned Games"
            filterValue="Abandoned"
            property="CompletionStatus"
          />
        </article>
      </div>
    </>
  );
};

export default Home;
