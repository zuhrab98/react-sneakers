import React from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import AppContext from "./context";

import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Orders from "./pages/Orders";

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
            try {
                const itemsResponse = await axios.get('https://624323f0d126926d0c5c2ace.mockapi.io/items')
                const cartResponse = await axios.get('https://624323f0d126926d0c5c2ace.mockapi.io/cart')
                const favoritesResponse = await axios.get('https://624323f0d126926d0c5c2ace.mockapi.io/favorites')

                setIsLoading(false)

                setCartItems(cartResponse.data)
                setFavorites(favoritesResponse.data)
                setItems(itemsResponse.data)
            } catch (error) {
                alert('Ошибка при запросе данных :(')
                console.error(error)
            }
        }
        fetchData()

    }, [])

    // Записываем данные которые добавили в козину на сервер
    const onAddTocart = async (obj) => {
        try {
            const findItem = cartItems.find(item => Number(item.parentId) === Number(obj.id))
            console.log("findItem", findItem)
            if (findItem) {
                setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)))
                await axios.delete(`https://624323f0d126926d0c5c2ace.mockapi.io/cart/${findItem.id}`)
            } else {
                setCartItems((prev) => [...prev, obj]);
                const { data } = await axios.post('https://624323f0d126926d0c5c2ace.mockapi.io/cart', obj)
                setCartItems(prev => prev.map(item => {
                    if (item.parentId === data.parentId) {
                        return {
                            ...item,
                            id: data.id
                        }
                    }
                    return item
                }))
            }
        } catch (error) {
            alert('Ошибка при добавлении в корзину')
            console.error(error)
        }
    }

    const onRemoveItem = async (id) => {
        console.log(id);
        try {
            await axios.delete(`https://624323f0d126926d0c5c2ace.mockapi.io/cart/${id}`)
            setCartItems(prev => prev.filter(item => item.id !== id))
        } catch (error) {
            alert('Ошибка при удалении из корзины')
            console.error(error)
        }
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

    const onChangeSearchInput = (e) => {
        setSearchInput(e.target.value)
    }

    const clearSearchInput = () => {
        setSearchInput('')
    }

    const isItemAdded = (id) => {
        return cartItems.some(obj => Number(obj.parentId) === Number(id))
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

                <Drawer
                    items={cartItems}
                    onClickClose={() => { setDrawerOpen(false) }}
                    onRemove={onRemoveItem}
                    opened={drawerOpen}
                />
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

                    <Route exact path="/orders" element={
                        <Orders />
                    }>
                    </Route>
                </Routes>


            </div >
        </AppContext.Provider>
    );
}

export default App;
