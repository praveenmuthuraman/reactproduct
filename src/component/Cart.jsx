import React, { useContext } from "react";
import { myContext } from "../App";
const Cart = () => {
  const { data, setData } = useContext(myContext);

  // Calculate total quantity and total price
 const totalPrice=data.reduce((total,data)=>total+data.price*(data.quantity||1),0);
const totalQuantity=data.reduce((total,data)=>total+(data.quantity||1),0);
  const handleRemoveItem = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const handleIncrease = (id,quantity) => {
   setData(preData=>{
    return preData.map((item)=>{
        if(item.id===id){
            return{...item,quantity:(item.quantity+1||quantity+1)}
        }
        return item
    })
   })
  };

  const handleDecrease = (id, quantity) => {
    setData((preData) => {
      return preData.map((item) => {
        if (item.id === id && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Cart Product</span>
          <div className="ml-auto text-center">
            <span className="p-4 d-inline-block h4">
              Total Quantity: {totalQuantity}
            </span>
            <span className="p-4 d-inline-block h4">
              Total Price: ₹ {totalPrice}
            </span>
          </div>
        </div>
      </nav>
       <div className="container card-center">
      {data.map((item, index) => (
        <div
          key={index}
          className="col-md-4 mb-5 p-4"
          style={{ width: "75rem" }}
        >
          <div className="container card p-4 d-flex flex-column">
            <div
              id={`carousel-${index}`}
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                {item.images.map((img, imgIndex) => (
                  <div
                    key={imgIndex}
                    className={`carousel-item${
                      imgIndex === 0 ? " active" : ""
                    }`}
                  >
                    <img
                      src={img}
                      className="d-block w-100"
                      alt={`Product ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target={`#carousel-${index}`}
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target={`#carousel-${index}`}
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>

            <div className="card-body d-flex flex-row justify-content-between">
              <div className="align-self-start" style={{ width: "30rem" }}>
                <h5 className="card-title">{item.title}</h5>
                <p className="card-description">
                  DESICRIPTION:
                  <br />
                  {item.description}
                </p>
              </div>
              <div>
                <div className="btn-group" role="group" aria-label="Quantity">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={()=>handleDecrease(item.id,item.quantity)}
                  >
                    -
                  </button>
                  <button type="button" className="btn btn-light">
                    {item.quantity || 1}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => handleIncrease(item.id,item.quantity || 1)}
                  >
                    +
                  </button>
                </div>
                <div className="p-2">
                  <button
                    className="btn btn-danger mg-3"
                    onClick={() => handleRemoveItem(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="align-self-end">
                <p className="card-text">Price: ₹ {item.price}</p>
                <p className="card-text">
                  Discount: {item.discountPercentage}%
                </p>
                <p className="card-text">Rating: {item.rating}</p>
                <p className="card-text">Stock: {item.stock}</p>
                <p className="card-text">Brand: {item.brand}</p>
                <p className="card-text">Category: {item.category}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
      </div>
    </>
  );
};

export default Cart;
