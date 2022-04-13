import React from 'react'
import { Link } from "react-router-dom";
import { useCart } from '../hooks/useCart';

function Header(props) {

    const { totalPrice } = useCart()

    return (
        <header className="d-flex justify-between align-center p-40">
            <Link to={'/'}>
                <div className='headerLeft d-flex align-center'>
                    <img width={40} height={40} src="img/logo.png" alt="logo" />
                    <div className='headerInfo'>
                        <h3>REACT SNEAKERS</h3>
                        <p>Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>
            <ul className='headerRight d-flex'>
                <li className="mr-30 cu-p" onClick={props.onclickCart}>
                    <img className="mr-10" width={18} height={18} src="img/cart.svg" alt="Корзина" />
                    <span>{totalPrice} руб</span>
                </li>
                <li className="mr-30 cu-p">
                    <Link to={"/favorites"}>
                        <img width={20} height={20} src="img/heart.svg" alt="Закладки" />
                    </Link>
                </li>
                <li className="cu-p">
                    <Link to={'/orders'}>
                        <img width={20} height={20} src="img/user.svg" alt="Пользователь" />
                    </Link>
                </li>
            </ul>
        </header>
    )
}

export default Header