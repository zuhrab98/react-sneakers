import React from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import AppContext from "./context";

import Favorites from "./pages/Favorites";
import Home from "./pages/Home";

function App() {
    const [items, setItems] = React.useState([])
    const [cartItems, setCartItems] = React.useState([])
    const [favorites, setFavorites] = React.useState([])
    const [searchInput, setSearchInput] = React.useState('')
    const [drawerOpen, setDrawerOpen] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(true)

    // Получаем данные карточек
    React.useEffect(() => {
        async function fetchData() {
            const itemsResponse = await axios.get('https://624323f0d126926d0c5c2ace.mockapi.io/items')
            const cartResponse = await axios.get('https://624323f0d126926d0c5c2ace.mockapi.io/cart')
            const favoritesResponse = await axios.get('https://624323f0d126926d0c5c2ace.mockapi.io/favorites')

            setIsLoading(false)

            setCartItems(cartResponse.data)
            setFavorites(favoritesResponse.data)
            setItems(itemsResponse.data)
        }
        fetchData()

    }, [])

    // Записываем данные которые добавили в козину на сервер
    const onAddTocart = async (obj) => {
        console.log(obj);
        if (cartItems.find(item => Number(item.id) === Number(obj.id))) {
            axios.delete(`https://624323f0d126926d0c5c2ace.mockapi.io/cart/${obj.id}`)
            setCartItems(prev => prev.filter(item => Number(item.id) !== Number(obj.id)))
        } else {
            axios.post('https://624323f0d126926d0c5c2ace.mockapi.io/cart', obj)
            setCartItems((prev) => [...prev, obj]);
        }
    }

    const onRemoveItem = (id) => {
        console.log(id);
        axios.delete(`https://624323f0d126926d0c5c2ace.mockapi.io/cart/${id}`)
        setCartItems(prev => prev.filter(item => item.id !== id))
    }

    // по клику мы вызываем эту функцию и записываем избранные карточки на сервер
    const onAddToFavorite = async (obj) => {
        try {
            if (favorites.find(favObj => favObj.id === obj.id)) {
                axios.delete(`https://624323f0d126926d0c5c2ace.mockapi.io/favorites/${obj.id}`)
                setFavorites((prev) => prev.filter(item => Number(item.id) !== Number(obj.id)))
            } else {
                const { data } = await axios.post('https://624323f0d126926d0c5c2ace.mockapi.io/favorites', obj)
                setFavorites(prev => [...prev, data])
            }
        } catch (error) {
            alert(error)
        }
    }
    console.log(cartItems);

    const onChangeSearchInput = (e) => {
        setSearchInput(e.target.value)
    }

    const clearSearchInput = () => {
        setSearchInput('')
    }

    const isItemAdded = (id) => {
        return cartItems.some(obj => Number(obj.id) === Number(id))
    }
    return (
        // в контекст передаем значения
        <AppContext.Provider value={
            {
                items,
                cartItems,
                favorites,
                isItemAdded,
                onAddToFavorite,
                setDrawerOpen,
                setCartItems
            }
        }>
            <div className="wrapper clear">
                {/* Как drawerOpen будет true открываем корзину */}
                {drawerOpen && (<Drawer items={cartItems} onClickClose={() => { setDrawerOpen(false) }} onRemove={onRemoveItem} />)}
                <Header onclickCart={() => { setDrawerOpen(true) }} />

                {/* Если адресс будет '/' то  рендери все, что внутри Route */}
                <Routes>
                    <Route exact path="/"
                        element={
                            <Home
                                items={items}
                                searchInput={searchInput}
                                setSearchInput={clearSearchInput}
                                onChangeSearchInput={onChangeSearchInput}
                                onAddToFavorite={onAddToFavorite}
                                onAddTocart={onAddTocart}
                                isLoading={isLoading}
                            />
                        }>
                    </Route>

                    <Route exact path="/favorites" element={
                        <Favorites />
                    }>
                    </Route>
                </Routes>


            </div >
        </AppContext.Provider>
    );
}

export default App;
