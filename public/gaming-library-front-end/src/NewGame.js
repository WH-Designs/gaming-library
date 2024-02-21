const NewGame = () => {
  // Title, completion statues, hours played, user score, favorite, notes, release date
  return (
    <div>
      <form>
        <fieldset>
          <label>
            Title
            <input name="title" placeholder="Minecraft" type="text" />
          </label>
          <label>
            Release Date
            <input type="date" name="releaseDate" aria-label="Date" />
          </label>
          <label>
            <input type="checkbox" name="favorite" />
            Favorite
          </label>
        </fieldset>
      </form>
    </div>
  );
};

export default NewGame;
