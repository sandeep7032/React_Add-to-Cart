import { useState, useEffect } from "react";
import axios from "axios";
import "./Cart.css";

const Cart = () => {
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/cart")
      .then((res) => {
        setCartData(res.data);
      })
      .catch(() => {
        alert("Failed");
      });
  }, []);

  const remove = (id) => {
    axios
      .delete(`http://localhost:5001/cart/${id}`)
      .then((res) => {
        axios.get("http://localhost:5001/cart").then((res) => {
          alert("Removed Successfully");
          setCartData(res.data);
        });
      })
      .catch(() => {
        alert("Failed to Remove");
      });
  };

  return (
    <div>
      {cartData == 0 ? (
        <h2 style={{ margin: "20px" }}>Cart is Empty</h2>
      ) : (
        <div>
          <h2 style={{ margin: "20px" }}>Cart Products</h2>
          {cartData.map((item, idx) => {
            return (
              <div key={idx} className="cart-container">
                <div className="img-div">
                  <img src={item.image} width={200} height={200} alt="pic" />
                </div>
                <div className="details">
                  <h3 style={{ marginLeft: "10px" }}>{item.title}</h3>
                  <p>{item.description}</p>
                  <h4>
                    rating : {item.rating.rate} out of ({item.rating.count})
                    ratings
                  </h4>
                  <h3 style={{ marginLeft: "10px" }}>{item.price}</h3>
                  <button
                    onClick={() => {
                      remove(item.id);
                    }}
                  >
                    remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Cart;
