import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Character } from "./type";

function CharacterDetail() {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://narutodb.xyz/api/character/${id}`
        );
        setCharacter(response.data);
      } catch (error) {
        setCharacter(null);
      }
      setIsLoading(false);
    };

    fetchCharacter();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!character) {
    return <div>Character not found</div>;
  }
  return (
    <div>
      <Link to="/">Back to List</Link>
      <div>
        <h1>{character.name}</h1>
        <img
          src={character.images[0] ?? "dummy.png"}
          alt={character.name}
          className="character-image"
        />
        <div>
          <h2>Debut</h2>
          <p>{character.debut?.appearsIn ?? "Not available"}</p>
        </div>
        <div>
          <h2>Affiliation</h2>
          <p>{character.personal?.affiliation ?? "Not available"}</p>
        </div>
        <div>
          <h2>Unique Traits</h2>
          {character.uniqueTraits && character.uniqueTraits.length > 0 ? (
            <ul>
              {character.uniqueTraits.map((trait, index) => (
                <li key={index}>{trait}</li>
              ))}
            </ul>
          ) : (
            <p>Not available</p>
          )}
        </div>
        <div>
          <h2>Nature Type</h2>
          {character.natureType && character.natureType.length > 0 ? (
            <ul>
              {character.natureType?.map((type, index) => (
                <li key={index}>{type}</li>
              ))}
            </ul>
          ) : (
            <p>Not available</p>
          )}
        </div>
        <div>
          <h2>Jutsu</h2>
          {character.jutsu && character.jutsu.length > 0 ? (
            <ul>
              {character.jutsu?.map((jutsu, index) => (
                <li key={index}>{jutsu}</li>
              ))}
            </ul>
          ) : (
            <p>Not available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CharacterDetail;
