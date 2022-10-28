import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
export const siteTitle = "Miss Macs";

export default function Layout({ children, home }) {
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
          <p>Miss Macs &#169; 2022</p>
          <span>
            <Image
              priority
              src="/images/logo.jpg"
              height={30}
              width={30}
              alt="Miss Macs logo"
            />
          </span>
        </footer>
      </div>
    </div>
  );
}
