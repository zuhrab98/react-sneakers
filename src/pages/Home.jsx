import React from "react";
import Card from "../components/Card";


function Home({
    items, searchInput,
    setSearchInput, onChangeSearchInput,
    onAddToFavorite, onAddTocart, isLoading
}) {
    const renderCard = () => {

        const filtredItems = items.filter((item) => item.name.toLowerCase().includes(searchInput.toLowerCase()))

        return (isLoading ? [...Array(7)] : filtredItems).map((item, index) => (
            <Card
                key={index}
                onClickFavorit={(obj) => onAddToFavorite(obj)}
                onClickPlus={(obj) => onAddTocart(obj)}
                isLoading={isLoading}
                {...item}
            />
        ))
    }

    return (
        <div className="content p-40">
            <div className="d-flex mb-30 justify-between align-center">
                <h1 className="title-1">{searchInput ? `Поиск по: ${searchInput}` : 'Все кроссовки'}</h1>
                <div className="search justify-between">
                    <img src="img/search.svg" alt="search" />
                    {searchInput && <img onClick={setSearchInput} className="image-close" src="img/btn-close.svg" alt="Clear" />}
                    <input onChange={onChangeSearchInput} value={searchInput} type="text" placeholder="Поиск..." />
                </div>
            </div>
            <div className="d-flex flex-wrap">
                {renderCard()}
            </div>
        </div>
    )
}

export default Home