// React とそのフック、スタイルシート、axios をインポート
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Character } from './type';
import { Link } from 'react-router-dom';

// App コンポーネントの定義
function App() {
  const [characters, setCharacters] = useState<Character[]>([]); // キャラクター情報を保持するための状態変数
  const [page, setPage] = useState(1); // ページ番号を保持するための状態変数
  const [isLoading, setIsLoading] = useState(false); // ローディング中かどうかを保持するための状態変数
  const [isLastPage, setIsLastPage] = useState(false); // 最後のページかどうかを判定するためApp.tsxに
  const MAX_ID = 1430; // idの最大値を定数として定義

  // コンポーネントのマウント時にキャラクター情報を取得
    useEffect(() => {
      fetchCharacters(page);
    }, [page]);

  // API からキャラクター情報を取得する非同期関数
  const fetchCharacters = async (page: number) => {
    const apiUrl = 'https://narutodb.xyz/api/character';
    setIsLoading(true);
    try {
      const response = await axios.get(apiUrl, { params: { page } });
      setCharacters(response.data.characters);
      // 取得したキャラクターの中で最大のIDを見つける
      const maxId = Math.max(...response.data.characters.map((char: Character) => char.id));
      // 最大IDが1430であれば最終ページと判断
      setIsLastPage(maxId === MAX_ID);
    } catch (error) {
      setIsLastPage(false);
    }
    setIsLoading(false);
  };

  // 前のページのキャラクター情報を取得する関数
  const handlePrev = async () => {
    const prevPage = page - 1;
    await fetchCharacters(prevPage);
    setPage(prevPage);
  }

  // 次のページのキャラクター情報を取得する関数
  const handleNext = async () => {
    const nextPage = page + 1;
    await fetchCharacters(nextPage);
    setPage(nextPage);
  }

  // UI のレンダリング
  return (
    <div className="container">
      <div className="header">
        <div className="header-content">
          <img src="logo.png" alt="logo" className="logo" />
        </div>
      </div>
      {isLoading ? (
        <div>Now Loading...</div>
      ) : (
        <main>
          <div className="cards-container">
            {/* 取得したキャラクター情報をマッピングしてカードを表示 */}
            {characters.map((character) => {
              return (
                <Link to={`/character/${character.id}`} key={character.id} className="card-link">
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
                    <div className="card-content">
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
                </Link>
              );
            })}
          </div>
          {/* ページャーのUI */}
          <div className="pager">
            {page > 1 && (
              <button className="prev" onClick={handlePrev}>
                Previous
              </button>
            )}
            <span className="page-number">{page}</span>
            {!isLastPage && (
              <button className="next" onClick={handleNext}>
                Next
              </button>
            )}
          </div>
        </main>
      )}
    </div>
  );
}

// App コンポーネントをエクスポート
export default App;
