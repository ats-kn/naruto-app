// React とそのフック、スタイルシート、axios をインポート
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

// App コンポーネントの定義
function App() {
  // キャラクター情報を保持するための状態
  const [characters, setCharacters] = useState([]);

  // コンポーネントのマウント時にキャラクター情報を取得
  useEffect(() => {
    fetchCharacters();
  }, []);

  // API からキャラクター情報を取得する非同期関数
  const fetchCharacters = async () => {
    const apiUrl = 'https://narutodb.xyz/api/character';
    const response = await axios.get(apiUrl);
    setCharacters(response.data.characters);
  };

  // UI のレンダリング
  return (
    <div className="container">
      <main>
        <div className="cards-container">
          {/* 取得したキャラクター情報をマッピングしてカードを表示 */}
          {characters.map((character: { id: number, images: string[] }) => {
            return (
              <div className="card" key={character.id}>
                <img 
                  src={
                    // キャラクターの画像があればそれを、なければダミー画像を表示
                    character.images[0] != null
                      ? character.images[0]
                      : 'dummy.png'
                  }
                  alt="character" 
                  className="card-image"
                />
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

// App コンポーネントをエクスポート
export default App;
