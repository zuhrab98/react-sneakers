function Drawer({ onClickClose, items = [] }) {

    return (
        <div className="overlay">
            <div className="drawer d-flex flex-column">
                <div className="d-flex justify-between align-center mb-30">
                    <h3>Корзина</h3>
                    <img onClick={onClickClose} className="image-close" src="/img/btn-close.svg" alt="close" />
                </div>
                <div className="items flex">
                    {items.map((obj) => (
                        <div className="cartItem mb-20 d-flex align-center justify-between">
                            <div className="cartItemImg" style={{ backgroundImage: `url(${obj.img})` }}></div>
                            <div className="drawerCardInfo">
                                <p className="mb-5">{obj.name}</p>
                                <b>{obj.price} руб.</b>
                            </div>
                            <img className="image-close" src='/img/btn-close.svg' alt="close" />
                        </div>
                    ))}
                </div>
                <div className="cartTotalBlock">
                    <ul className="mb-20">
                        <li>
                            <span>Итого:</span>
                            <div></div>
                            <b>21 498 руб.</b>
                        </li>
                        <li>
                            <span>Налог 5%:</span>
                            <div></div>
                            <b>1074 руб</b>
                        </li>
                    </ul>
                    <dutton className="orderBtn">
                        Оформить заказ <img src="/img/arrow.svg" width={13} height={13} alt="arrow " />
                    </dutton>
                </div>
            </div>
        </div>
    )
}

export default Drawer