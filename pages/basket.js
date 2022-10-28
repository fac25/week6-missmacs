import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Basket = () => {
  const [currentBasket, setCurrentBasket] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentBasket(JSON.parse(localStorage.getItem("basket")));

      let basketArray = JSON.parse(localStorage.getItem("basket"));
      let total = basketArray.reduce((acc, current) => {
        return current.price * current.quantity + acc;
      }, 0);
      setTotalCost(total);
    }, 10);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleQuantity = (e) => {
    let checkBasket = currentBasket;

    if (e.target.id === "plus") {
      checkBasket.map((item) => {
        if (e.target.value === item.name) {
          item.quantity = Number(item.quantity) + 1;
        }
      });
    } else if (e.target.id === "minus") {
      checkBasket.map((item) => {
        if (Number(item.quantity) > 0) {
          if (e.target.value === item.name) {
            item.quantity = Number(item.quantity) - 1;
          }
        }
      });
    }

    localStorage.setItem("basket", JSON.stringify(checkBasket));
  };

  return (
    <div className="basket-container">
      <h1>Your current basket</h1>
      <ul>
        {currentBasket.map((item, index) => {
          return (
            <li key={index} onClick={handleQuantity}>
              <span className="basket-image">
                <Image
                  src={"/images/" + item.image} // Route of the image file
                  height={1000} // Desired size with correct aspect ratio
                  width={1000} // Desired size with correct aspect ratio
                  alt={item.name}
                />
              </span>
              <div className="basket-content">
                <p className="name">{item.name}</p>
                <p className="price">Price: £{item.price}</p>
                <div className="add-minus-button">
                  Quantity:{" "}
                  <button id="minus" value={item.name} className="minus">
                    &#8722;
                  </button>
                  {item.quantity}
                  <button id="plus" value={item.name} className="plus">
                    &#43;
                  </button>
                </div>
                <p className="cost">Cost: £{item.quantity * item.price}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="checkout">
        <p>Overall total cost: £{totalCost}</p>
        <Link href="/confirmation">Checkout</Link>
      </div>
    </div>
  );
};

export default Basket;
