import { getProducts, getProductById } from "../../database/model.js";

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
      <p>{product.name}</p>
    </div>
  );
}
