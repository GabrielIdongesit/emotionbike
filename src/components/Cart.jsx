// src/components/Cart.jsx
import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";

const Cart = ({ cart, increaseQty, decreaseQty, removeItem }) => {

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty. <Link to="/">Go shopping!</Link></p>
      ) : (
        <div className="bg-white p-4 shadow rounded">

          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded"/>
                <p className="font-semibold">{item.name}</p>
              </div>

              <div className="flex items-center gap-2">
                {/* Quantity Controls */}
                <button
                  onClick={() => decreaseQty(item.id)}
                  className="p-1 bg-gray-200 rounded"
                >
                  <AiOutlineMinus />
                </button>
                <span>{item.qty}</span>
                <button
                  onClick={() => increaseQty(item.id)}
                  className="p-1 bg-gray-200 rounded"
                >
                  <AiOutlinePlus />
                </button>
              </div>

              <p>${(item.price * item.qty).toFixed(2)}</p>

              {/* Remove Item */}
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <BsFillTrashFill />
              </button>
            </div>
          ))}

          <hr className="my-4" />
          <h3 className="text-xl font-bold">Total: ${total.toFixed(2)}</h3>

          <Link
            to="/checkout"
            className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded"
          >
            Proceed to Checkout
          </Link>

        </div>
      )}
    </div>
  );
};

export default Cart;
