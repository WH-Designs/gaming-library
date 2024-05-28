const NewGame = () => {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const payload = Object.fromEntries(formData);
    console.log(payload);
    if (payload.favorite == 'on') {
      payload.favorite = 'TRUE';
    } else {
      payload.favorite = 'FALSE';
    }
    createGame(payload);
  };

  async function createGame(payload) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: payload.title,
          date: payload.releaseDate,
          favorite: payload.favorite,
        }),
      };

      try {
        const res = await fetch(
          "http://localhost:5000/creategame",
          requestOptions
        );
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label>
            Title
            <input
              name="title"
              placeholder="Minecraft"
              type="text"
              //onChange={handleChange}
            />
          </label>
          <label>
            Release Date
            <input
              type="date"
              name="releaseDate"
              aria-label="Date"
              //onChange={handleChange}
            />
          </label>
          <label>
            <input
              type="checkbox"
              name="favorite"
              // onChange={handleChange}
            />
            Favorite
          </label>
        </fieldset>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default NewGame;
