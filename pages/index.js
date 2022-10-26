import Layout from "../components/layout.js";
import Menu from "../components/menu.js";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <Layout home>
      <section>
        <Menu />
      </section>
      <section>
        <div>Main Body</div>
      </section>
    </Layout>
  );
}
