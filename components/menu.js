import { getProductsByCategory, getProducts } from "../database/model.js";

export async function getStaticProps() {
  const allProducts = getProducts();
  return {
    props: {
      allProducts,
    },
  };
}

export default function Menu({ allProducts }) {
  console.log(allProducts);
  function filterCategory() {
    console.log("hello");
    // const products = getProductsByCategory(category);
  }

  return (
    <>
      <nav>
        <button onClick={filterCategory}>Starters</button>
        <button onClick={filterCategory}>Mains</button>
        <button onClick={filterCategory}>Sides</button>
        <button onClick={filterCategory}>Desserts</button>
        <button onClick={filterCategory}>Drinks</button>
      </nav>
    </>
  );
}
