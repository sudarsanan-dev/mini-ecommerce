import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from 'react-toastify'

export default function Cart({ cartItems, setCartItems }) {
    const [complete, setComplete] = useState(false);
    function increaseQty(item) {
        if (item.products.stock == item.qty) return;
        const updatedItems = cartItems.map((i) => {
            if (i.products._id == item.products._id) {
                i.qty++;
            }
            return i;
        });
        setCartItems(updatedItems);
    }
    function decreaseQty(item) {
        if (item.qty == 1) return;
        const updatedItems = cartItems.map((i) => {
            if (i.products._id == item.products._id) {
                i.qty--;
            }
            return i;
        });
        setCartItems(updatedItems);
    }
    function deleteCartItem(item) {



        const updatedItems = cartItems.filter((i) => {
            if (i.products._id !== item.products._id) {
                return true;
            }
            return false;
        });
        setCartItems(updatedItems);
    }
    function placeOrderHandler() {
        fetch(process.env.REACT_APP_API_URL + "/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({ cartItems })
        })
            .then(() => { setCartItems([]) });
        setComplete(true);
        toast.success("Order placed successfully!");


    }

    return cartItems.length > 0 ?
        <Fragment>
            <div className="container container-fluid">
                <h2 className="mt-5" style={{ textAlign: "center" }}>Your Cart: <b>{cartItems.length} items</b></h2>

                <div className="row d-flex justify-content-between">
                    <div className="col-12 col-lg-8">
                        {cartItems.map((item) =>
                        (<Fragment>
                            <hr />
                            <div className="cart-item">
                                <div className="row">
                                    <div className="col-4 col-lg-3">
                                        <img src={item.products.images[0].image} alt={item.products.name} height="90" width="115" />
                                    </div>

                                    <div className="col-5 col-lg-3">
                                        <Link to={"/product/" + item.products._id}>{item.products.name}</Link>
                                    </div>


                                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                        <p id="card_item_price">${item.products.price}</p>
                                    </div>

                                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                        <div className="stockCounter d-inline">
                                            <span className="btn btn-danger minus" onClick={() => decreaseQty(item)}>-</span>
                                            <input type="number" className="form-control count d-inline" value={item.qty} readOnly />

                                            <span className="btn btn-primary plus" onClick={() => increaseQty(item)}>+</span>
                                        </div>
                                    </div>

                                    <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                        <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={() => deleteCartItem(item)}></i>
                                    </div>

                                </div>
                            </div>

                        </Fragment>)
                        )}


                    </div>

                    <div className="col-12 col-lg-3 my-4">
                        <div id="order_summary">
                            <h4>Order Summary</h4>
                            <hr />
                            <p>Subtotal:  <span className="order-summary-values">{cartItems.reduce((acc, item) => (acc + item.qty), 0)} (Units)</span></p>
                            <p>Est. total: <span className="order-summary-values">{cartItems.reduce((acc, item) => (acc + item.products.price * item.qty), 0)}</span></p>

                            <hr />
                            <button id="checkout_btn" className="btn btn-primary btn-block" onClick={placeOrderHandler}>Place Order</button>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment> : (!complete ? <h2 className="mt-5" style={{ textAlign: "center" }} >Your Cart is Empty</h2>
            : (<Fragment>
                <h2 className="mt-5" style={{ textAlign: "center" }} >Order complete!</h2>
                <p style={{ textAlign: "center" }}>Your order has been placed successfully.</p>
            </Fragment>)
        );

}
