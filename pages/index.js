import Image from "next/image";
import Link from "next/link";
import { getProducts } from "../database/model.js";
import { useState, useEffect } from "react";

export async function getServerSideProps() {
  // Fetch necessary data for the blog post using params.id

  let products = getProducts();
  return {
    props: {
      products,
    },
  };
}

export default function Home({ products }) {
  const [category, setCategory] = useState("all");
  const [itemsInBasket, setItemsInBasket] = useState(0);
  const categories = [
    "all",
    "starters",
    "mains",
    "sides",
    "desserts",
    "drinks",
  ];

  useEffect(() => {
    let local = JSON.parse(localStorage.getItem("basket"))
      ? JSON.parse(localStorage.getItem("basket")).length
      : 0;
    setItemsInBasket(local);
  }, []);

  function handleBasket(product) {
    let localBasket = JSON.parse(localStorage.getItem("basket") || "[]");
    if (localBasket.length === 0) {
      localBasket.push({
        id: product.id,
        name: product.name,
        quantity: "1",
        price: Number(product.price.slice(1)),
        image: product.src,
      });
    } else {
      localBasket.forEach((item, index) => {
        if (item.id === product.id) {
          localBasket[index].quantity =
            parseFloat(localBasket[index].quantity) + 1;
        } else {
          localBasket.push({
            id: product.id,
            name: product.name,
            quantity: "1",
            price: Number(product.price.slice(1)),
            image: product.src,
          });
        }
      });
    }
    localStorage.setItem("basket", JSON.stringify(localBasket));

    let local = JSON.parse(localStorage.getItem("basket")).length;
    setItemsInBasket(local);
  }

  function ProductsFilteredByCategory() {
    let filtered;
    category === "all"
      ? (filtered = products)
      : (filtered = products.filter((product) => {
          return product.category === category;
        }));

    return (
      <ul className="mainBody">
        {filtered.map((product, index) => {
          return (
            <li key={index}>
              <Link href={"/products/" + product.id}>
                <div className="productImageContainer">
                  <p>{product.name}</p>
                  <Image
                    src={"/images/" + product.src} // Route of the image file
                    height={144} // Desired size with correct aspect ratio
                    width={144} // Desired size with correct aspect ratio
                    alt={product.name}
                  />
                </div>
              </Link>
              <div className="priceBasketContainer">
                <p>{product.price}</p>
                <button onClick={() => handleBasket(product)}>
                  Add to basket
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div>
      <nav onClick={(e) => setCategory(e.target.id)}>
        <ul>
          {categories.map((category, index) => {
            return (
              <li key={index} id={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </li>
            );
          })}
        </ul>
        <div>
          <Link href={"/basket"}>
            <a>
              <p> &#x1F6D2;</p>
              <span>{itemsInBasket}</span>
            </a>
          </Link>
        </div>
      </nav>
      <section>
        <div>
          <ProductsFilteredByCategory />
        </div>
      </section>
    </div>
  );
}
