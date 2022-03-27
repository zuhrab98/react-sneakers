import Card from "./components/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";

function App() {
    return (
        <div className="wrapper clear">
            <Drawer />
            <Header />
            <div className="content p-40">
                <div className="d-flex mb-30 justify-between align-center">
                    <h1 className="title-1">Все кроссовки</h1>
                    <div className="search justify-between">
                        <img src="/img/search.svg" alt="search" />
                        <input type="text" placeholder="Поиск..." />
                    </div>
                </div>
                <div className="d-flex justify-between">
                    <Card />
                    {/*<div className="card">
                        <div className="favorite">
                            <img src="/img/favs.svg" width={32} height={32} alt="favs" />
                        </div>
                        <img src="/img/sneakers/card.jpg" width={133} height={112} alt="Sneakers" />
                        <p>Мужские Кроссовки Nike Blazer Mid Suede</p>
                        <div className="d-flex justify-between align-center">
                            <div className="d-flex flex-column">
                                <span>Цена:</span>
                                <b>12 999 руб</b>
                            </div>
                            <img src="/img/btn-plus.svg" width={32} height={32} alt="plus" />
                        </div>
                    </div>
                    <div className="card">
                        <img className="mb-12" src="/img/sneakers/card2.jpg" width={133} height={112} alt="Sneakers" />
                        <p>Мужские Кроссовки Nike Blazer Mid Suede</p>
                        <div className="d-flex justify-between align-center">
                            <div className="d-flex flex-column">
                                <span>Цена:</span>
                                <b>12 999 руб</b>
                            </div>
                            <button className="button">
                                <img src="/img/plus.svg" width={11} height={11} alt="plus" />
                            </button>
                        </div>
                    </div>
                    <div className="card">
                        <img className="mb-12" src="/img/sneakers/card3.jpg" width={133} height={112} alt="Sneakers" />
                        <p>Мужские Кроссовки Nike Blazer Mid Suede</p>
                        <div className="d-flex justify-between align-center">
                            <div className="d-flex flex-column">
                                <span>Цена:</span>
                                <b>12 999 руб</b>
                            </div>
                            <button className="button">
                                <img src="/img/plus.svg" width={11} height={11} alt="plus" />
                            </button>
                        </div>
                    </div>
                    <div className="card">
                        <img className="mb-12" src="/img/sneakers/card4.jpg" width={133} height={112} alt="Sneakers" />
                        <p>Мужские Кроссовки Nike Blazer Mid Suede</p>
                        <div className="d-flex justify-between align-center">
                            <div className="d-flex flex-column">
                                <span>Цена:</span>
                                <b>12 999 руб</b>
                            </div>
                            <button className="button">
                                <img src="/img/plus.svg" width={11} height={11} alt="plus" />
                            </button>
                        </div>
                    </div>*/}

                </div>
            </div>
        </div>
    );
}

export default App;
