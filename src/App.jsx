import axios from "axios";
import styles from "./App.module.css";
import Item from "./Item";
import { POKEMON_URL } from "./constants";
import { useEffect, useState } from "react";

const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(POKEMON_URL);
      setPokemon(response.data.results);
      setFilteredPokemon(response.data.results);
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    if (searchQuery === "") {
      setFilteredPokemon(pokemon);
    } else {
      const filtered = pokemon.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPokemon(filtered);
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 0) {
      const filtered = pokemon.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
      setFilteredPokemon(pokemon);
    }
  };

  const handleSuggestionClick = (name) => {
    setSearchQuery(name);
    setSuggestions([]);
    handleSearch();
  };

  return (
    <>
      <div className={styles.title}>Kanto Pokedex</div>
      <div className={`${styles.title} ${styles.titleSpace}`}>1-150</div>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search Pokemon"
          value={searchQuery}
          onChange={handleInputChange}
          className={styles.searchInput}
        />
        <button onClick={handleSearch} className={styles.searchButton}>
          Search
        </button>
      </div>
      {suggestions.length > 0 && (
        <ul className={styles.suggestionsList}>
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.name}
              onClick={() => handleSuggestionClick(suggestion.name)}
              className={styles.suggestionItem}
            >
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
      <div className={styles.container}>
        {filteredPokemon.map((item) => (
          <Item name={item.name} url={item.url} key={item.name} />
        ))}
      </div>
    </>
  );
};

export default App;
