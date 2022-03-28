import styles from './Card.module.scss'
console.log(styles);

function Card(props) {
    return (
        <div className={styles.card}>
            <div className={styles.favorite}>
                <img src="/img/favs.svg" width={32} height={32} alt="favs" />
            </div>
            <img src={props.img} width={133} height={112} alt="Sneakers" />
            <p>{props.name}</p>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{props.price} руб.</b>
                </div>
                <button className='button' onClick={props.clicki}>
                    <img src="/img/btn-plus.svg" width={32} height={32} alt="plus" />
                </button>
            </div>
        </div>
    )
}

export default Card