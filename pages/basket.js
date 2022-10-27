import { useEffect, useState } from "react";
import Image from "next/image";

const Basket = () => {
  const [currentBasket, setCurrentBasket] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    setCurrentBasket(JSON.parse(localStorage.getItem("basket")));

    let basketArray = JSON.parse(localStorage.getItem("basket"));
    let total = basketArray.reduce((acc, current) => {
      return current.price * current.quantity + acc;
    }, 0);
    setTotalCost(total);
  }, []);

  return (
    <div>
      <h1>Your current basket</h1>
      <ul>
        {currentBasket.map((item, index) => {
          return (
            <li key={index}>
              <div>
                <Image
                  src={"/images/" + item.image} // Route of the image file
                  height={144} // Desired size with correct aspect ratio
                  width={144} // Desired size with correct aspect ratio
                  alt={item.name}
                />
                <p>{item.name}</p>
                <p>Price: £{item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Cost: £{item.quantity * item.price}</p>
              </div>
            </li>
          );
        })}
      </ul>
      <p>Overall total cost: £{totalCost}</p>
    </div>
  );
};

export default Basket;
