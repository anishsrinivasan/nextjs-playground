import React from "react";
import Link from "next/link";
import Head from "next/head";
const fetch = require("node-fetch");

const PostContainer = ({ blog }) => {
  return (
    <>
      <div>
        <Head>
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@yoursite" />
          <meta name="twitter:title" content={blog.title} />
          <meta name="twitter:description" content={blog.body} />
          <meta name="twitter:image" content="/header.png" />
        </Head>
        <h1>{blog.title}</h1>
        <p>{blog.body}</p>
      </div>
    </>
  );
};
export default function FirstPost({ data }) {
  const blog = data[0];
  console.log("Data from Server", blog);

  return (
    <>
      <Head>
        <title>{blog.title}</title>
      </Head>
      <br />
      <img
        src="/header.png"
        alt="Vercel Logo"
        className="logo"
        style={{ width: "400px" }}
      />
      <PostContainer blog={blog} />
      <Link href="/">
        <a>Go Back</a>
      </Link>
    </>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(
    `http://jsonplaceholder.typicode.com/posts?_start=5&_limit=5`
  );
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
