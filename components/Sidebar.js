export default function Sidebar({ characters, genres, onSelect }) {
    return (
      <div>
        <h3>Characters</h3>
        <ul>
          {characters.map((character, index) => (
            <li key={index} onClick={() => onSelect('character', character)}>
              {character}
            </li>
          ))}
        </ul>
        <h3>Genres</h3>
        <ul>
          {genres.map((genre, index) => (
            <li key={index} onClick={() => onSelect('genre', genre)}>
              {genre}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  