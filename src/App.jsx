import {useState} from 'react';
import './App.css';

function App() {
    const [gameTitle, setGameTitle] = useState("");
    const [searchedGames, setSearchedGames] = useState([]);

    function searchGame() {
        fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}`)
            .then((response) => response.json())
            .then((data) => {
                setSearchedGames(data);
            })
            .catch((error) =>
                console.error('Erro ao buscar jogos:', error)
            );
    }

    return (
        <div className="App">
            <div className="searchSection">
                <h1>Search For A Game</h1>
                <input
                    type="text"
                    placeholder="Portal, Gun, League..."
                    onChange={(event) => {
                        setGameTitle(event.target.value);
                    }}
                />
                <button onClick={searchGame}>Search Game Title</button>
                <div className="games">
                    {searchedGames.map((game, key) => {
                        return (
                            <div className="game" key={key}>
                                {game.external}
                                <img
                                    src={game.thumb}
                                    alt={"Imagem não obtida"}
                                />
                                {game.cheapest}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="dealsSection">
                <h1> Latest Deals </h1>
            </div>
        </div>
    );
}

export default App;