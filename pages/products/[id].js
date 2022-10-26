import { getProducts, getProductById } from "../../database/model.js";
import Image from "next/image";

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
  console.log(product);
  return {
    props: {
      product,
    },
  };
}

export default function Product({ product }) {
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
        <p>{product.price}</p>
      </div>

      <div>
        <p>{product.description}</p>
        <p>{product.allergens}</p>
        <p>{product.suitable_for}</p>
      </div>

      <div>
        <label htmlFor="quantity">Quantity</label>
        <input type="number" id="quantity" />
        <button>Add to basket</button>
      </div>
    </div>
  );
}
