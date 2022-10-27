import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Basket = () => {
  const [currentBasket, setCurrentBasket] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
      setCurrentBasket(JSON.parse(localStorage.getItem("basket")));

      let basketArray = JSON.parse(localStorage.getItem("basket"));
      let total = basketArray.reduce((acc, current) => {
        return current.price * current.quantity + acc;
      }, 1000);
      setTotalCost(total);
  }, []);


  const handleQuantity = (e) => {
    let checkBasket = currentBasket
    if (e.target.id === "plus") {
      checkBasket.map((item) => {
        if (e.target.value === item.name) {
          item.quantity = Number(item.quantity) + 1;
           setCurrentBasket(checkBasket);
        }
      });
    } else if (e.target.id === "minus") {
      checkBasket.map((item) => {
        if (Number(item.quantity) > 0) {
          if (e.target.value === item.name) {
            checkBasket.quantity = Number(item.quantity) - 1;
             setCurrentBasket(checkBasket);
          }
        }
      });
    }
  };

  return (
    <div>
      <h1>Your current basket</h1>
      <ul>
        {currentBasket.map((item, index) => {
          return (
            <li key={index} onClick={handleQuantity}>
              <div>
                <Image
                  src={"/images/" + item.image} // Route of the image file
                  height={144} // Desired size with correct aspect ratio
                  width={144} // Desired size with correct aspect ratio
                  alt={item.name}
                />
                <p>{item.name}</p>
                <p>Price: £{item.price}</p>
                <div>
                  Quantity:{" "}
                  <button id="minus" value={item.name}>
                    &#8722;
                  </button>
                  {item.quantity}
                  <button id="plus" value={item.name}>
                    &#43;
                  </button>
                </div>
                <p>Cost: £{item.quantity * item.price}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <p>Overall total cost: £{totalCost}</p>
      <Link href="/confirmation">Checkout</Link>
    </div>
  );
};

export default Basket;
