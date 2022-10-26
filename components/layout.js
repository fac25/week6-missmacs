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
      <header>
        {home ? (
          <>
            <Image
              priority
              src="/images/tiger.jpg"
              height={100}
              width={100}
              alt=""
            />
          </>
        ) : (
          <Link href={"/"}>
            <a>
              <Image
                priority
                src="/images/tiger.jpg"
                height={100}
                width={100}
                alt=""
              />
            </a>
          </Link>
        )}
      </header>
      <main>{children}</main>
      <footer>Miss Macs</footer>
    </div>
  );
}
