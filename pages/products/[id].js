import { getProducts, getProductById } from "../../database/model.js";
import Image from "next/image";
import { useEffect, useState } from "react";

export async function getStaticPaths() {
  let allProducts = getProducts();
  let allProductids = allProducts.map((product) => {
    return {
      params: {
        id: JSON.stringify(product.id),
      },
    };
  });

  // Return a list of possible value for id
  return {
    paths: allProductids,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Fetch necessary data for the blog post using params.id
  let product = getProductById(params.id);

  return {
    props: {
      product,
    },
  };
}

export default function Product({ product }) {
  const handleBasket = (e) => {
    e.preventDefault();
    const number = document.getElementById("quantity").value
    localStorage.setItem(JSON.stringify(product.name), number)
  };

  return (
    <div>
      <div>
        <Image
          src={"/images/" + product.src} // Route of the image file
          height={144} // Desired size with correct aspect ratio
          width={144} // Desired size with correct aspect ratio
          alt={product.name}
        />
        <p>{product.name}</p>
        <p>Price: £{product.price}</p>
      </div>

      <div>
        <p>Description: {product.description}</p>
        <p>Allergens: {product.allergens}</p>
      </div>

      <div>
        <form>
          <label htmlFor="quantity">Quantity</label>
          <input type="number" id="quantity"/>
          <button onClick={handleBasket}>Add to basket</button>
        </form>
      </div>
    </div>
  );
}
