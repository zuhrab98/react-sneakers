import Card from "./components/Card";
import Drawer from "./components/Drawer";
import Header from "./components/Header";

const arr = [
    { name: 'Мужские Кроссовки Nike Blazer Mid Suede', price: 12999, image: '/img/sneakers/card.jpg' },
    { name: 'Мужские Кроссовки Nike Air Max 270', price: 15499, image: '/img/sneakers/card2.jpg' },
    { name: 'Мужские Кроссовки Nike Blazer Mid Suede', price: 8499, image: '/img/sneakers/card3.jpg' },
    { name: 'Кроссовки Puma X Aka Boku Future Rider', price: 8999, image: '/img/sneakers/card4.jpg' },
]

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
                <div className="d-flex">
                    {arr.map(obj => (
                        <Card
                            name = {obj.name}
                            price = {obj.price}
                            img = {obj.image}
                            clicki = {() => {console.log(obj)}}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
