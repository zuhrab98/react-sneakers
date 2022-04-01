import React from "react";
import Header from "./components/Header";
import Card from "./components/Card";
import Drawer from "./components/Drawer";

function App() {
    const [items, setItems] = React.useState([])
    const [cartItems, setCartItems] = React.useState([])

    const [drawerOpen, setDrawerOpen] = React.useState(false)


    React.useEffect(() => {
        fetch('https://624323f0d126926d0c5c2ace.mockapi.io/items')
            .then(res => {
                return res.json()
            }).then(data => {
                setItems(data)
            })
    }, [])

    const onAddTocart = (obj) => {
        setCartItems(prev => ([...prev, obj]))
    }

    return (
        <div className="wrapper clear">

            {drawerOpen && <Drawer items={cartItems} onClickClose={() => { setDrawerOpen(false) }} />}

            <Header onclickCart={() => { setDrawerOpen(true) }} />

            <div className="content p-40">
                <div className="d-flex mb-30 justify-between align-center">
                    <h1 className="title-1">Все кроссовки</h1>
                    <div className="search justify-between">
                        <img src="/img/search.svg" alt="search" />
                        <input type="text" placeholder="Поиск..." />
                    </div>
                </div>
                <div className="d-flex flex-wrap">
                    {items.map(obj => (
                        <Card
                            name={obj.name}
                            price={obj.price}
                            img={obj.image}
                            onClickFavorit={() => { console.log('fav') }}
                            onClickPlus={(obj) => onAddTocart(obj)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
