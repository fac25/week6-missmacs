import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Basket = () => {
  const [currentBasket, setCurrentBasket] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [currentQuantities, setQuantities] = useState(new Array(7).fill(null));

  useEffect(() => {
    setCurrentBasket(JSON.parse(localStorage.getItem("basket")));

    let basketArray = JSON.parse(localStorage.getItem("basket"));
    let total = basketArray.reduce((acc, current) => {
      return current.price * current.quantity + acc;
    }, 0);
    setTotalCost(total);

    basketArray.forEach((item) => {
      //set state
      setQuantities((previousQuantities) => {
        console.log(item.id);
        let nextQuantities = previousQuantities;
        nextQuantities[item.id - 1] = item.quantity;
        return nextQuantities;
      });
    });
  }, []);

  function incrementItem(event) {
    event.preventDefault();
    //get the product name and current quantity
    let nameWithoutPlus = event.target.id.slice(4);
    let indexOfItemNameFirstLetter = nameWithoutPlus.search(/[a-zA-Z]/);
    let name = nameWithoutPlus.slice(
      indexOfItemNameFirstLetter,
      nameWithoutPlus.length - 1
    );
    let preUpdatedQuantity = nameWithoutPlus.slice(
      0,
      indexOfItemNameFirstLetter
    );
    let productId = nameWithoutPlus.slice(nameWithoutPlus.length - 1);

    //update state
    let copy = [...currentQuantities];
    console.log(copy);
    copy[productId - 1] = parseFloat(preUpdatedQuantity) + 1;
    setQuantities(() => {
      return copy;
    });

    // setQuantities((previousQuantities) => {
    //   let nextQuantities = previousQuantities;
    //   nextQuantities[productId - 1] = parseFloat(preUpdatedQuantity) + 1;
    //   console.log(nextQuantities);
    //   return nextQuantities;
    // });

    //update localstorage
  }

  function decrementItem(event) {
    //get the product name and current quantity
    let name = event.target.id.slice(5);
    console.log(name);

    //update state and localstorage
  }

  console.log(currentQuantities);

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
                <p>
                  Quantity:{" "}
                  <button
                    id={"minus" + item.quantity + item.name + item.id}
                    onClick={decrementItem}
                  >
                    &#8722;
                  </button>{" "}
                  {currentQuantities[item.id - 1] /*item.quantity*/}{" "}
                  <button
                    type="button"
                    id={"plus" + item.quantity + item.name + item.id}
                    onClick={incrementItem}
                  >
                    &#43;
                  </button>
                </p>
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
