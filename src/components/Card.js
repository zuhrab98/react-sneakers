function Card() {
    return (
        <div className="card">
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
    )
}

export default Card