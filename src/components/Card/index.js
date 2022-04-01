import React from 'react'
import styles from './Card.module.scss'

function Card({ img, name, price, onClickFavorit, onClickPlus }) {

    const [isAdded, setIsAdded] = React.useState(false)

    const funcOnPlus = () => {
        onClickPlus({ img, name, price })
        setIsAdded(!isAdded)
    }

    return (
        <div className={styles.card}>
            <div className={styles.favorite} onClick={onClickFavorit}>
                <img src="/img/favs.svg" width={32} height={32} alt="favs" />
            </div>
            <img src={img} width={133} height={112} alt="Sneakers" />
            <p>{name}</p>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                </div>
                <img className={styles.plus} onClick={funcOnPlus} src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} width={32} height={32} alt="plus" />
            </div>
        </div>
    )
}

export default Card