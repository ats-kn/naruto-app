import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Character } from './type';

function CharacterDetail() {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://narutodb.xyz/api/character/${id}`);
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
    <div className="character-detail">
      <Link to="/" className="back-link">Back to List</Link>
      <h1>{character.name}</h1>
      <img src={character.images[0] ?? 'dummy.png'} alt={character.name} className="character-image" />
      <div className="character-info">
        <p><strong>Debut:</strong> {character.debut?.appearsIn ?? 'Not available'}</p>
        <p><strong>Affiliation:</strong> {character.personal?.affiliation ?? 'Not available'}</p>
        <p><strong>Jutsu:</strong> {character.jutsu?.join(', ') ?? 'Not available'}</p>
        <p><strong>Nature Type:</strong> {character.natureType?.join(', ') ?? 'Not available'}</p>
        <p><strong>Unique Traits:</strong> {character.uniqueTraits?.join(', ') ?? 'Not available'}</p>
      </div>
    </div>
  );
}

export default CharacterDetail;