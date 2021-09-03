import { useContext, useEffect, useState } from "react";
import useBreedList from "./useBreedList";
import Results from "./Results";
import ThemeContext from "./ThemeContext";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [location, setLocation] = useState("");
  const [pets, setPets] = useState([]);
  const [breedList] = useBreedList(animal);
  const [theme, setTheme] = useContext(ThemeContext);

  useEffect(() => {
    requestPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&breed=${breed}&location=${location}`
    );
    const json = await res.json();

    setPets(json.pets);
  }

  return (
    <div id="SearchParams" className="my-0 mx-auto w-10/12">
      <form
        className="p-10 mb-10 rounded-lg bg-gray-200 shadow-lg flex flex-col justify-center items-center divide-y divide-gray-900"
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label className="search-label" htmlFor="location">
          Location
          <input
            id="location"
            className="search-control"
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label className="search-label" htmlFor="animal">
          Animal
          <select
            id="animal"
            className="search-control"
            value={animal}
            onChange={(e) => setAnimal(e.target.value)}
            onBlur={(e) => setAnimal(e.target.value)}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label className="search-label" htmlFor="breed">
          Breed
          <select
            id="breed"
            className="search-control disabled:opacity-50"
            disabled={!breedList.length}
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            onBlur={(e) => setBreed(e.target.value)}
          >
            <option />
            {breedList.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <label className="search-label" htmlFor="theme">
          Theme
          <select
            className="search-control"
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
            value={theme}
          >
            <option value="darkblue">Blue</option>
            <option value="darkgreen">Green</option>
            <option value="darkred">Red</option>
            <option value="darkorange">Orange</option>
          </select>
        </label>
        <button
          className="search-control rounded color text-white hover:opacity-80 border-none"
          style={{ backgroundColor: theme }}
        >
          Submit
        </button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
