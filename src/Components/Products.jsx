import { useState, useEffect } from "react";
import "./Products.css";
import axios from "axios";

const Products = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProductData(res.data);
      })
      .catch(() => {
        alert("error");
      });
  }, []);

  const addCart = (productDetails) => {
    axios
      .post("http://localhost:5001/cart", productDetails)
      .then((res) => {
        alert("Added Successfully");
        // console.log(productDetails);
      })
      .catch(() => {
        alert("Already in Cart");
      });
  };

  return (
    <div style={{ margin: "30px" }}>
      <div>
        <h2>Products</h2>
        <p style={{ padding: "20px" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit,
          tempore illo eius, voluptatem sequi modi vero praesentium facere sed
          accusamus minima deleniti natus hic odit, officia quae nulla suscipit
          consequatur? In saepe nostrum similique magnam magni molestiae minima
          nam? Quaerat soluta, quasi est hic iste corporis fugiat ad quidem ipsa
          numquam voluptates in. Dolor nesciunt accusantium quas assumenda
          eligendi tempora recusandae fuga suscipit! Sequi tempora illum
          obcaecati nobis itaque laudantium, voluptatibus dignissimos voluptate
          vitae dicta
        </p>
      </div>
      <hr />
      <div className="product-container">
        {productData.map((data) => {
          return (
            <div className="products" key={data.id}>
              <div className="cards">
                <div className="card">
                  <img
                    src={data.image}
                    alt="product-pic"
                    height={180}
                    width={180}
                  />
                  <hr />
                  <h4>{data.title}</h4>
                  <h4>$ {data.price}</h4>
                  <button
                    onClick={() => {
                      addCart(data);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
