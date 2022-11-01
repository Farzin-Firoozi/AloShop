import React, { createContext, useState, useContext } from 'react'
import { generateUniqueID } from '~/utils'

const OrdersContext = createContext({})

const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([])

  const addNewOrder = (product, location) => {
    const newOrder = {
      id: generateUniqueID(),
      product,
      location,
      date: Date.now(),
    }
    setOrders([newOrder, ...orders])
  }

  const getOrderStatus = (orderId) => {
    const now = Date.now()

    const order = orders.find((item) => item.id === orderId)

    const orderStatus = Math.min(Math.floor((now - order.date) / 1000 / 30), 3) // 0 <-> 3

    return orderStatus
  }

  return (
    <OrdersContext.Provider
      value={{
        data: orders,
        addNewOrder,
        getOrderStatus,
      }}
    >
      {children}
    </OrdersContext.Provider>
  )
}

export default OrdersProvider

export const useOrders = () => useContext(OrdersContext)
