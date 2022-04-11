import Card from "../components/Card";
import AppContext from "../context";
import React from "react";

function Favorites() {

    const { favorites, onAddToFavorite } = React.useContext(AppContext)

    return (
        <div className="content p-40">
            <div className="d-flex mb-30 justify-between align-center">
                <h1 className="title-1">Мои закладки</h1>
                <div className="search justify-between">
                </div>
            </div>
            <div className="d-flex flex-wrap">
                {favorites.map((item, index) => (
                    <Card
                        key={index}
                        id={item.id}
                        name={item.name}
                        price={item.price}
                        image={item.image}
                        favorited={true}
                        // Получаем obj с компонента Card
                        onClickFavorit={(obj) => onAddToFavorite(obj)}
                    />
                ))}
            </div>
        </div>
    )
}

export default Favorites