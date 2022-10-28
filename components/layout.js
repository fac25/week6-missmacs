import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
export const siteTitle = "Miss Macs";

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <meta name="description" content="Mac and Cheese takeaway" />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <div className="main-container">
        <header>
          <Link href={"/"}>
            <a className="logo">
              <Image
                priority
                src="/images/logo.jpg"
                height={150}
                width={150}
                alt="Miss Macs logo"
              />
            </a>
          </Link>
        </header>
        <main>{children}</main>
        <footer>
          © Miss Macs 2022{" "}
          <Image
            priority
            src="/images/logo.jpg"
            height={20}
            width={20}
            alt="Miss Macs logo"
          />
        </footer>
      </div>
    </div>
  );
}
