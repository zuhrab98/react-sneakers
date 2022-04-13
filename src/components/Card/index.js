import React from 'react'
import ContentLoader from 'react-content-loader'
import AppContext from "../../context";

import styles from './Card.module.scss'

function Card({
    id,
    image,
    name,
    price,
    onClickFavorit,
    onClickPlus,
    favorited = false,
    isLoading
}) {

    const { isItemAdded } = React.useContext(AppContext)
    const [isFavorite, setIsFavorite] = React.useState(favorited)
    const obj = { id, parentId: id, image, name, price }

    const funcOnPlus = () => {
        onClickPlus(obj)
    }

    const funcOnFavorite = () => {
        onClickFavorit(obj)
        setIsFavorite((!isFavorite))
    }

    return (
        <div className={styles.card}>
            {
                isLoading ? <ContentLoader
                    speed={2}
                    width={150}
                    height={210}
                    viewBox="0 0 150 195"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="0" y="0" rx="10" ry="10" width="150" height="95" />
                    <rect x="145" y="248" rx="0" ry="0" width="1" height="0" />
                    <rect x="91" y="149" rx="0" ry="0" width="1" height="0" />
                    <rect x="0" y="110" rx="3" ry="3" width="150" height="18" />
                    <rect x="0" y="135" rx="3" ry="3" width="93" height="18" />
                    <rect x="0" y="165" rx="8" ry="8" width="92" height="28" />
                    <rect x="116" y="162" rx="8" ry="8" width="32" height="32" />
                </ContentLoader> :
                    <>
                        {onClickFavorit && <div className={styles.favorite} onClick={funcOnFavorite}>
                            <img src={isFavorite ? '/img/unfavs.svg' : '/img/favs.svg'} width={32} height={32} alt="favs" />
                        </div>}
                        <img src={image} width={133} height={112} alt="Sneakers" />
                        <p>{name}</p>
                        <div className="d-flex justify-between align-center">
                            <div className="d-flex flex-column">
                                <span>Цена:</span>
                                <b>{price} руб.</b>
                            </div>
                            {onClickPlus && <img className={styles.plus} onClick={funcOnPlus} src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} width={32} height={32} alt="plus" />}
                        </div>
                    </>
            }
        </div>
    )
}

export default Card