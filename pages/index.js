import Layout from "../components/layout";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { getProducts } from "../database/model.js";
import { useState } from "react";


export async function getStaticProps() {
  // Fetch necessary data for the blog post using params.id

  

  let products = getProducts();
  return {
    props: {
      products,
    },
  };
}

<<<<<<< HEAD
export default function Home({ products}) {
=======
export default function Home({ products }) {
  // console.log(products);
  const [category, setCategory] = useState("all");

  function filterByCategory() {
    let filtered;
    category === 'all'? filtered = products: filtered = products.filter((product) => {
      return product.category === category;
    });
    console.log(filtered);

    return (
      <ul>
        {filtered.map((product, index) => {
          // console.log(product);
          return (
            <li key={index}>
              <p>{product.name}</p>
              <Image
                src={"/images/" + product.src} // Route of the image file
                height={144} // Desired size with correct aspect ratio
                width={144} // Desired size with correct aspect ratio
                alt={product.name}
              />
              <p>{product.price}</p>
              <button>Add to basket</button>
            </li>
          );
        })}
      </ul>
    );
  }

  function handleClick(event) {
    setCategory(event.target.id);
  }

>>>>>>> main
  return (
    <Layout home>
      <nav>
        <button id="all" onClick={handleClick}>
          All
        </button>
        <button id="starters" onClick={handleClick}>
          Starters
        </button>
        <button id="mains" onClick={handleClick}>
          Mains
        </button>
        <button id="sides" onClick={handleClick}>
          Sides
        </button>
        <button id="desserts" onClick={handleClick}>
          Desserts
        </button>
        <button id="drinks" onClick={handleClick}>
          Drinks
        </button>
      </nav>
      <section>
        {/* <div>{category === "all" ? <p>Showing all</p> : ""}</div> */}
        <div>{filterByCategory()}</div>
        {/* <div>{category === "mains" ? <p>Showing mains</p> : ""}</div>
        <div>{category === "sides" ? <p>Showing sides</p> : ""}</div>
        <div>{category === "desserts" ? <p>Showing desserts</p> : ""}</div>
        <div>{category === "drinks" ? <p>Showing drinks</p> : ""}</div> */}
      </section>
    </Layout>
  );
}
