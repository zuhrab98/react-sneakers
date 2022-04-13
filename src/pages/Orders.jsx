import React from "react";
import Card from "../components/Card";
import axios from "axios";

function Orders() {
    const [orders, setOrders] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        try {
            (async () => {
                const { data } = await axios.get('https://624323f0d126926d0c5c2ace.mockapi.io/orders')
                setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
                setIsLoading(false)
            })()
        } catch (error) {
            alert('Ошибка при запросе заказов')
        }
    }, [])

    return (
        <div className="content p-40">
            <div className="d-flex mb-30 justify-between align-center">
                <h1 className="title-1">Мои заказы</h1>
                <div className="search justify-between">
                </div>
            </div>
            <div className="d-flex flex-wrap">
                {(isLoading ? [...Array(7)] : orders).map((item, index) => (
                    <Card
                        key={index}
                        isLoading={isLoading}
                        {...item}
                    />
                ))}
            </div>
        </div>
    )
}

export default Orders