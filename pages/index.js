import Layout from "../components/layout";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { getProducts } from "../database/model.js";

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
  console.log(products);
  return (
    <Layout home>
      {/* Nav bar goes here */}
      <section>
        <div>Main Body</div>
      </section>
    </Layout>
  );
}
