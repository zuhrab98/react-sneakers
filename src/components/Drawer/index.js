import React from 'react'
import Info from "../info"

import axios from 'axios'
import { useCart } from '../../hooks/useCart'

import styles from './Drawer.module.scss'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

function Drawer({ onClickClose, onRemove, items = [], opened }) {

    const { cartItems, setCartItems, totalPrice } = useCart()
    const [orderId, setOrderId] = React.useState(null)
    const [isOrderComplete, setIsOrderComplete] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)


    const onClickOrder = async () => {
        try {
            setIsLoading(true)
            const { data } = await axios.post('https://624323f0d126926d0c5c2ace.mockapi.io/orders', {
                items: cartItems,
            })

            setOrderId(data.id)
            setIsOrderComplete(true)
            setCartItems([])

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i].id
                await axios.delete(`https://624323f0d126926d0c5c2ace.mockapi.io/cart/${item}`)
                await delay(1000)
            }

        } catch (error) {
            alert("Ошибка создании заказа :(")
        }
        setIsLoading(false)
    }

    return (
        <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
            <div className={`${styles.drawer} d-flex flex-column`}>
                <div className="d-flex justify-between align-center mb-30">
                    <h3>Корзина</h3>
                    <img onClick={onClickClose} className="image-close" src="/img/btn-close.svg" alt="close" />
                </div>

                {
                    items.length > 0 ?
                        <div className={styles.wrapperItems}>
                            <div className="items flex">
                                {items.map((obj) => (
                                    <div key={obj.id} className="cartItem mb-20 d-flex align-center justify-between">
                                        <div className="cartItemImg" style={{ backgroundImage: `url(${obj.image})` }}></div>
                                        <div className="drawerCardInfo">
                                            <p className="mb-5">{obj.name}</p>
                                            <b>{obj.price} руб.</b>
                                        </div>
                                        <img onClick={() => onRemove(obj.id)} className="image-close" src='/img/btn-close.svg' alt="close" />
                                    </div>
                                ))}
                            </div>
                            <div className="cartTotalBlock">
                                <ul className="mb-20">
                                    <li>
                                        <span>Итого:</span>
                                        <div></div>
                                        <b>{totalPrice} руб.</b>
                                    </li>
                                    <li>
                                        <span>Налог 5%:</span>
                                        <div></div>
                                        <b>{Math.round(totalPrice * 0.05)} руб</b>
                                    </li>
                                </ul>
                                <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                                    Оформить заказ <img src="/img/arrow.svg" width={13} height={13} alt="arrow " />
                                </button>
                            </div>
                        </div>
                        :
                        <Info
                            image={isOrderComplete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"}
                            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
                            description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
                        />
                }
            </div>
        </div>
    )
}

export default Drawer