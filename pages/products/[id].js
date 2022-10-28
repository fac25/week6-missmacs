import { getProducts, getProductById } from "../../database/model.js";
import Image from "next/image";
import Link from "next/link";

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

    let localBasket = JSON.parse(localStorage.getItem("basket") || "[]");

    //if product is already in basket update existing entry else push
    //if localBasket includes current product, rewrite that entry, don't add a new one

    if (localBasket.length === 0) {
      localBasket.push({
        id: product.id,
        name: product.name,
        quantity: document.getElementById("quantity").value,
        price: product.price,
        image: product.src,
      });
    }

    localBasket.forEach((item, index) => {
      if (item.id === product.id) {
        localBasket[index].quantity =
          parseFloat(localBasket[index].quantity) +
          parseFloat(document.getElementById("quantity").value);
      } else {
        localBasket.push({
          id: product.id,
          name: product.name,
          quantity: document.getElementById("quantity").value,
          price: product.price,
          image: product.src,
        });
      }
    });

    localStorage.setItem("basket", JSON.stringify(localBasket));
  };

  return (
    <div>
      <div className="product-basket">
        <Link href={"/basket"}>
          <p>
            <span>View basket </span>
            &#x1F6D2;
          </p>
        </Link>
      </div>
      <div className="product-page-container">
        <p className="name">{product.name}</p>
        <Image
          src={"/images/" + product.src} // Route of the image file
          height={500} // Desired size with correct aspect ratio
          width={500} // Desired size with correct aspect ratio
          alt={product.name}
        />
        <div className="content">
          <div className="add-basket">
            <label htmlFor="quantity">Quantity</label>
            <input type="number" id="quantity" />
            <button onClick={handleBasket}>Add to basket</button>
          </div>
          <p className="price">Price: £{product.price}</p>
          <p className="description">Description: {product.description}</p>
          <p className="allergens">Allergens: {product.allergens}</p>
        </div>
      </div>
    </div>
  );
}
