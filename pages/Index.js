import Layout from "../components/MyLayout";
import Link from "next/link";
import fetch from "isomorphic-unfetch";
import useSWR from "swr";
import { useRouter } from "next/router";

function getPosts() {
  return [
    { id: "hello-nextjs", title: "Hello Next.js" },
    { id: "learn-nextjs", title: "Learn Next.js is awesome" },
    { id: "deploy-nextjs", title: "Deploy apps with ZEIT" }
  ];
}

function fetcher(url) {
  return fetch(url).then(r => r.json());
}

const PostLink = ({ post }) => (
  <li>
    <Link
      href={`/p/[id]?title=${post.title}`}
      as={`/p/${post.id}?title=${post.title}`}
    >
      <a>{post.title}</a>
    </Link>
    <style jsx>{`
      li {
        list-style: none;
        margin: 5px 0;
      }

      a {
        text-decoration: none;
        color: blue;
        font-family: "Arial";
      }

      a:hover {
        opacity: 0.6;
      }
    `}</style>
  </li>
);

const Quote = () => {
  const { query } = useRouter();
  const { data, error } = useSWR(
    `/api/randomQuote${query.author ? "?author=" + query.author : ""}`,
    fetcher
  );

  // is the same as data && data.author
  const author = data?.author;
  let quote = data?.quote;

  if (!data) quote = "Loading...";
  if (error) quote = "Failed to fetch the quote.";
  return (
    <main className="center">
      <div className="quote">{quote}</div>
      {author && <span className="author">- {author}</span>}
      <style jsx>{`
        main {
          width: 90%;
          max-width: 900px;
          margin: 300px auto;
          text-align: center;
        }
        .quote {
          font-family: cursive;
          color: #e243de;
          font-size: 24px;
          padding-bottom: 10px;
        }
        .author {
          font-family: sans-serif;
          color: #559834;
          font-size: 20px;
        }
      `}</style>
    </main>
  );
};

const Index = props => {
  return (
    <Layout>
      <Quote></Quote>
      <h1>My Blog</h1>
      <ul>
        {getPosts().map(post => (
          <PostLink key={post.id} post={post} />
        ))}
      </ul>
      <h1>Batman TV Shows</h1>
      <ul>
        {props.shows.map(show => (
          <li key={show.id}>
            <Link href={`/p/[id]`} as={`/p/${show.id}?title=${show.name}`}>
              <a>{show.name}</a>
            </Link>
          </li>
        ))}
      </ul>
      <style jsx>{`
        h1,
        a {
          font-family: "Arial";
        }

        ul {
          padding: 0;
        }

        li {
          list-style: none;
          margin: 5px 0;
        }

        a {
          text-decoration: none;
          color: blue;
        }

        a:hover {
          opacity: 0.6;
        }
      `}</style>
    </Layout>
  );
};

Index.getInitialProps = async function() {
  const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    shows: data.map(entry => entry.show)
  };
};

export default Index;
