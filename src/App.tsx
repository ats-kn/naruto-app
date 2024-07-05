// React とそのフック、スタイルシート、axios をインポート
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Character } from './type';

// App コンポーネントの定義
function App() {
  // キャラクター情報を保持するための状態変数と、ページ番号を保持するための状態変数を定義
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);

  // コンポーネントのマウント時にキャラクター情報を取得
    useEffect(() => {
      fetchCharacters(page);
    }, [page]);

  // API からキャラクター情報を取得する非同期関数
  const fetchCharacters = async (page: number) => {
    const apiUrl = 'https://narutodb.xyz/api/character';
    const response = await axios.get(apiUrl, {params: {page}});
    setCharacters(response.data.characters);
  };

  // 次のページのキャラクター情報を取得する関数
  const handleNext = async () => {
    const nextPage = page + 1;
    await fetchCharacters(nextPage);
    setPage(nextPage);
  }

  // UI のレンダリング
  return (
    <div className="container">
      <main>
        <div className="cards-container">
          {/* 取得したキャラクター情報をマッピングしてカードを表示 */}
          {characters.map((character) => {
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
                <div className="div card-content">
                  <h3 className="card-title">{character.name}</h3>
                  <p className="card-description">
                    {/* キャラクターの説明があればそれを、なければ「説明なし」と表示 */}
                    {character.debut?.appearsIn ?? 'Not'}
                  </p>
                  <div className="card-footer">
                    <span className="affiliation">
                      {/* キャラクターの所属があればそれを、なければ「所属なし」と表示 */}
                      {character.personal?.affiliation ?? 'Not affiliation'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* ページャーのUI */}
        <div className="pager">
          <button className="prev">Previous</button>
          <span className="page-number">{page}</span>
          <button className="next" onClick={handleNext}>
            Next
          </button>
        </div>
      </main>
    </div>
  );
}

// App コンポーネントをエクスポート
export default App;
