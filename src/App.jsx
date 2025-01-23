import { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [gameTitle, setGameTitle] = useState("");
    const [searchedGames, setSearchedGames] = useState([]);
    const [gameDeals, setGameDeals] = useState([]);

    function searchGame() {
        fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}`)
            .then((response) => response.json())
            .then((data) => {
                setSearchedGames(data);
            })
            .catch((error) =>
                console.error('Error when getting the game offers:', error)
            );
    }

    useEffect(() => {
        fetch(
            "https://www.cheapshark.com/api/1.0/deals?sortBy=Savings&pageSize=3"
        )
            .then((response) => response.json())
            .then((data) => {
                setGameDeals(data)
                console.log(data)
            })
            .catch((error) =>
                console.error('Error when getting the biggest game offers:', error)
            );
    }, []);

    return (
        <div className="App">
            <div className="searchSection">
                <h1>Search For A Game</h1>
                <input
                    type="text"
                    placeholder="Portal, Gun, League, Minecraft..."
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
                                    alt={"Error when getting the image:"}
                                />
                                {game.cheapest}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="dealsSection">
                <h1> Greatest Deals </h1>
                <div className="games">
                    {gameDeals.map((game, key) => {
                        return (
                            <div className="game" id="deals" key={key}>
                                <h3>{game.title}</h3>
                                <p>Normal Price: {game.normalPrice}</p>
                                <p> Deal Price: {game.salePrice}</p>
                                <h3> YOU SAVE {game.savings.slice(0, 2)}%</h3>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;