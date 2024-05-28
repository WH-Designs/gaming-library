import { useNavigate } from "react-router-dom";

const NewGame = () => {
  const navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const payload = Object.fromEntries(formData);
    if (payload.favorite == "on") {
      payload.favorite = "TRUE";
    } else {
      payload.favorite = "FALSE";
    }
    const data = createGame(payload);
    navigate("/");
  }

  async function createGame(payload) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: payload.title,
        date: payload.releaseDate,
        favorite: payload.favorite,
        source: payload.source,
      }),
    };

    try {
      const res = await fetch(
        "http://localhost:5000/creategame",
        requestOptions
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
    }
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
          <select name="source">
            <option selected value="Steam">
              Steam
            </option>
            <option value="Amazon">Amazon</option>
            <option value="Epic">Epic</option>
            <option value="Xbox">Xbox</option>
            <option value="Battle.net">Battle.net</option>
            <option value="EA">EA</option>
            <option value="Ubisoft">Ubisoft</option>
          </select>
        </fieldset>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default NewGame;
