import Layout from "../components/layout";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { getProducts } from "../database/model.js";
import { useEffect, useState } from "react";

export async function getStaticProps() {
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

  function handleBasket(id) {
    let localBasket = JSON.parse(localStorage.getItem("basket") || "[]");
    
    products.filter((product) => {
      if (product.id === id) {
        localBasket.push({
          name: product.name,
          quantity: "1",
          price: Number(product.price.slice(1)),
          image: product.src,
        });
      }
    });
    localStorage.setItem("basket", JSON.stringify(localBasket));

    let local = JSON.parse(localStorage.getItem("basket")).length;
    setItemsInBasket(local);
  }

  function filterByCategory() {
    let filtered;
    category === "all"
      ? (filtered = products)
      : (filtered = products.filter((product) => {
          return product.category === category;
        }));

    return (
      <ul>
        {filtered.map((product, index) => {
          return (
            <li key={index}>
              <Link href={"/products/" + product.id}>
                <div>
                  <p>{product.name}</p>
                  <Image
                    src={"/images/" + product.src} // Route of the image file
                    height={144} // Desired size with correct aspect ratio
                    width={144} // Desired size with correct aspect ratio
                    alt={product.name}
                  />
                </div>
              </Link>
              <p>{product.price}</p>
              <button onClick={() => handleBasket(product.id)}>
                Add to basket
              </button>
            </li>
          );
        })}
      </ul>
    );
  }

  function handleClick(e) {
    setCategory(e.target.id);
  }

  return (
    <div>
      <nav onClick={handleClick}>
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
        <div>{filterByCategory()}</div>
      </section>
    </div>
  );
}
